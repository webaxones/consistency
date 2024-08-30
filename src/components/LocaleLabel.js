/**
 * @summary: GlobalSettingToggle component.
 * 
 * This file contains the GlobalSettingToggle component used to display the plugin's global settings in sidebar.
 * @author Loïc Antignac.
 */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'

/**
 * External dependencies
 */
import { fetchCurrentLocale, isLocalizationEnabled } from '../app/data'


export const LocaleLabel = () => {

	const currentLocale = fetchCurrentLocale()

	const areRulesLocalized = isLocalizationEnabled()

	const localizationManagementLabel = areRulesLocalized
		? __( ` (${ currentLocale } locale)`, 'consistency' )
		: __( ' (all locales)', 'consistency' )

	return(	<span style={{ fontWeight: "normal", fontStyle: "italic", fontSize: "smaller" }}>{ localizationManagementLabel }</span> )
}