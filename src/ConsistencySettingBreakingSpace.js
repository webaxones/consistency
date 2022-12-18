import { __ } from '@wordpress/i18n'
import { useDispatch } from '@wordpress/data'
import { ToggleControl } from '@wordpress/components'
import { store as coreStore, useEntityProp } from '@wordpress/core-data'
import { store as noticesStore } from '@wordpress/notices'

export const ConsistencySettingBreakingSpace = () => {
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
			if ( 'breakingSpace' === obj.slug ) {
			  return { ...obj, value: value }
			}
			return obj
		} )

		if ( ! newSettings?.find( x => x.slug === 'breakingSpace' ) ) {
			newSettings.push( { slug: 'breakingSpace', value: value } )
		}
		
		setSettings( newSettings )
		saveEditedEntityRecord( 'root', 'site', undefined, newSettings )
		
		createNotice(
			__( 'info', 'consistency' ), // Can be one of: success, info, warning, error.
			value
				? __( 'Breaking space correction is enabled', 'consistency' )
				: __( 'Breaking space correction is disabled', 'consistency' ),
			{ isDismissible: true }
		)
	}

    return(
        <ToggleControl
            label={ __( 'Breaking space correction', 'consistency' )	}
			help={ (
				<>
				{ __( 'Replaces a breaking space followed by a character from this list:', 'consistency' ) }
				<br /><code>? ! : ; » € $ £ ¥ ₽ 元 %</code>
				{ __( ' with a non-breaking space', 'consistency' ) }
				</>
				)
			}
			checked={ settings?.find( x => x.slug === 'breakingSpace' )?.value || false }
            onChange={ onSettingChanged }
        />
    )
}