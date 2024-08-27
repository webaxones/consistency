/**
 * @summary: Main entry point for the WordPress Consistency plugin.
 * 
 * This module registers a custom sidebar for Consistency settings
 * and wraps the ConsistencyPlugin component in a GlobalProvider
 * to provide global variables and states to the plugin's operation.
 *
 * @author Loïc Antignac.
 */

/**
 * WordPress dependencies
 */
import { registerPlugin } from '@wordpress/plugins'
import domReady from '@wordpress/dom-ready'

/**
 * External dependencies
 */
import { GlobalProvider } from './contexts/GlobalContext'
import ConsistencyPlugin from './components/ConsistencyPlugin'

const PluginWrapper = () => (
    <GlobalProvider>
        <ConsistencyPlugin />
    </GlobalProvider>
)

domReady( () => {
    registerPlugin( 'consistency-custom-sidebar', { render: PluginWrapper } )
} )
