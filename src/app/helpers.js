/**
 * Summary: Specific functions varied and correlated to the application.
 * 
 * @description This file contains specific functions that depends on other parts of the application.
 * @author Loïc Antignac.
 */

/**
 * WordPress dependencies
 */
import { select, dispatch } from '@wordpress/data'

const { getBlock } = select( 'core/block-editor' )
const { updateBlock } = dispatch( 'core/block-editor' )

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
 * Stop the process in the regex loop if a code error generates an infinite loop
 * by removing last 2 characters and adding a message in the console
 *
 * @param {string} currentBlockId currentBlockId current active block ID
 */
export const aMemoryLeakHasOccured = currentBlockId => {

	const block = getBlock( currentBlockId )

	updateBlock( currentBlockId, {
		...block,
		attributes: { ...block.attributes, content: block.attributes.content.slice( -2 ) }
	} )

	global.consistency_loop = 0
	console.log( 'Consistency - a memory leak has occured during the fix of the following block:', block )

}
