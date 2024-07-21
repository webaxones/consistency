/**
 * Summary: Block processing.
 * 
 * @description This file contains the main processing operations operating on the blocks to adapt the texts according to the configured rules.
 * @author Loïc Antignac.
 */

/**
 * WordPress dependencies
 */
import { select, dispatch } from '@wordpress/data'

/**
 * External dependencies
 */
import { getAllInnersFromParents, getOnlyTextFromBlockContent, getCursorPositionInInnerHTML } from './utils'
import { getReplacementStringForPairs } from './helpers'
import { rules } from '../config/rules'
import { regsWithPair } from '../config/regsWithPair'
import { processedBlocks } from '../config/processedBlocks'

import { isUsedByLocale, blockShouldBeChecked, blockCanTechnicallyBeChecked, regDealWithPair, checkIfAMemoryLeakHasOccuredAndStopProcessing } from './checks'

const { getBlock, getBlocks, getBlockAttributes, getSelectionStart, isTyping } = select( 'core/block-editor' )
const { updateBlock, selectionChange, updateBlockAttributes } = dispatch( 'core/block-editor' )

/**
 * Fixes the content of a block based on regular expressions.
 *
 * @param {Object} props - The props object containing the necessary data.
 * @param {string} props.currentBlockId - The ID of the current block.
 * @param {Object} props.theRegs - An object containing regular expressions.
 * @param {boolean} props.isPasting - Indicates whether the content is being pasted.
 */
export const fixIt = props => {
	const { currentBlockId, isPasting, settings } = props

	// Get the regex of all rules
	let theRegs = rules.filter( reg => true === settings?.find( s => s.slug === reg.slug )?.value )

	// Get the current block
	const block = getBlock( currentBlockId )

	// Check if the current block should be checked and can be checked
	if ( ! blockShouldBeChecked( currentBlockId ) || ! blockCanTechnicallyBeChecked( currentBlockId ) ) return

	// Get the attributes of the current block
	let blockAttributes = getBlockAttributes( currentBlockId )

	// We don't apply several fixes on the same typing event
	let contentUpdated = false

	// Loop on regular expressions
	Object.entries( theRegs ).forEach( ( [ _, reg ] ) => {
		
		// Stop correction if block content isn't concerned by the current site locale (language)
		if ( ! isUsedByLocale( reg.slug ) || contentUpdated ) return
		global.consistencyLoop ++
	
		// If the loop is too long, we stop it to avoid infinite loop
		checkIfAMemoryLeakHasOccuredAndStopProcessing( currentBlockId )

		let replaceWithThis = reg.replace
		let firstPart = ''
		let lastPart = ''
		let cursorPosition = 0
		let blockContent = blockAttributes.content
		let selectionStart

		// Remove 'code' 'pre' and 'kbd' and other HTML tags from block content
		let textContent = getOnlyTextFromBlockContent( blockContent )

		// Check if block content is concerned by the regex in the case of a pasted content 
		// (isTyping is false but subscribe detected a paste event)
		let isConcerned = false
		if ( ! isTyping() ) {
			isConcerned = reg.mask.test( textContent )
		}

		// Content splitting in case of typing on the fly to allow the user to undo a correction
		// If isTyping is false, it is the case of a pasted content, so we do not deal with possible undos of the user
		if ( isTyping() ) {

			// Get cursor position in textContent (without tags): needed for further cursor repositioning
			selectionStart = getSelectionStart( block.name )
			cursorPosition = selectionStart?.offset || 0

			// Get cursor position in HTML (with tags): needed to cut in 2 parts at the right position
			const cursorPositionInsideHTML = getCursorPositionInInnerHTML( currentBlockId ) || cursorPosition

			// If the rule depends on previous characters, we need to separate the string taking those characters into account
			const captureGroups = textContent.match( reg.mask )
			if( null === captureGroups || 0 === captureGroups.length ) return
			const lengthToGoBack = captureGroups[0].length || 1

			// Split the string to process only the part from the cursor position to the end
			firstPart = blockContent.substring( 0, cursorPositionInsideHTML - lengthToGoBack )
			lastPart = blockContent.substring( cursorPositionInsideHTML - lengthToGoBack, blockContent.length )
	
			// If first part of the string matches but not the lastPart,
			// it means that a character has been typed uncorrected voluntarily before with CTRL Z/CMD Z
			// so it should not be taken into account
			isConcerned = reg.mask.test( textContent ) && reg.mask.test( lastPart )
		}
		
		// Stop correction if block content isn't concerned by the regex
		if ( ! isConcerned ) return
		
		// Pairing characters need specific process for the replacement
		if ( regDealWithPair( reg ) ) {
			replaceWithThis = getReplacementStringForPairs( reg, blockContent, replaceWithThis )
		}

		// Concat strings
		if ( 0 !== cursorPosition ) {
			blockContent = firstPart + lastPart.replace( reg.mask, replaceWithThis )
		}

		// Pasted content innerBlocks case: no selection, no cursor position so the whole block is fixed 
		if ( 0 === cursorPosition ) {
			blockContent = blockContent.replace( reg.mask, reg.replace )
		}

		// If CTRL Z was used just before, then we do not correct this time
		if ( global.previousFixCanceled ) {
			global.previousFixCanceled = false
			return
		}

		// Update block if previous fix was not canceled
		if ( ! global.previousFixCanceled ) {
			updateBlock( currentBlockId, {
				...block,
				attributes: { ...block.attributes, content: blockContent }
			} )
			contentUpdated = true
		}

		// Cursor repositioning:
		if ( 0 === cursorPosition || isPasting ) return

		// Get the number of characters moved by the replacement: needed for cursor repositioning.
		// If the number depends on the replaced string length, we use a function to get it
		const nbMoved = typeof reg.nbMoved === 'function' ? reg.nbMoved( lastPart ) : reg.nbMoved

		// If the replaced string had more characters than the new string, the cursor has moved forward, so it must be moved back
		// Eg: ... replaced with … removes 2 characters
		if ( nbMoved < 0 ) {
			selectionChange( currentBlockId, selectionStart.attributeKey, cursorPosition + nbMoved, cursorPosition + nbMoved )
		}
		
		// If the replaced string had fewer characters than the new string, the cursor has moved backwards, so it must be moved forward
		// Eg: "" replaced with «  » adds 2 characters
		if ( nbMoved > 0 ) {
			selectionChange( currentBlockId, selectionStart.attributeKey, cursorPosition + 1 + nbMoved, cursorPosition + nbMoved )
		}

		if ( 0 === nbMoved ) {
			selectionChange( currentBlockId, selectionStart.attributeKey, cursorPosition, cursorPosition )
		}

	} )

	global.consistencyLoop = 0

}

/**
 * Fixes all blocks generated by pasting.
 */
export const fixAll = props => {

	const { settings } = props

	// Get the regex of all rules
	let theRegs = rules.filter( reg => true === settings?.find( s => s.slug === reg.slug )?.value )

	// Get all blocks generated by pasting (which does not integrate innerBlocks)
	const allBlocks = getBlocks()

	// Get all innerBlocks for a later bulk selection process that will generate their fix
	const allInners = getAllInnersFromParents( allBlocks )

	// Loop on all parents blocks
	const updates = allBlocks.reduce( ( acc, block ) => {
		// Get the content of the block
		let newContent = block.attributes?.content
		
		// If the block is not one of the blocks authorized to be processed (list in rules.js) or if the content is undefined, we do nothing
		if ( ! processedBlocks.includes( block.name )
			|| undefined === newContent ) {
			return acc
		}
	
		Object.entries( theRegs ).forEach( ( [ _, reg ] ) => {

			// If the rule is not used by the locale, we do nothing
			if ( ! isUsedByLocale( reg.slug ) ) return

			// If the rule is a pair rule, we use a specific regex
			if ( regsWithPair.includes( reg.slug ) ) {
				const singleCharacterOfPair = reg.mask.toString().match( /(?<=\/).+?(?=\/)/g )[0]
				const realReg = new RegExp( `(?<!\=)${singleCharacterOfPair}(?!>)([^${singleCharacterOfPair}]*)(?<!\=)${singleCharacterOfPair}(?!>)`, 'g' )
				newContent = newContent.replaceAll( realReg, reg.replace )
			}

			// If the rule is not a pair rule, we use the regex as it is
			if ( ! regsWithPair.includes( reg.slug ) ) {
				const stringRegex = reg.mask.toString()
				const regWithGlobalFlag = new RegExp( stringRegex.substring( 1, stringRegex.length - 1 ), 'g' )
				newContent = newContent.replaceAll( regWithGlobalFlag, reg.replace )
			}

		} )

		// If the new content is not undefined, we update the block
		if ( undefined !== newContent ) {
			acc[ block.clientId ] = { content: newContent }
		}
		return acc
	}, {} )

	// Update all parents blocks
	if ( Object.keys( updates ).length > 0 && global.contentPasted ) {
		global.contentPasted = false
		updateBlockAttributes( Object.keys( updates ), updates, true );
	}
	global.contentPasted = false

	// Select all innerBlocks to trigger their correction, then deselect all by selecting the first block
	const isPasting = true
	allInners.forEach( block => { 
		if ( ! processedBlocks.includes( block.name ) ) return
		const currentBlockId = block.clientId
		block?.clientId && fixIt( { currentBlockId, theRegs, isPasting } )
	} )

}
