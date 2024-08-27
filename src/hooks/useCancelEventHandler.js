/**
 * @summary Cancel event listener.
 * 
 * This hook listens for the user to press `Ctrl + Z` or `Cmd + Z`
 * and sets the `previousFixCanceled` state.
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

const useCancelEventHandler = () => {
	/**
	 * Global variables in global context
	 */
	const { isEditorInIframe, setPreviousFixCanceled } = useContext( GlobalContext )

	// Create a ref to track if the cancel event has been attached
	const isCancelEventAttached = useRef( false )

	useEffect( () => {

		// If the cancel event has already been attached, return
		if ( isCancelEventAttached.current ) return

		// Update the global variables to track if the previous fix has been canceled
		const trackCancelEvent = e => {
			if ( e.keyCode === 90 && ( e.ctrlKey || e.metaKey ) ) {
				setPreviousFixCanceled( true )
				// e.preventDefault()
			}
		}

		// Function to attach the cancel event listener
		const attachCancelEventListener = targetElement => {
			// Add the cancel event listener to the target element
			targetElement.addEventListener( 'keydown', trackCancelEvent )

			// Return a cleanup function to remove the event listener
			return () => {
				targetElement.removeEventListener( 'keydown', trackCancelEvent )
			}
		}

		// Get the target element depending on whether the editor is in an iframe or not
		const targetElement = isEditorInIframe
			? document.querySelector( 'iframe[name="editor-canvas"]' )
			: document.querySelector( '#editor' )

		if ( ! targetElement ) return

		// Attach the cancel event listener and get the cleanup function
		const cleanup = attachCancelEventListener( targetElement )

		// If the iframe is already loaded, manually trigger the event listener attachment
		if ( isEditorInIframe && targetElement.contentWindow.document.readyState === 'complete' ) {
			attachCancelEventListener( targetElement )
		}

		// Update the ref to track if the cancel event has been attached
		isCancelEventAttached.current = true

		return cleanup

	}, [ setPreviousFixCanceled ] )

}

export default useCancelEventHandler