/**
 * @summary: Custom hook that sets the allowed blocks to be processed.
 * 
 * This hook is used to set the allowed blocks to be processed by the plugin.
 * 
 * @returns {void}
 */

/**
 * External dependencies
 */
import { useEffect, useContext } from '@wordpress/element'
import { getBlockTypes } from '@wordpress/blocks'
import GlobalContext from '../contexts/GlobalContext'

const useSetAllowedBlocks = () => {
 	/**
	 * Global variables in global context
	 */
	const { setBlocksToBeProcessed } = useContext( GlobalContext )

	useEffect( () => {

		// Get all block types
		const blockTypes = getBlockTypes()

		// Get all blocks with content type string or rich-text
		let richTextAndStringContentTypes = blockTypes.filter( block => {
			return block.attributes && block.attributes.content && ( block.attributes.content.type === 'string' || block.attributes.content.type === 'rich-text' )
		} )
		
		// Remove blocks beginning with kadence/ from the list since it doesn't work with them
		richTextAndStringContentTypes = richTextAndStringContentTypes.filter( block => ! block.name.startsWith( 'kadence/' ) )

		// Remove blocks from the list cause we don't want to alter them (core/html) or they don't work properly (core/freeform)
		const blocksToExclude = [ 'core/html', 'core/freeform' ]
		richTextAndStringContentTypes = richTextAndStringContentTypes.filter( block => ! blocksToExclude.includes( block.name ) )
		
		console.log( 'Consistency - Processed blocks:', richTextAndStringContentTypes );
		
		// Set the blocks to be processed in the global context
		setBlocksToBeProcessed( richTextAndStringContentTypes.map( block => block.name ) )

	}, [] )

}

export default useSetAllowedBlocks