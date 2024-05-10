/**
 * Summary: ConsistencyGlobalSettingToggle component.
 * 
 * @description This file contains the ConsistencyGlobalSettingToggle component used to display the plugin's global settings in sidebar.
 * @author Loïc Antignac.
 */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'
import { useDispatch } from '@wordpress/data'
import { PanelRow, ToggleControl } from '@wordpress/components'
import { store as coreStore, useEntityProp } from '@wordpress/core-data'
import { store as noticesStore } from '@wordpress/notices'

/**
 * External dependencies
 */
import { isUsedByLocale } from '../app/checks'

export const ConsistencyGlobalSettingToggle = props => {

	const { settingSlug, settingName, settingDescription } = props

	if ( ! isUsedByLocale( settingSlug ) ) return ''

	const [ settings, setSettings ] = useEntityProp(
		'root',
		'site',
		'consistency_plugin_settings',
		undefined
	)

	const { saveEditedEntityRecord } = useDispatch( coreStore )
	const { createNotice } = useDispatch( noticesStore )
		
	const onSettingChanged = value => {

		let newSettings = settings.map( obj => {
			if ( settingSlug === obj.slug ) {
			  return { ...obj, value: value }
			}
			return obj
		} )

		if ( ! newSettings?.find( x => x.slug === settingSlug ) ) {
			newSettings.push( { slug: settingSlug, value: value } )
		}

		setSettings( newSettings )
		saveEditedEntityRecord( 'root', 'site', undefined, newSettings )
		
		createNotice(
			__( 'info', 'consistency' ), // Can be one of: success, info, warning, error.
			value
				? sprintf( __( '"%1$s" Correction is enabled', 'consistency' ), settingName	)
				: sprintf( __( '"%1$s" Correction is disabled', 'consistency' ), settingName ),
			{ isDismissible: true, type: 'snackbar', speak: true }
		)
	}

    return(
		<PanelRow>
			<ToggleControl
				label={ settingName }
				help={ ( <span dangerouslySetInnerHTML={ settingDescription } /> ) }
				checked={ settings?.find( x => x.slug === settingSlug )?.value || false }
				onChange={ onSettingChanged }
			/>
		</PanelRow>
    )
}