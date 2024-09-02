
/**
 * @summary: Global context.
 *
 * This file contains the global context to store global variables and states used in the plugin.
 * 
 * @type {React.Context}
 * 
 * @return {React.Context}
 */ 

/**
 * WordPress dependencies
 */
import { createContext, useState, useRef } from '@wordpress/element'

/**
 * Global context
 * 
 * @type {React.Context}
 * 
 * @return {React.Context}
 * 
 */
const GlobalContext = createContext()

// Export the global provider
export const GlobalProvider = ( { children } ) => {

	// This variable is used to check if custom fields are active because the editor content is within an iframe when custom fields are inactive
	const [ isEditorInIframe ] = useState( document.querySelector( 'iframe[name="editor-canvas"]' ) !== null )

	// This variable is used to avoid new fixes when the user is undoing a fix with CTRL/CMD Z
	const [ isPreviousFixCanceled, setPreviousFixCanceled ] = useState( false )

	// This variable is used to store the content of the block to avoid fixing it if it has not changed since we check at every state change
	const [ previousFixCanceledContent, setPreviousFixCanceledContent ] = useState( '' )

	// This variable is used to store the blocks allowed to be processed	
	const [ blocksToBeProcessed, setBlocksToBeProcessed ] = useState( [] )

	// This variable is used to store the number of characters lost or gained by the correction in order to move the cursor accordingly
	const cursorOffsetRef = useRef( 0 )

	// This ref is used to track if content has been past
	const isContentPastedRef = useRef( false )

	// Return the global provider
	return (
		<GlobalContext.Provider value={ {
			isEditorInIframe,
			isPreviousFixCanceled,
			setPreviousFixCanceled,
			previousFixCanceledContent,
			setPreviousFixCanceledContent,
			blocksToBeProcessed,
			setBlocksToBeProcessed,
			cursorOffsetRef,
			isContentPastedRef
		} }>
			{ children }
		</GlobalContext.Provider>
	)
}

export default GlobalContext