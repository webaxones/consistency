/**
 * @summary: Generic utility functions.
 * 
 * This file contains generic utility functions that are not tied to any specific part of the application.
 * @author Loïc Antignac.
 */

import { RichTextData } from '@wordpress/rich-text'

/**
 * Get all innerBlocks from an array of parents
 * The main use is to retrieve the child core/list-item blocks of the core/list block
 *
 * @param {*} arr
 */
export const getAllInnersFromParents = arr => arr.flatMap( ( { innerBlocks, ...rest } ) => 

	innerBlocks.map( b => ( {
		...rest,
		...b
	} ) )

)

/**
 * Removes HTML tags and specific code tags from the given block content and returns only the text content.
 *
 * @param {string} blockContent - The block content to extract text from.
 * @returns {string} The extracted text content.
 */
export const getOnlyTextFromBlockContent = blockContent => {

	// Remove 'code' 'pre' and 'kbd' tags from block content
	let textContentWithoutCode = blockContent.replace(/<\b(code|pre|kbd)\b>.*?<\/\b(code|pre|kbd)\b>/gi, '')

	// Remove HTML tags from block content
	let textContent = textContentWithoutCode.replace(/(<([^>]+)>)/gi, '')

	return textContent

}

/**
 * Get current cursor position in HTML content of the active block
 *
 * @param {string} currentBlockId Active current block ID
 * @return {integer} cursor position in HTML content
 */
export const getCursorPositionInInnerHTML = currentBlockId => {
	
	// Get current block DOM Node
	const currentActiveBlock = document.querySelector( `#block-${ currentBlockId }` )
	if ( null === currentActiveBlock ) return undefined

	// Get the inner content editable element (like <p> or <code>)
	// Sometimes the contenteditable is not the direct child of the block
	const editableContent = currentActiveBlock.querySelector('[contenteditable="true"]') || currentActiveBlock;
	
	// Get current selection
	const selection = document.getSelection()
	const _range = selection?.getRangeAt( 0 )

	// Return if user is selecting text instead of typing
	if ( ! _range || ! _range.collapsed ) return

	// Clone range to work on
	const range = _range.cloneRange()

	// Create a temporary node to target
	const tempNode = document.createTextNode( '\0' )

	// Insert temporary node as target into cloned range
	range.insertNode( tempNode )

	// Get position of target inside the contenteditable element
	const textContent = editableContent.textContent || ''
	let cursorPositionInsideText = textContent.indexOf( '\0' )
	
	// Remove temporary node and normalize cut node - important!
	tempNode.parentNode.removeChild( tempNode )
	editableContent.normalize()

	// Remove non-breaking spaces in &nbsp; format from the count
	const nbNbsp = (editableContent?.innerHTML.match(/&nbsp;/g) || []).length
	if ( nbNbsp > 0 ) {
		const textContentWithoutNbsp = textContent.replace(/&nbsp;/g, ' ');
		cursorPositionInsideText = textContentWithoutNbsp.indexOf('\0');
		cursorPositionInsideText = cursorPositionInsideText - ( nbNbsp * 6 ) + nbNbsp;
	}

	return cursorPositionInsideText
}

/**
 * Checks if a value is a string.
 *
 * @param {*} value - The value to check.
 * @returns {boolean} - Returns true if the value is a string, false otherwise.
 */
export const isString = value => typeof value === 'string' || value instanceof String

/**
 * Checks if the given value is an instance of RichTextData.
 *
 * @param {*} value - The value to check.
 * @returns {boolean} - Returns true if the value is an instance of RichTextData, otherwise returns false.
 */
export const isRichTextData = value => typeof value === 'object' && value instanceof RichTextData