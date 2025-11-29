/**
 * @summary: Block processing.
 * 
 * This file contains the main processing operations operating on the blocks to adapt the texts according to the configured rules.
 * @author Loïc Antignac.
 */

/**
 * WordPress dependencies
 */
import { select, dispatch } from '@wordpress/data'
import { applyFormat } from '@wordpress/rich-text'

/**
 * External dependencies
 */
import { getAllInnersFromParents, removeHTMLTagsFromBlockContent, getCursorPositionInInnerHTML } from './utils'
import { getReplacementStringForPairs, getLocalizedRules } from './helpers'
import { updateBlockTextContent } from './data'
import { pairedCharacterSlugs } from '../config/pairedCharacterSlugs'
import { shouldProcessBlock, canProcessBlock, regDealWithPair } from './checks'

const { getBlock, getBlocks, getBlockAttributes, getSelectionStart, isTyping } = select( 'core/block-editor' )
const { updateBlockAttributes, updateBlock } = dispatch( 'core/block-editor' )


/**
 * Fixes the current block based on the provided rules and attributes.
 *
 * @param {Object} props - The props object.
 * @param {string} props.currentBlockId - The ID of the current block.
 * @param {boolean} props.isPreviousFixCanceled - Indicates if the previous fix was canceled.
 * @param {function} props.setPreviousFixCanceled - The function to set the previous fix canceled state.
 * @param {Array} props.blocksToBeProcessed - The blocks to be processed: we pass them as props to avoid using global context since we are not in a component.
 * @param {Ref} props.cursorOffsetRef - The reference to the cursor offset.
 */
export const fixIt = props => {

	const { currentBlockId, isPreviousFixCanceled, setPreviousFixCanceled, blocksToBeProcessed, cursorOffsetRef } = props
	
	// Check if the current block should be processed and can be processed
	if ( ! shouldProcessBlock( { currentBlockId, blocksToBeProcessed } ) || ! canProcessBlock( currentBlockId ) ) return
	
	// Get the relevant rules
	let localizedRules = getLocalizedRules()
	
	// Get the current block
	const block = getBlock( currentBlockId )
	
	// Get the attributes of the current block
	let blockAttributes = getBlockAttributes( currentBlockId )
	
	// We don't apply several fixes on the same typing event so we need a variable to check if the content has already been updated
	let contentUpdated = false

	// Loop on localized rules to check if the block content matches one regex
	Object.entries( localizedRules ).forEach( ( [ _, rule ] ) => {

		// Stop correction if block content has already been updated
		if ( contentUpdated ) return

		if ( rule.format !== '' ) return

		const isRichTextValueObject = ( typeof blockAttributes.content === 'object' )

		let replaceWithThis = rule.replace
		let firstPart = ''
		let lastPart = ''
		let cursorPosition = 0
		let cursorPositionInsideHTML = 0
		let selectionStart
		let richTextValueObject = ( typeof blockAttributes.content === 'object' ) ? blockAttributes.content : {}
		let blockContent = ( typeof blockAttributes.content === 'object' ) ? blockAttributes.content.text : blockAttributes.content

		// Remove 'code' 'pre' and 'kbd' and other HTML tags from block content
		let textContent = removeHTMLTagsFromBlockContent( blockContent )
		
		// Check if the block's text content matches the regex in the case of pasted content 
		// (isTyping is false but the subscription detected a paste event)
		let isConcerned = false
		if ( ! isTyping() ) {
			isConcerned = rule.mask.test( textContent )
		}
		
		// Splitting content during real-time typing to allow the user to undo a correction
		// If isTyping is false, it indicates pasted content, so we don't handle potential undos by the user
		if ( isTyping() ) {
			
			// Get cursor position in textContent (without tags): needed for further cursor repositioning
			selectionStart = getSelectionStart()
			cursorPosition = selectionStart?.offset || document.getSelection()?.anchorOffset || 0

			// Get cursor position in HTML (with tags): needed to cut in 2 parts at the right position
			cursorPositionInsideHTML = getCursorPositionInInnerHTML( currentBlockId ) || cursorPosition
			
			// If the rule depends on previous characters, we need to separate the string taking those characters into account
			const captureGroups = textContent.match( rule.mask )
			
			if( null === captureGroups || 0 === captureGroups.length ) return
			
			const lengthToGoBack = captureGroups[0].length || 1

			// Split the string to process only the part from the cursor position to the end
			firstPart = textContent.substring( 0, cursorPositionInsideHTML - lengthToGoBack )
			lastPart = textContent.substring( cursorPositionInsideHTML - lengthToGoBack, textContent.length )
					
			// If first part of the string matches but not the lastPart,
			// it means that a character has been typed uncorrected voluntarily before with CTRL Z/CMD Z
			// so it should not be taken into account
			isConcerned = rule.mask.test( textContent ) && rule.mask.test( lastPart )
		}
		
		// Stop correction if block content isn't concerned by the regex
		if ( ! isConcerned ) return
			
		// Pairing characters need specific process for the replacement
		if ( regDealWithPair( rule ) ) {
			replaceWithThis = getReplacementStringForPairs( rule, blockContent, replaceWithThis )
		}
		
		// Concat strings
		if ( 0 !== cursorPositionInsideHTML ) {
			const typedReplacement = getTypedReplacementResult( {
				firstPart,
				lastPart,
				mask: rule.mask,
				replaceValue: replaceWithThis
			} )

			if ( typedReplacement === null ) {
				return
			}

			blockContent = typedReplacement
		}

		// Pasted content innerBlocks case: no selection, no cursor position so the whole block is fixed 
		if ( 0 === cursorPositionInsideHTML ) {
			blockContent = blockContent.replace( rule.mask, rule.replace )
		}
		
		// If CTRL Z was used just before, skip the correction this time
		if ( isPreviousFixCanceled ) {
			setPreviousFixCanceled( false )
			return
		}

		// Update block text content if previous fix was not canceled
		if ( ! isPreviousFixCanceled && rule.format === '' ) {
			contentUpdated = updateBlockTextContent( { block, currentBlockId, blockAttributes, blockContent } )
		}

		// Apply superscript Format to the replaced string for specific rules
		// if ( ['ordinalNumberSuffix'].includes( rule.slug ) ) {
		// 	contentUpdated = true

		// 	const startPos = cursorPosition - 3
		// 	const endPos = cursorPosition - 1
		// 	const newFormat = applyFormat(
		// 		richTextValueObject,
		// 		{ type: 'superscript' },
		// 		startPos,
		// 		endPos
		// 	)
		// 	const newAttributes = {
		// 		...blockAttributes,
		// 		...newFormat,
		// 	}

		// 	// updateBlock( currentBlockId, {
		// 	// 	...block,
		// 	// 	attributes: { ...blockAttributes, newAttributes }
		// 	// } )
		// }

		// Get the number of characters moved by the replacement: needed for cursor repositioning.
		// If the number depends on the replaced string length, we use a function to get it
		const nbMoved = typeof rule.nbMoved === 'function' ? rule.nbMoved( lastPart ) : rule.nbMoved || 0
		
		// Set the cursor offset
		if ( contentUpdated ) {
			cursorOffsetRef.current = nbMoved
		}

	} )

}

/**
 * Fix all blocks generated by pasting based on the provided rules and blocks to be processed.
 *
 * @param {Object} props - The props object containing necessary data.
 * @param {boolean} props.isPreviousFixCanceled - Flag indicating if the previous fix was canceled.
 * @param {function} props.setPreviousFixCanceled - Function to set the flag indicating if the previous fix was canceled.
 * @param {Array} props.blocksToBeProcessed - Array of block names to be processed.
 * @param {Ref} props.cursorOffsetRef - Reference to the cursor offset.
 */
export const fixAll = props => {

	const { isPreviousFixCanceled, setPreviousFixCanceled, blocksToBeProcessed, cursorOffsetRef } = props

	// Get the relevant rules
	let localizedRules = getLocalizedRules()
	
	// Get all blocks generated by pasting (which does not integrate innerBlocks)
	const allBlocks = getBlocks()
	
	// Get all innerBlocks for a later bulk selection process that will generate their fix
	const allInners = getAllInnersFromParents( allBlocks )
	
	// Loop on all parents blocks
	const updates = allBlocks.reduce( ( acc, block ) => {
		// Get the content of the block
		let newContent = block.attributes?.content
		
		// If the block is not one of the blocks authorized to be processed (list in global context) or if the content is undefined, we do nothing
		if ( ! blocksToBeProcessed.includes( block.name )
			|| undefined === newContent ) {
			return acc
		}
	
		Object.entries( localizedRules ).forEach( ( [ _, rule ] ) => {

			// If the rule is a pair rule, we use a specific regex
			if ( pairedCharacterSlugs.includes( rule.slug ) ) {
				const singleCharacterOfPair = rule.mask.toString().match( /(?<=\/).+?(?=\/)/g )[0]
				const realReg = new RegExp( `(?<!\=)${singleCharacterOfPair}(?!>)([^${singleCharacterOfPair}]*)(?<!\=)${singleCharacterOfPair}(?!>)`, 'g' )
				newContent = newContent.replaceAll( realReg, rule.replace )
			}

			// If the rule is not a pair rule, we use the regex as it is
			if ( ! pairedCharacterSlugs.includes( rule.slug ) ) {
				const stringRegex = rule.mask.toString()
				const regWithGlobalFlag = new RegExp( stringRegex.substring( 1, stringRegex.length - 1 ), 'g' )
				newContent = newContent.replaceAll( regWithGlobalFlag, rule.replace )
			}
			
		} )

		// If the new content is not undefined, we update the block
		if ( undefined !== newContent ) {
			acc[ block.clientId ] = { content: newContent }
		}
		return acc
	}, {} )
	
	// Update all parents blocks
	if ( Object.keys( updates ).length > 0 ) {
		updateBlockAttributes( Object.keys( updates ), updates, true );
	}

	// Select all innerBlocks to trigger their correction, then deselect all by selecting the first block
	allInners.forEach( block => { 

		if ( ! blocksToBeProcessed.includes( block.name ) ) return
		const currentBlockId = block.clientId
		block?.clientId && fixIt( { currentBlockId, isPreviousFixCanceled, setPreviousFixCanceled, blocksToBeProcessed, cursorOffsetRef } )

	} )

}

/**
 * Compute updated text content when applying a replacement at the cursor position.
 *
 * @param  {Object} props Replacement context.
 * @param  {string} props.firstPart Text preceding the replaced fragment.
 * @param  {string} props.lastPart Text starting at the fragment to replace.
 * @param  {RegExp} props.mask Regular expression used for the replacement.
 * @param  {string|Function} props.replaceValue Replacement value or callback.
 * @return {string|null}
 */
const getTypedReplacementResult = ( { firstPart, lastPart, mask, replaceValue } ) => {
	if ( typeof lastPart !== 'string' ) {
		return null
	}

	let hasReplacement = false

	const replacementResult = lastPart.replace( mask, ( ...args ) => {
		hasReplacement = true
		const match = args[0]

		if ( typeof replaceValue === 'function' ) {
			return replaceValue( ...args )
		}

		const localMask = new RegExp( mask.source, mask.flags )
		return match.replace( localMask, replaceValue )
	} )

	if ( ! hasReplacement ) {
		return null
	}

	return firstPart + replacementResult
}
