import { select, dispatch } from '@wordpress/data'
import { regs } from './regex'

const { getBlockName, getBlockAttributes, getSelectionStart } = select( 'core/block-editor' )
const { updateBlock, selectionChange } = dispatch( 'core/block-editor' )

const processedBlocks = [
	'core/paragraph',
	'core/heading',
	'core/post-title',
]

// Fixes the typography of one block
export const fixIt = props => {

	const { currentBlockId, theRegs } = props

	const blockName = getBlockName( currentBlockId )
	if ( ! processedBlocks.includes( blockName ) ) return

	let blockAttributes = getBlockAttributes( currentBlockId )
	if ( ! blockAttributes || ! blockAttributes.hasOwnProperty( 'content' ) || '' === blockAttributes.content ) return

	Object.entries( theRegs ).forEach( ( [ _, reg ] ) => {

		const isConcerned = reg.mask.test( blockAttributes.content )
		if ( ! isConcerned ) return

		const cursorMoved = 0 !== reg.nbMoved
		const selStart = getSelectionStart( blockName )

		blockAttributes.content = blockAttributes.content.replaceAll( reg.mask, reg.replace )
		updateBlock( currentBlockId, blockAttributes )
		
		cursorMoved && selectionChange( currentBlockId, selStart.attributeKey, selStart.offset - 1, selStart.offset + reg.nbMoved )

	} )
}
