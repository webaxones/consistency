import { __ } from '@wordpress/i18n'
import { useDispatch, useSelect } from '@wordpress/data'
import { ToggleControl } from '@wordpress/components'
import { store as coreStore, useEntityProp } from '@wordpress/core-data'
import { store as noticesStore } from '@wordpress/notices'

export const ConsistencySettingState = () => {

	const { currentUser } = useSelect( select => {		
		return { currentUser: select( coreStore ).getCurrentUser()	}
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
		setSettings( 
			{ consistency_plugin_setting_state: [ value ] }
		)
		saveEditedEntityRecord( 'root', 'user' , idUser, 
			{ consistency_plugin_setting_state: [ value ] }
		)

		createNotice(
			__( 'info', 'consistency' ), // Can be one of: success, info, warning, error.
			value
				? __( 'Consistency Correction is enabled', 'consistency' )
				: __( 'Consistency Correction is disabled', 'consistency' ),
			{ isDismissible: true, type: 'snackbar', speak: true, explicitDismiss: true }
		)
	}

    return(
        <ToggleControl
            label={ __( 'Consistency Correction', 'consistency' ) }
			help={ __( 'Turn on/off autocorrect for my account', 'consistency' ) }
            checked={ settings?.consistency_plugin_setting_state[ 0 ] || false }
            onChange={ onSettingChanged }
        />
    )
}