/**
 * Main entry point for the WordPress Consistency plugin.
 * 
 * This module registers a custom sidebar for settings and sets up event listeners for 
 * state changes in the Gutenberg editor. It handles on-the-fly and on-paste text 
 * consistency fixes based on user and global settings. It also manages several global 
 * variables and states related to the plugin's operation.
 *
 * @author Loïc Antignac.
 */

/**
 * WordPress dependencies
 */
import { registerPlugin } from '@wordpress/plugins'
import { subscribe, select } from '@wordpress/data'
import domReady from '@wordpress/dom-ready'
import { SidebarSettings } from './components/Settings'


/**
 * External dependencies
 */
import { fixIt, fixAll } from './app/fixes'
import { getAuthorizedRuleSettings, getCurrentUserSettings } from './app/data'
import { interceptPasteEventInEditor } from './app/helpers'

// Get the current selected block and its attributes
const { getSelectedBlockClientId, isTyping, getBlockAttributes } = select( 'core/block-editor' )

// Register the plugin to get the settings sidebar
registerPlugin( 'consistency-custom-sidebar', {
    render: SidebarSettings,
} )

domReady( () => {

	/**
	 * Global object properties
	 */
	
	// This global makes it possible to count the loops on the regex in order to trigger a cut on a possible infinite loop
	global.consistencyLoop = 0
	// This global is used to store the content of the block to avoid fixing it if it has not changed since we check at every state change
	global.previousFixCanceledContent = ''
	// This global is used to avoid new fixes when the user is undoing a fix with CTRL/CMD Z
	global.previousFixCanceled = false
	// This global is used to know if some content has been pasted in the editor
	global.contentPasted = false
	// Since we attach the paste event in a subscribe, we need to check if it is already attached
	global.isPasteEventAttached = false
	// Check if custom fields are active because the editor content is within an iframe when custom fields are inactive
	global.isEditorInIframe = document.querySelector( 'iframe[name="editor-canvas"]' ) !== null ? true : false

	// Intercept CTRL Z to cancel next fix: when the user is undoing a fix, we don't want to fix it again.
	document.querySelector( '#editor' )?.addEventListener( 'keydown', e => {
		if ( 90 === e.keyCode && ( e.ctrlKey || e.metaKey ) ) {
			global.previousFixCanceled = true
			
			e.preventDefault()
		}
	} )
	
	// Let’s listen for state changes
	subscribe( () => {

		// Intercept clipboard paste to fix all new blocks
		interceptPasteEventInEditor()

		// Get current user settings to check if we have to fix the content or to stop here
		const { onTheFly, onPaste } = getCurrentUserSettings()
		if ( ! onTheFly && ! onPaste ) return

		// Get fixing rules from site entity global settings 
		const authorizedRuleSettings = getAuthorizedRuleSettings()
		if ( undefined === authorizedRuleSettings ) return

		// If content has been copied/pasted generating blocks, and if onPaste is enabled, we fix all blocks then stop here
		if ( global.contentPasted && onPaste ) {
			fixAll( { authorizedRuleSettings } )
			return
		}

		// Get current selected block
		const currentBlockId = getSelectedBlockClientId()

		// Stop here if no block is selected or if fixing on the fly is disabled
		if ( null === currentBlockId || global.contentPasted || ! onTheFly ) return

		// Don't try to fix block content if nothing has changed
		const blockAttributes = getBlockAttributes( currentBlockId )
		if ( blockAttributes.hasOwnProperty( 'content' ) && global.previousFixCanceledContent === blockAttributes.content ) {
			return
		}

		// Store the block content to avoid fixing it twice at the next state change
		global.previousFixCanceledContent = blockAttributes.content

		// Fixes the typography of current selected block
		const isPasting = false
		isTyping() && fixIt( { currentBlockId, isPasting, authorizedRuleSettings } )
	
	} )
} )
