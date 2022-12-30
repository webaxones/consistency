/**
 * WordPress dependencies
 */
import { select } from '@wordpress/data'

/**
 * External dependencies
 */
import { getCurrentLocale } from './data'
import { regs, regsWithPair, processedBlocks } from './rules'

const { getBlockName, getBlockAttributes } = select( 'core/block-editor' )


/**
 * Check if setting is used by current active locale
 *
 * @param {string} settingSlug Slug of setting, same as regex
 * @return {boolean} 
 */
export const isUsedByLocale = settingSlug => {

	const currentLocale = getCurrentLocale()
	const theRegex = regs?.find( x => x.name === settingSlug )

	if ( undefined !== theRegex && theRegex?.locales?.includes( currentLocale ) ) {
		return true
	}

	return false

}

/**
 * Checks if the current block should be checked or not
 *
 * @param {string} currentBlockId currentBlockId current active block ID
 * @return {boolean} Should the block be checked?
 */
export const blockShouldBeChecked = currentBlockId => {

	const blockName = getBlockName( currentBlockId )
	if ( processedBlocks.includes( blockName ) ) {
		return true
	}
	return false

}

/**
 * Checks if the current block can be checked or not
 *
 * @param {string} currentBlockId currentBlockId current active block ID
 * @return {boolean} Can the block be checked?
 */
export const blockCanBeChecked = currentBlockId => {

	const blockAttributes = getBlockAttributes( currentBlockId )
	if ( blockAttributes && blockAttributes.hasOwnProperty( 'content' ) && '' !== blockAttributes.content ) {
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

	if ( regsWithPair.includes( reg.name ) ) {
		return true
	}
	return false

}