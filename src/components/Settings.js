/**
 * @summary: SidebarSettings component.
 * 
 * This file contains the SidebarSettings component used to display the plugin's settings sidebar in editor.
 * @author Loïc Antignac.
 */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'
import { PluginSidebarMoreMenuItem, PluginSidebar } from '@wordpress/editor'
import { select } from '@wordpress/data'

/**
 * External dependencies
 */
import { ConsistencyIcon } from './icon'
import UserSettingPanel from './UserSettingPanel'
import GlobalSettingPanel from './GlobalSettingPanel'


const { canUser } = select( 'core' )

export const SidebarSettings = () => {
	const isAdmin = canUser( 'create', 'users' )

	return(
		<>
			<PluginSidebar
				name='consistency-custom-sidebar'
				title={ __( 'Consistency', 'consistency' ) }
				icon={ ConsistencyIcon }
			>
				<UserSettingPanel />
				{ isAdmin && <GlobalSettingPanel/> }
			</PluginSidebar>
			<PluginSidebarMoreMenuItem target='consistency-custom-sidebar'>
				{ __( 'Consistency Settings', 'consistency' ) }
			</PluginSidebarMoreMenuItem>
		</>
	)
}
