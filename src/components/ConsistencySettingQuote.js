import { __ } from '@wordpress/i18n'
import { useDispatch } from '@wordpress/data'
import { PanelRow, ToggleControl } from '@wordpress/components'
import { store as coreStore, useEntityProp } from '@wordpress/core-data'
import { store as noticesStore } from '@wordpress/notices'
import { isUsedByLocale } from '../app/helpers'

export const ConsistencySettingQuote = () => {

	const settingSlug = 'quote'

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
				? __( '"Straight quote" Correction is enabled', 'consistency' )
				: __( '"Straight quote" Correction is disabled', 'consistency' ),
			{ isDismissible: true, type: 'snackbar', speak: true, explicitDismiss: true }
		)
	}

    return(
		<PanelRow>
			<ToggleControl
				label={ __( 'Straight quote', 'consistency' )	}
				help={ (
					<>
					{ __( 'Replaces straight quotes with curved quotes:', 'consistency' ) }
					<span aria-hidden='true' style={ { display: 'block' } }><code>'</code> <span style={ { fontSize: '20px' } }>→</span> <code>’</code></span>
					</>
					)
				}
				checked={ settings?.find( x => x.slug === settingSlug )?.value || false }
				onChange={ onSettingChanged }
			/>
		</PanelRow>
    )
}