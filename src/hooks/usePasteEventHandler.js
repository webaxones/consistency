/**
 * @summary Paste event listener.
 * 
 * This hook is used to attach a paste event listener
 * to the editor iframe or the editor div element.
 * 
 * @return {void}
 */

/**
 * WordPress dependencies
 */
import { useEffect, useContext, useRef } from '@wordpress/element'

/**
 * External dependencies
 */
import GlobalContext from '../contexts/GlobalContext'

const usePasteEventHandler = () => {
	/**
	 * Global variables in global context
	 */
	const { isEditorInIframe, isContentPastedRef } = useContext( GlobalContext )

	// Create a ref to track if the paste event has been attached
	const isPasteEventAttached = useRef( false )

	useEffect( () => {

		// If the paste event has already been attached, return
		if ( isPasteEventAttached.current ) return

		// Update the global variables to track if content has been pasted
		const trackPasteEvent = e => {
			isContentPastedRef.current = true
		}

		// Function to attach the paste event listener
		const attachPasteEventListener = targetElement => {
			// Add the paste event listener to the target element
			targetElement.addEventListener( 'paste', trackPasteEvent )
	
			// Return a cleanup function to remove the event listener
			return () => {
				targetElement.removeEventListener( 'paste', trackPasteEvent )
			}
		}

		// Get the target element depending on whether the editor is in an iframe or not
		const targetElement = isEditorInIframe
			? document.querySelector( 'iframe[name="editor-canvas"]' ) 
			: document.querySelector( '#editor' )

		if ( ! targetElement ) return

		// Attach the paste event listener and get the cleanup function
		const cleanup = attachPasteEventListener( targetElement )

		// If the iframe is already loaded, manually trigger the event listener attachment
		if ( isEditorInIframe && targetElement.contentWindow.document.readyState === 'complete' ) {
			attachPasteEventListener( targetElement )
		}

		// Update the ref to track if the paste event has been attached
		isPasteEventAttached.current = true

		// Return the cleanup function to be called when the component unmounts or before the effect re-runs
		return cleanup

	}, [ isEditorInIframe ] )
}

export default usePasteEventHandler