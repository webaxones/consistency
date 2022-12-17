import { __ } from '@wordpress/i18n'
import { useDispatch } from '@wordpress/data'
import { ToggleControl } from '@wordpress/components'
import { store as coreStore, useEntityProp } from '@wordpress/core-data'
import { store as noticesStore } from '@wordpress/notices'

export const ConsistencySettingQuote = () => {
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
			if ( 'quote' === obj.slug ) {
			  return { ...obj, value: value }
			}
			return obj
		} )

		if ( ! newSettings?.find( x => x.slug === 'quote' ) ) {
			newSettings.push( { slug: 'quote', value: value } )
		}
		
		setSettings( newSettings )
		saveEditedEntityRecord( 'root', 'site', undefined, newSettings )
		
		createNotice(
			__( 'info', 'consistency' ), // Can be one of: success, info, warning, error.
			value
				? __( 'Quote correction is enabled', 'consistency' )
				: __( 'Quote correction is disabled', 'consistency' ),
			{ isDismissible: true }
		)
	}

    return(
        <ToggleControl
            label={ __( 'Quote correction', 'consistency' )	}
			help={ __( 'Replace straight quotes (\') with curved quotes (’)', 'consistency' ) }
            checked={ settings?.find( x => x.slug === 'quote' )?.value || false }
            onChange={ onSettingChanged }
        />
    )
}