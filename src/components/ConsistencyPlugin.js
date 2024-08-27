/**
 * @summary: ConsistencyPlugin main component.
 * 
 * This module exports a custom sidebar component for Consistency settings in the Gutenberg editor.
 * It sets up event listeners for Paste and Cancel events and also manages several global
 * variables and states related to the plugin's operation in the GlobalContext context, like
 * the list of blocks allowed to be processed, and more.
 * 
 * @return {*} The ConsistencyPlugin component.
 */

/**
 * External dependencies
 */
import { SidebarSettings } from './Settings'
import useEditorEffects from '../hooks/useEditorEffects'
import usePasteEventHandler from '../hooks/usePasteEventHandler'
import useCancelEventHandler from '../hooks/useCancelEventHandler'
import useSetAllowedBlocks from '../hooks/useSetAllowedBlocks'

/**
 * ConsistencyPlugin component.
 *
 * @return {*} 
 */
const ConsistencyPlugin = () => {

	// Use the paste event handler
	usePasteEventHandler()

	// Use the cancel event handler
	useCancelEventHandler()
	
	// Set all authorized blocks depending on type content in the global context
	useSetAllowedBlocks()

	// Use the editor effects
	useEditorEffects()

	// Render the settings sidebar
    return (
        <SidebarSettings />
    )
}

export default ConsistencyPlugin