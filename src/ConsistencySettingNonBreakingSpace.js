import { __ } from '@wordpress/i18n'
import { useDispatch } from '@wordpress/data'
import { ToggleControl } from '@wordpress/components'
import { store as coreStore, useEntityProp } from '@wordpress/core-data'
import { store as noticesStore } from '@wordpress/notices'

export const ConsistencySettingNonBreakingSpace = () => {
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
			if ( 'nonBreakingSpace' === obj.slug ) {
			  return { ...obj, value: value }
			}
			return obj
		} )

		if ( ! newSettings?.find( x => x.slug === 'nonBreakingSpace' ) ) {
			newSettings.push( { slug: 'nonBreakingSpace', value: value } )
		}
		
		setSettings( newSettings )
		saveEditedEntityRecord( 'root', 'site', undefined, newSettings )
		
		createNotice(
			__( 'info', 'consistency' ), // Can be one of: success, info, warning, error.
			value
				? __( 'Non-breaking space correction is enabled', 'consistency' )
				: __( 'Non-breaking space correction is disabled', 'consistency' ),
			{ isDismissible: true }
		)
	}

    return(
        <ToggleControl
            label={ __( 'Non-breaking space correction', 'consistency' )	}
			help={ __( 'Replace a non-breaking space followed by a character from this list [? ! : € $ %] with a non-breaking space', 'consistency' ) }
            checked={ settings?.find( x => x.slug === 'nonBreakingSpace' )?.value || false }
            onChange={ onSettingChanged }
        />
    )
}