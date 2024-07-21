/**
 * Summary: UserSettingPanel component.
 * 
 * @description This file contains the UserSettingPanel component used to display the plugin's user settings in sidebar.
 * @author Loïc Antignac.
 */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'
import { Panel, PanelHeader, PanelRow } from '@wordpress/components'

/**
 * External dependencies
 */
import { UserSettingToggle } from './UserSettingToggle'

/**
 * Define the UserSettingPanel component
 */
const UserSettingPanel = () => (
    <Panel className='UserSettingPanel'>
		<PanelHeader><strong>{ __( 'Settings for my account', 'consistency' ) }</strong></PanelHeader>
        <div style={{ padding: 16 }}>
            <PanelRow>
                <UserSettingToggle
                    settingSlug='on_the_fly' 
                    settingName={ __( 'On-the-fly autocorrect', 'consistency' ) }
                    settingDescription={ {
                        __html: __( 'Enable/disable on-the-fly autocorrect', 'consistency' )
                        } }
                />
            </PanelRow>
            <PanelRow>
                <UserSettingToggle
                    settingSlug='on_paste' 
                    settingName={ __( 'On paste autocorrect', 'consistency' ) }
                    settingDescription={ {
                        __html: __( 'Enable/disable autocorrect on paste', 'consistency' )
                        } }
                />
            </PanelRow>
        </div>
    </Panel>
)

export default UserSettingPanel