import { select } from '@wordpress/data'
import { regs } from './rules'

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
 * Get current active site locale
 *
 * @return {string} currentLocale Current active site locale
 */
const getCurrentLocale = () => {
	const { getEntityRecord } = select( 'core' )
	const siteEntity = getEntityRecord( 'root', 'site' )
	const currentLocale = siteEntity?.language || 'en_US'
	return currentLocale
}


export const getAllInnersFromParents = arr => arr.flatMap( ( { innerBlocks, ...rest } ) => 
innerBlocks.map( b => ( {
	...rest,
	...b
} ) )
).concat( arr )