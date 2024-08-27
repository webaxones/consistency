/**
 * @summary: Data retrieval.
 * 
 * This file contains functions that retrieve data from database.
 * @author Loïc Antignac.
 */

/**
 * WordPress dependencies
 */
import { store as coreStore } from '@wordpress/core-data'
import { select, dispatch } from '@wordpress/data'
import { RichTextData, create } from '@wordpress/rich-text'

/**
 * External dependencies
 */
import { isString, isRichTextData } from './utils'

const { getEntityRecord } = select( 'core' )
const { updateBlock } = dispatch( 'core/block-editor' )

/**
 * Retrieves the localization management setting.
 * 
 * @returns {boolean} The localization management setting.
 */
export const isLocalizationEnabled = () => {
	
	const siteEntity = getEntityRecord( 'root', 'site' )
	const localizationManagementSetting = siteEntity?.consistency_plugin_localization_management || true

	return localizationManagementSetting

}

/**
 * Retrieves the rules settings from the site entity.
 * @returns {Object} The rules settings object.
 */
export const fetchRuleSettings = () => {
	
	const siteEntity = getEntityRecord( 'root', 'site' )
	const ruleSettings = siteEntity?.consistency_plugin_settings || []

	return ruleSettings

}

/**
 * Get current user settings from usermeta
 *
 * @return {object} userSettings Current user settings: userSettings.onTheFly, userSettings.onPaste
 */
export const fetchCurrentUserSettings = () => {

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
export const fetchCurrentLocale = () => {

	const siteEntity = getEntityRecord( 'root', 'site' )
	const currentLocale = siteEntity?.language || 'en_US'
	return currentLocale

}

/**
 * Updates the text content of a block depending on its type.
 * Blocks can have text content stored as a string or as a RichTextData object.
 *
 * @param {Object} props - The props object.
 * @param {Object} props.block - The block object.
 * @param {string} props.currentBlockId - The ID of the current block.
 * @param {Object} props.blockAttributes - The attributes of the block.
 * @param {string|Object} props.blockContent - The content of the block.
 * @returns {boolean} - Returns true if the block text content was updated successfully, otherwise false.
 */
export const updateBlockTextContent = props => {

	const { block, currentBlockId, blockAttributes, blockContent } = props
	
	let newBlockTextContent
	
	if ( isRichTextData( blockAttributes.content ) ) {
		
		const newRichTextValue = create( {
			...blockAttributes.content,
			text: blockContent
		} )
		newBlockTextContent = new RichTextData( newRichTextValue )

	}
	
	if ( isString( blockAttributes.content ) ) {
		newBlockTextContent = blockContent
	}

	if ( newBlockTextContent !== undefined ) {
			
		updateBlock( currentBlockId, {
			...block,
			attributes: { ...blockAttributes, content: newBlockTextContent }
		} )
		
		return true
	}
	
	return false

}