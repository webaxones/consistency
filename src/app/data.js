/**
 * Summary: Data retrieval.
 * 
 * @description This file contains functions that retrieve data from database.
 * @author Loïc Antignac.
 */

/**
 * WordPress dependencies
 */
import { store as coreStore } from '@wordpress/core-data'
import { select } from '@wordpress/data'

const { getEntityRecord } = select( 'core' )

/**
 * Retrieves the global settings from the site entity.
 * @returns {Object} The global settings object.
 */
export const getGlobalSettings = () => {
	
	const siteEntity = getEntityRecord( 'root', 'site' )
	const globalSettings = siteEntity?.consistency_plugin_settings

	return globalSettings

}

/**
 * Retrieves the localization management setting from the site entity.
 * @returns {any} The localization management setting.
 */
export const getLocalizationManagementSetting = () => {
	
	const siteEntity = getEntityRecord( 'root', 'site' )
	const localizationManagementSetting = siteEntity?.consistency_plugin_localization_management

	return localizationManagementSetting

}

/**
 * Get current user settings from usermeta
 *
 * @return {object} userSettings Current user settings: userSettings.onTheFly, userSettings.onPaste
 */
export const getCurrentUserSettings = () => {

	const userSettings = {
		onTheFly: false,
		onPaste: false
	}
	const currentUser = select( coreStore ).getCurrentUser()
	const idUser = currentUser?.id || 0
	const currentUserEntity = getEntityRecord( 'root', 'user', idUser, 'consistency_plugin_user_settings' )
	const userConsistencySettings = currentUserEntity?.meta?.consistency_plugin_user_settings
	userSettings.onTheFly = userConsistencySettings?.find( s => s.slug === 'on_the_fly' )?.value || false
	userSettings.onPaste = userConsistencySettings?.find( s => s.slug === 'on_paste' )?.value || false

	return userSettings

}

/**
 * Get current active site locale
 *
 * @return {string} currentLocale Current active site locale
 */
export const getCurrentLocale = () => {

	const siteEntity = getEntityRecord( 'root', 'site' )
	const currentLocale = siteEntity?.language || 'en_US'
	return currentLocale

}