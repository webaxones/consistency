import { select, dispatch } from '@wordpress/data'
import { isUsedByLocale } from './app/helpers'
import { processedBlocks } from './rules'
const { getBlockName, getBlockAttributes, getSelectionStart } = select( 'core/block-editor' )
const { updateBlock, selectionChange } = dispatch( 'core/block-editor' )

/**
 * Fixes the typography of one block
 *
 * @param {object} props currentBLockId Current selected block ID, theRegs Array of all regex
 */
export const fixIt = props => {

	const { currentBlockId, theRegs } = props

	const blockName = getBlockName( currentBlockId )
	if ( ! processedBlocks.includes( blockName ) ) return

	let blockAttributes = getBlockAttributes( currentBlockId )
	if ( ! blockAttributes || ! blockAttributes.hasOwnProperty( 'content' ) || '' === blockAttributes.content ) return
	
	// Go through all the regular expressions
	Object.entries( theRegs ).forEach( ( [ _, reg ] ) => {
		
		// Check if block content is concerned by the regex
		const isConcerned = reg.mask.test( blockAttributes.content )

		// Stop correction if block content isn't concerned by the regex nor by the current site locale (language)
		if ( ! isConcerned || ! isUsedByLocale( reg.name ) ) return

		// Get values for further cursor position fix
		const cursorMoved = 0 !== reg.nbMoved
		const selStart = getSelectionStart( blockName )

		// Replacement and save
		blockAttributes.content = blockAttributes.content.replaceAll( reg.mask, reg.replace )
		updateBlock( currentBlockId, blockAttributes )
		
		// Cursor repositioning:
		// If the replaced string had more characters than the new string, the cursor has moved forward, so it must be moved back
		// Eg: ... replaced with … removes 2 characters
		if ( cursorMoved && reg.nbMoved < 0 ) {
			cursorMoved && selectionChange( currentBlockId, selStart.attributeKey, selStart.offset - 1, selStart.offset + reg.nbMoved )
		}

		// If the replaced string had fewer characters than the new string, the cursor has moved backwards, so it must be moved forward
		// Eg: "" replaced with «  » adds 2 characters
		if ( cursorMoved && reg.nbMoved > 0 ) {
			cursorMoved && selectionChange( currentBlockId, selStart.attributeKey, selStart.offset + 1 + reg.nbMoved, selStart.offset + reg.nbMoved )
		}
	} )
}
