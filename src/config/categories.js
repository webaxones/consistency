/**
 * Summary: Rules categories.
 *
 * @description This file contains an array of all correction rules categories.
 * @author Loïc Antignac.
 */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'

export const categories = [
	{
		slug: 'apostrophe',
		label: __( 'Apostrophes', 'consistency' ),
		description: __( 'Fixes related to apostrophes.', 'consistency' ),
	},
	{
		slug: 'quotation',
		label: __( 'Quotation marks', 'consistency' ),
		description: __( 'Fixes related to quotation marks.', 'consistency' ),
	},
	{
		slug: 'dash',
		label: __( 'Dashes', 'consistency' ),
		description: __( 'Fixes related to dashes.', 'consistency' ),
	},
	{
		slug: 'suffixe',
		label: __( 'Suffixes', 'consistency' ),
		description: __( 'Fixes related to suffixes.', 'consistency' ),
	},
	{
		slug: 'space',
		label: __( 'Spaces', 'consistency' ),
		description: __( 'Fixes related to spaces.', 'consistency' ),
	},
	{
		slug: 'case',
		label: __( 'Case', 'consistency' ),
		description: __( 'Fixes related to case.', 'consistency' ),
	},
	{
		slug: 'ellipsis',
		label: __( 'Ellipsis', 'consistency' ),
		description: __( 'Fixes related to ellipsis.', 'consistency' ),
	},
	{
		slug: 'symbol',
		label: __( 'Symbols', 'consistency' ),
		description: __( 'Fixes related to symbols.', 'consistency' ),
	},
]
