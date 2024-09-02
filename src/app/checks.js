/**
 * @summary: Various checks functions.
 * 
 * This file contains functions for various checks.
 * @author Loïc Antignac.
 */

/**
 * WordPress dependencies
 */
import { select } from '@wordpress/data'

/**
 * External dependencies
 */
import { fetchCurrentLocale } from './data'
import { pairedCharacterSlugs } from '../config/pairedCharacterSlugs'
import { incompatibilities } from '../config/incompatibilities'
import { getLocalizedRuleSettings } from './helpers'
import { isString, isRichTextData } from './utils'

const { getBlockName, getBlockAttributes } = select( 'core/block-editor' )

/**
 * Check if setting is used by current active locale
 *
 * @param {string} settingSlug Slug of setting, same as regex
 * @return {boolean} 
 */
export const isUsedByLocale = settingSlug => {

	const currentLocale = fetchCurrentLocale()
	if ( localesByRules !== undefined && localesByRules.hasOwnProperty( settingSlug ) ) {
		return localesByRules[settingSlug].includes( currentLocale )
	}
	return false

}

/**
 * Checks if the current block is one of those to be processed or not
 *
 * @param {Object} props - The props object containing the necessary data.
 * @param {string} props.currentBlockId - The ID of the current block.
 * @param {Array} props.blocksToBeProcessed - The blocks to be processed.
 * @return {boolean} Should the block be processed?
 */
export const shouldProcessBlock = props => {

	const { currentBlockId, blocksToBeProcessed } = props

	const blockName = getBlockName( currentBlockId )
	
	if ( blocksToBeProcessed.includes( blockName ) ) {
		return true
	}
	return false

}

/**
 * Checks if the current block can technically be processed or not
 *
 * @param {string} currentBlockId currentBlockId current active block ID
 * @return {boolean} Can the block be processed?
 */
export const canProcessBlock = currentBlockId => {

	const blockAttributes = getBlockAttributes( currentBlockId )
	
	if ( ! blockAttributes || ! blockAttributes.hasOwnProperty( 'content' ) ) return false

	if ( isString( blockAttributes.content ) || isRichTextData( blockAttributes.content ) ) {
		return true
	}
	
	return false

}

/**
 * Checks if the regex processes a pair
 *
 * @param {string} reg regex
 * @return {boolean} Does the regex process a pair?
 */
export const regDealWithPair = reg => {

	if ( pairedCharacterSlugs.includes( reg.slug ) ) {
		return true
	}
	return false

}

/**
 * Checks if at least one incompatible rule of the current rule is enabled.
 * 
 * @param {string} currentRule - The current rule to check.
 * @returns {boolean} - Returns true if at least one incompatible rule is enabled, otherwise false.
 */
export const checkRuleCompatibility = currentRule => {

	// Get the current rule from the incompatibilities array
	const rule = incompatibilities.find( rule => rule.slug === currentRule )
	if ( ! rule ) return false

	// Check if at least one incompatible rule is enabled
	return rule.incompatibleWith.some( incompatibleRule => {
		// Return the state of the incompatible rule
		return getLocalizedRuleSettings()?.find( setting => setting.slug === incompatibleRule )?.value
	} )

}
