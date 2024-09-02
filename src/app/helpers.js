/**
 * @summary: Specific functions varied and correlated to the application.
 * 
 * This file contains specific functions that depends on other parts of the application.
 * @author Loïc Antignac.
 */

import { select, dispatch } from '@wordpress/data'
const { getBlock, getBlocks, getBlockAttributes, getSelectionStart, isTyping } = select( 'core/block-editor' )
const { selectionChange, updateBlockAttributes } = dispatch( 'core/block-editor' )

/**
 * External dependencies
 */
import { isUsedByLocale } from './checks'
import { fetchRuleSettings, isLocalizationEnabled } from './data'
import { rules } from '../config/rules'

/**
 * Get specific replacement string for pairing characters by checking if we are on opening one or closing one
 *
 * Character pairs have between 3 and 5 parts to be cut in the "replace" part:
 * opening character pair + left separator + string between the pair + right separator + closing character pair
 * french quotes eg: « +   + $1 +   + »
 * left and right separators are optionals
 * 
 * @param {object} reg Replacement parameters
 * @param {string} fullBlockContent Full block string
 * @param {string} replaceWithThis Replacement string
 * @return {string} replaceWithThis Replacement string
 */
export const getReplacementStringForPairs = ( reg, fullBlockContent, replaceWithThis ) => {

	// Get the opening and closing characters of the pair
	const openPairChar = reg.replace.charAt( 0 )
	const closPairChar = reg.replace.charAt( reg.replace.length - 1 )

	// Get left separator and right separators
	const leftSep = reg.replace.substring( 1, reg.replace.indexOf( '$' ) ) || ''

	let rightSep = ''
	if ( 0 !== [ ...reg.replace.matchAll( /[0-9]/g ) ].length ) {
		// Right separator begins after last number from last capturing group
		rightSep = reg.replace.substring( [ ...reg.replace.matchAll( /[0-9]/g ) ].pop()['index'] + 1, reg.replace.length -1 )
	}

	// Check if the character should be opening or closing by testing the odd or even number
	const getOpenPairRegex = new RegExp( `${ openPairChar }`, 'g' )
	const getClosPairRegex = new RegExp( `${ closPairChar }`, 'g' )
	const nbOpenPair = ( fullBlockContent.match( getOpenPairRegex ) || [] ).length
	const nbClosPair = ( fullBlockContent.match( getClosPairRegex ) || [] ).length
		
	replaceWithThis = nbOpenPair === nbClosPair ? openPairChar + leftSep : rightSep + closPairChar
	return replaceWithThis

}

/**
 * Retrieves the localized rules settings.
 * 
 * @returns {Array} The localized rules settings.
 */
export const getLocalizedRuleSettings = () => {
	
	const ruleSettings = fetchRuleSettings()

	const localizedRuleSettings = isLocalizationEnabled() 
		? ruleSettings.filter( setting => isUsedByLocale( setting.slug ) ) 
		: ruleSettings

	return localizedRuleSettings

}


/**
 * Retrieves localized rules based on the current rule settings.
 * @returns {Array} An array of localized rules.
 */
export const getLocalizedRules = () => {

	const localizedRules = rules.filter( reg => true === getLocalizedRuleSettings()?.find( s => s.slug === reg.slug )?.value )

	return localizedRules

}

/**
 * Moves the cursor to right position after fixing the content.
 * We use window.getSelection() and not the editor's selectionChange() to avoid to trigger a new state change.
 * 
 * @returns {void}
 */
export const moveCursorToNewPosition = cursorOffset => {

	const selection = window.getSelection()
	
	// Stop here if no selection or if the selection anchor node is null
	if ( ! selection ) return

	// Get current cursor position
	let cursorPosition

	// Element node case: we need to get the first text node from the element node
	if ( selection?.anchorNode?.nodeType === 1 ) {
		cursorPosition = selection.anchorNode?.firstChild?.length || 0
	}

	// Text node case
	if ( selection?.anchorNode?.nodeType === 3 ) {
		cursorPosition = selection.anchorOffset || 0
	}

	// If the cursorOffset is positive, newPosition equals cursorPosition + cursorOffset, else newPosition equals cursorPosition
	const newPosition = cursorOffset >= 0 ? cursorPosition + cursorOffset : cursorPosition

	// Element node
	if ( selection?.anchorNode?.nodeType === 1 ) {
	
		// If the anchor node is an element node, we have to get the first text node from it
		const textNode = selection.anchorNode?.firstChild || selection.anchorNode?.childNodes[ 0 ]
		selection.collapse( textNode, newPosition )
		return
		
	}

	// Text node
	if ( selection?.anchorNode?.nodeType === 3 ) {
	
		// If the anchor node is a text node, we have to get the parent element node
		const textNode = selection.anchorNode
		selection.collapse( textNode, newPosition )
		return
		
	}

}