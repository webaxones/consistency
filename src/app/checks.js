/**
 * Summary: Various checks functions.
 * 
 * @description This file contains functions for various checks.
 * @author Loïc Antignac.
 */

/**
 * WordPress dependencies
 */
import { select } from '@wordpress/data'

/**
 * External dependencies
 */
import { getCurrentLocale } from './data'
import { rules } from '../config/rules'
import { regsWithPair } from '../config/regsWithPair'
import { processedBlocks } from '../config/processedBlocks'
import { aMemoryLeakHasOccured } from './helpers'

const { getBlockName, getBlockAttributes } = select( 'core/block-editor' )


/**
 * Check if setting is used by current active locale
 *
 * @param {string} settingSlug Slug of setting, same as regex
 * @return {boolean} 
 */
export const isUsedByLocale = settingSlug => {

	const currentLocale = getCurrentLocale()
	const theRegex = rules?.find( x => x.slug === settingSlug )

	if ( undefined !== theRegex && theRegex?.locales?.includes( currentLocale ) ) {
		return true
	}

	return false

}

/**
 * Checks if the current block is one of those to be checked or not
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
 * Checks if the current block can technically be verified or not
 *
 * @param {string} currentBlockId currentBlockId current active block ID
 * @return {boolean} Can the block be checked?
 */
export const blockCanTechnicallyBeChecked = currentBlockId => {

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

	if ( regsWithPair.includes( reg.slug ) ) {
		return true
	}
	return false

}

/**
 * Checks if a memory leak has occurred during the fix of one block if the consistency loop count exceeds 150 and stops processing.
 * @param {string} currentBlockId - The ID of the current block.
 */
export const checkIfAMemoryLeakHasOccuredAndStopProcessing = currentBlockId => {
	
	if ( global.consistencyLoop >= 100 ) {
		aMemoryLeakHasOccured( currentBlockId )
	}

}
