/**
 * WordPress dependencies
 */
import { select, dispatch } from '@wordpress/data'

/**
 * External dependencies
 */
import { getReplacementStringForPairs, aMemoryLeakHasOccured, getCursorPositionInInnerHTML } from './helpers'
import { isUsedByLocale, blockShouldBeChecked, blockCanBeChecked, regDealWithPair } from './controls'

const { getBlock, getBlockAttributes, getSelectionStart, isTyping } = select( 'core/block-editor' )
const { updateBlock, selectionChange } = dispatch( 'core/block-editor' )

/**
 * Fixes the typography of one block
 *
 * @param {object} props String currentBLockId Current selected block ID, Array theRegs all regex, Boolean isPasting
 */
export const fixIt = props => {

	const { currentBlockId, theRegs, isPasting } = props

	const block = getBlock( currentBlockId )

	// Check if the current block should be checked and can be checked
	if ( ! blockShouldBeChecked( currentBlockId ) || ! blockCanBeChecked( currentBlockId ) ) return

	let blockAttributes = getBlockAttributes( currentBlockId )

	// Loop on regular expressions
	Object.entries( theRegs ).forEach( ( [ _, reg ] ) => {

		global.consistencyLoop ++

		if ( global.consistencyLoop > 150 ) {
			aMemoryLeakHasOccured( currentBlockId )
		}

		let replaceWithThis = reg.replace
		let firstPart = ''
		let lastPart = ''
		let cursorPosition = 0
		let blockContent = blockAttributes.content
		let selectionStart
		
		// Check if block content is concerned by the regex
		let isConcerned = false
		if ( ! isTyping() ) {
			isConcerned = reg.mask.test( blockContent )
		}

		// Content splitting in case of typing on the fly to allow the user to undo a correction
		// If isTyping is false, it is the processing of pasted innerBlocks
		if ( isTyping() ) {

			// Get cursor position in textContent (without tags): needed for cursor repositioning
			selectionStart = getSelectionStart( block.name )
			cursorPosition = selectionStart?.offset || 0

			// Get cursor position in HTML (with tags): needed to cut at the right position
			const cursorPositionInsideHTML = getCursorPositionInInnerHTML( currentBlockId ) || cursorPosition

			// If the rule depends on previous characters, we need to separate the string taking those characters into account
			const captureGroups = blockContent.match( reg.mask )
			if( null === captureGroups || 0 === captureGroups.length ) return
			const lengthToGoBack = captureGroups[0].length || 1			

			// Split the string to process only the part from the cursor position to the end
			firstPart = blockContent.substring( 0, cursorPositionInsideHTML - lengthToGoBack )
			lastPart = blockContent.substring( cursorPositionInsideHTML - lengthToGoBack, blockContent.length )

			// If first part of the string matches but not the lastPart, it means that a character has been typed uncorrected voluntarily before, so it should not be taken into account
			isConcerned = reg.mask.test( blockContent ) && reg.mask.test( lastPart )

		}
		
		// Stop correction if block content isn't concerned by the regex nor by the current site locale (language)
		if ( ! isConcerned || ! isUsedByLocale( reg.name ) ) return

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
		if ( true === global.consistencyHistory ) {
			global.consistencyHistory = false
			return
		}

		// Update block
		if ( false === global.consistencyHistory ) {
			updateBlock( currentBlockId, {
				...block,
				attributes: { ...block.attributes, content: blockContent }
			} )
		}


		// Cursor repositioning:
		if ( 0 === reg.nbMoved || 0 === cursorPosition || isPasting ) return

		// If the replaced string had more characters than the new string, the cursor has moved forward, so it must be moved back
		// Eg: ... replaced with … removes 2 characters
		if ( reg.nbMoved < 0 ) {
			selectionChange( currentBlockId, selectionStart.attributeKey, cursorPosition - 1, cursorPosition + reg.nbMoved )
		}
		
		// If the replaced string had fewer characters than the new string, the cursor has moved backwards, so it must be moved forward
		// Eg: "" replaced with «  » adds 2 characters
		if ( reg.nbMoved > 0 ) {
			selectionChange( currentBlockId, selectionStart.attributeKey, cursorPosition + 1 + reg.nbMoved, cursorPosition + reg.nbMoved )
		}

	} )

	global.consistencyLoop = 0

}
