import { __ } from '@wordpress/i18n'
import { useDispatch } from '@wordpress/data'
import { ToggleControl } from '@wordpress/components'
import { store as coreStore, useEntityProp } from '@wordpress/core-data'
import { store as noticesStore } from '@wordpress/notices'

export const ConsistencySettingEllipsis = () => {
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
			if ( 'ellipsis' === obj.slug ) {
				return { ...obj, value: value }
			}
			return obj
		} )

		if ( ! newSettings?.find( x => x.slug === 'ellipsis' ) ) {
			newSettings.push( { slug: 'ellipsis', value: value } )
		}
		
		setSettings( newSettings )
		saveEditedEntityRecord( 'root', 'site', undefined, newSettings )
		
		createNotice(
			__( 'info', 'consistency' ), // Can be one of: success, info, warning, error.
			value
				? __( 'Ellipsis correction is enabled', 'consistency' )
				: __( 'Ellipsis correction is disabled', 'consistency' ),
			{ isDismissible: true }
		)
	}

    return(
        <ToggleControl
            label={ __( 'Ellipsis correction', 'consistency' )	}
			help={ __( 'Replaces 3 successive dots (...) with ellipsis (…)', 'consistency' ) }
            checked={ settings?.find( x => x.slug === 'ellipsis' )?.value || false }
            onChange={ onSettingChanged }
        />
    )
}