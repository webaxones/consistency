/**
 * @summary: UserSettingToggle component.
 * 
 * This file contains the UserSettingToggle component used to display the plugin's user settings in sidebar.
 * @author Loïc Antignac.
 */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'
import { useDispatch, useSelect } from '@wordpress/data'
import { ToggleControl } from '@wordpress/components'
import { store as coreStore, useEntityProp } from '@wordpress/core-data'
import { store as noticesStore } from '@wordpress/notices'

export const UserSettingToggle = props => {

	const { settingSlug, settingName, settingDescription } = props

	const { currentUser } = useSelect( select => {		
		return { currentUser: select( coreStore ).getCurrentUser() }
	}, [] )
	const idUser = currentUser && currentUser.id

	const [ settings, setSettings ] = useEntityProp(
		'root',
		'user',
		'meta',
		idUser
	)

	const { saveEditedEntityRecord } = useDispatch( coreStore )
	const { createNotice } = useDispatch( noticesStore )
	
	const onSettingChanged = value => {
		// For usermeta, settings= meta
		let newSettings = settings?.consistency_plugin_user_settings.map( obj => {
			if ( settingSlug === obj.slug ) {
			  return { ...obj, value: value }
			}
			return obj
		} )

		if ( ! newSettings?.find( x => x.slug === settingSlug ) ) {
			newSettings.push( { slug: settingSlug, value: value } )
		}
		setSettings( { ...settings, consistency_plugin_user_settings: newSettings } )

		saveEditedEntityRecord( 'root', 'user', idUser, { ...settings, meta: newSettings } )

		createNotice(
			__( 'info', 'consistency' ), // Can be one of: success, info, warning, error.
			value
				? sprintf( __( '"%1$s" Correction is enabled', 'consistency' ), settingName	)
				: sprintf( __( '"%1$s" Correction is disabled', 'consistency' ), settingName ),
			{ isDismissible: true, type: 'snackbar', speak: true }
		)
	}

    return(
        <ToggleControl
            label={ settingName }
			help={ ( <span dangerouslySetInnerHTML={ settingDescription } /> ) }
            checked={ settings?.consistency_plugin_user_settings?.find( x => x.slug === settingSlug )?.value || false }
            onChange={ onSettingChanged }
        />
    )
}