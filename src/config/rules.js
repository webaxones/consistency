/**
 * Summary: Correction rules.
 *
 * @description This file contains an array of all correction rules with each regular expression used.
 * @author Loïc Antignac.
 */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'

export const rules = [
	{
		// Replaces straight quote with curly quote
		slug: 'quote', // slug of the setting and the related regex
		name: __( 'Straight quote', 'consistency' ), // name of the setting
		description: __( 'Replaces straight quotes with curved quotes:', 'consistency' )
			+ `<span aria-hidden='true' style='display:block;'><code>'</code> <span style='font-size:20px'>→</span> <code>’</code></span>`, // description of the setting
		mask: /\'/, // mask
		replace: '’', // replacement string
		nbMoved: 0, // number of characters less or more during replacement
		category: 'punctuation' // category of the setting
	},
	{
		// Replaces two hyphens with em dash
		slug: '2hyphens',
		name: __( 'Two hyphens', 'consistency' ),
		description: __( 'Replaces 2 hyphens with em dash:', 'consistency' )
			+ `<span aria-hidden='true' style='display:block;'><code>--</code> <span style='font-size:20px'>→</span> <code>—</code></span>`,
		mask: /(?:\-)\-/,
		replace: '—',
		nbMoved: -1,
		category: 'punctuation'
	},
	{
		// Adds HTML tag sup to ordinal number suffix
		slug: 'ordinalNumberSuffix',
		name: __( 'Ordinal number suffix', 'consistency' ),
		description: __( 'Add HTML tag sup to ordinal number suffix', 'consistency' )
		+ `<span aria-hidden='true' style='display:block;'><code>1st</code> <span style='font-size:20px'>→</span> <code>1<sup>st</sup></code></span>`,
		mask: /([10-9]{1,20})(th|nd|rd|e|er|res|d|ds|de|des)( | |\.|\,|\;)/,
		replace: '$1<sup>$2<\/sup>$3',
		nbMoved: 0,
		category: 'punctuation'
	},
	{
		// Replaces regular quotes with curly quotes
		slug: 'regularToCurlyQuotes',
		name: __( 'Curly quotes', 'consistency' ),
		description: __( 'Replaces regular quotes with curly quotes:', 'consistency' )
			+ `<span aria-hidden='true' style='display:block;'><code>" "</code> <span style='font-size:20px'>→</span> <code>“ ”</code></span>`,
		mask: /"/, // specific mask with specific process
		replace: '“$1”',
		nbMoved: 0,
		category: 'punctuation'
	},
	{
		// Replaces regular quotes with german quotes
		slug: 'regularToGermanQuotes',
		name: __( 'Regular quotes to german', 'consistency' ),
		description: __( 'Replaces regular quotes with german quotes:', 'consistency' )
		+ `<span aria-hidden='true' style='display:block;'><code>" "</code> <span style='font-size:20px'>→</span> <code>„ “</code></span>`,
		mask: /"/, // specific mask with specific process
		replace: '„$1“',
		nbMoved: 0,
		category: 'punctuation'
	},
	{
		// Replaces regular quotes with german book-style quotes
		slug: 'regularToGermanBookStyleQuotes',
		name: __( 'Regular quotes to german book-style quotes', 'consistency' ),
		description: __( 'Replaces regular quotes with german book-style quotes:', 'consistency' )
			+ `<span aria-hidden='true' style='display:block;'><code>" "</code> <span style='font-size:20px'>→</span> <code>» «</code></span>`,
		mask: /"/, // specific mask with specific process
		replace: '»$1«',
		nbMoved: 0,
		category: 'punctuation'
	},
	{
		// Replaces regular quotes with french quotes
		slug: 'regularToFrenchQuotes',
		name: __( 'Regular quotes to french', 'consistency' ),
		description: __( 'Replaces regular quotes with french quotes:', 'consistency' )
			+ `<span aria-hidden='true' style='display:block;'><code>" "</code> <span style='font-size:20px'>→</span> <code>«   »</code></span>`,
		mask: /"/, // specific mask with specific process
		replace: '« $1 »',
		nbMoved: 1,
		category: 'punctuation'
	},
	{
		// Replaces regular quotes with french quotes
		slug: 'regularToFrenchQuotesWithoutSpaces',
		name: __( 'Regular quotes to french quotes without spaces', 'consistency' ),
		description: __( 'Replaces regular quotes with french quotes without spaces:', 'consistency' )
			+ `<span aria-hidden='true' style='display:block;'><code>" "</code> <span style='font-size:20px'>→</span> <code>« »</code></span>`,
		mask: /"/, // specific mask with specific process
		replace: '«$1»',
		nbMoved: 0,
		category: 'punctuation'
	},
	{
		// Replaces curly quotes with french quotes
		slug: 'curlyToFrenchQuotes',
		name: __( 'Curly quotes to french quotes', 'consistency' ),
		description: __( 'Replaces curly quotes with french quotes:', 'consistency' )
			+ `<span aria-hidden='true' style='display:block;'><code>“ ”</code> <span style='font-size:20px'>→</span> <code>«   »</code></span>`,
		mask: /“.*?”/, // specific mask with specific process
		replace: matched => { return `« ${matched.substring( 1, matched.length - 1 )} »` },
		nbMoved: 0,
		category: 'punctuation'
	},
	{
		// Replaces a breaking space followed by a character from this list [? ! : ; » € $ £ ¥ ₽ 元 %] with a non-breaking space
		slug: 'breakingSpace',
		name: __( 'Breaking space', 'consistency' ),
		description: sprintf( __( 'Replaces a breaking space followed by a character from this list:%1$s with a non-breaking space', 'consistency' )
			, `<br /><code>? ! : ; » € $ £ ¥ ₽ 元 %</code><br />` ),
		mask: / ([\?|\!|\:|\;|\»|\€|\$|\£|\¥|\₽|\元|\%])/,
		replace: ' $1',
		nbMoved: 0,
		category: 'space'
	},
	{
		// Adds a non-breaking space before a character from this list [? ! : ; » € $ £ ¥ ₽ 元 %] having no space before
		slug: 'noSpaceBefore',
		name: __( 'No space before', 'consistency' ),
		description: sprintf( __( 'Adds a non-breaking space before a character from this list:%1$s having no space before', 'consistency' )
			, `<br /><code>? ! : ; » € $ £ ¥ ₽ 元 %</code><br />` ),
		mask: /(?<! | |&nbsp;)([\?|\!|\:|\»|\€|\$|\£|\¥|\₽|\元|\%])/,
		replace: ' $1',
		nbMoved: 1,
		category: 'space'
	},
	{
		// Removes any space preceding a character from this list [? ! : ; %]
		slug: 'spaceBefore',
		name: __( 'Space before', 'consistency' ),
		description: __( 'Remove any space preceding a character from this list:', 'consistency' )
			+ `<span style='display:block;'><code>? ! : ; %</code></span>`,
		mask: /([ | ])(?=[\?|\!|\:|\;|\%])(.)/,
		replace: '$2',
		nbMoved: -1,
		category: 'space'
	},
	{
		// Adds a breaking space after a character from this list [, … ) ]] if this character is followed with another character except [, .] and a number
		slug: 'noBreakingSpaceAfter',
		name: __( 'No breaking space after', 'consistency' ),
		description: sprintf( __( 'Adds a breaking space after a character from this list:%1$s when followed with another character', 'consistency' )
			, `<br /><code>, … ) ]</code><br />` ),
		mask: /([\,|\…|\)|\]])(?! | |\.|\,|\d|$)(.)/,
		replace: '$1 $2',
		nbMoved: 1,
		category: 'space'
	},
	{
		// Adds a non-breaking space after [«] having no space after
		slug: 'noNonBreakingSpaceAfter',
		name: __( 'No non breaking space after', 'consistency' ),
		description: __( 'Adds a non-breaking space after open french quote having no space after', 'consistency' ),
		mask: /(«)(?! | |&nbsp;)/,
		replace: '$1 ',
		nbMoved: 0,
		category: 'space'
	},
	{
		// Capitalize the first letter of a sentence
		slug: 'capitalizeFirstSentenceLetter',
		name: __( 'First sentence letter not capitalized', 'consistency' ),
		description: __( 'Capitalize the first letter of a sentence', 'consistency' ),
		mask: /(^[a-záàâäãåăçéèêëíìîïñóòôöõúùûüýÿæœșț])|(?<=[\.|\?|\!|\…] )[a-záàâäãåăçéèêëíìîïñóòôöõúùûüýÿæœșț]/,
		replace: matched => matched.toUpperCase(),
		nbMoved: 0,
		category: 'case'
	},
	{
		// Replaces etc... with etc.
		slug: 'etcThreeDots',
		name: __( '3 dots following "etc"', 'consistency' ),
		description: __( 'Replaces 3 dots placed after the abbreviation "etc" with a point:', 'consistency' )
		+ `<span aria-hidden='true' style='display:block;'><code>etc...</code> <span style='font-size:20px'>→</span> <code>etc.</code></span>`,
		mask: /etc(\.{3})/i,
		replace: matched => { return matched.substring(0, 3) + '.' },
		nbMoved: -2,
		category: 'ellipsis'
	},
	{
		// Replaces etc.. with etc.
		slug: 'etcTwoDots',
		name: __( '2 dots following "etc"', 'consistency' ),
		description: __( 'Replaces 2 dots placed after the abbreviation "etc" with a point:', 'consistency' )
		+ `<span aria-hidden='true' style='display:block;'><code>etc..</code> <span style='font-size:20px'>→</span> <code>etc.</code></span>`,
		mask: /etc(\.{2})/i,
		replace: matched => { return matched.substring(0, 2) + '.' },
		nbMoved: -1,
		category: 'ellipsis'
	},
	{
		// Replaces etc… with etc.
		slug: 'etcEllipsis',
		name: __( 'Ellipsis following "etc"', 'consistency' ),
		description: __( 'Replaces ellipsis placed after the abbreviation "etc" with a point:', 'consistency' )
		+ `<span aria-hidden='true' style='display:block;'><code>etc…</code> <span style='font-size:20px'>→</span> <code>etc.</code></span>`,
		mask: /etc(\.{3}|…)/i,
		replace: matched => { return matched.substring(0, 3) + '.' },
		nbMoved: 0,
		category: 'ellipsis'
	},
	{
		// Replaces three dots with ellipsis (we don't add a space for german because it depends on the context and the space must have been added before the three dots)
		slug: 'ellipsis',
		name: __( 'Ellipsis', 'consistency' ),
		description: __( 'Replaces 3 dots with ellipsis:', 'consistency' )
			+ `<span aria-hidden='true' style='display:block;'><code>...</code> <span style='font-size:20px'>→</span> <code>…</code></span>`,
		mask: /\.{3}/,
		replace: '…',
		nbMoved: -2,
		category: 'ellipsis'
	},
	{
		// Replaces a character from this list [c p r] when enclosed in parentheses with a symbol
		slug: 'symbolInACircle',
		name: __( 'Symbol in a circle', 'consistency' ),
		description: __( 'Replaces 1 character placed in parentheses with a symbol', 'consistency' )
			+ `<span aria-hidden='true' style='display:block;'><code>(c) (p) (r)</code> <span style='font-size:20px'>→</span> <code>© ℗ ®</code></span>`,
		mask: /(\([c|p|r])(\))/,
		replace: matched => {
			switch ( matched[1] ) {
				case 'c':
					return '©'
				case 'p':
					return '℗'
				case 'r':
					return '®'
			}
			return ' '
		},
		nbMoved: -2,
		category: 'symbol'
	},
	{
		// Replaces a character from this list [md tm mc sm] with a symbol in small caps and superscript style
		slug: 'symbolInSmallCapsAndSuperscriptStyle',
		name: __( 'Symbol in small caps and superscript style', 'consistency' ),
		description: __( 'Replaces 2-character abbreviations with a symbol in small caps and superscript style', 'consistency' )
		+ `<span aria-hidden='true' style='display:block;'><code>tm sm md mc</code> <span style='font-size:20px'>→</span> <code>™ ℠ 🅫 🅪</code></span>`,
		mask: /(?<= | |\(|\[|\{|:|^)(tm|sm|md|mc)(?= | |\.|\,|\;|\:|\)|\]|\}|$)/,
		replace: matched => {
			switch ( matched ) {
				case 'tm':
					return '™'
				case 'sm':
					return '℠'
				case 'md':
					return '🅫'
				case 'mc':
					return '🅪'
				default:
					return ' '
			}
		},
		nbMoved: -1,
		category: 'symbol'
	},
	{
		// Replaces fractions with a fraction symbol
		slug: 'fractions',
		name: __( 'Fractions', 'consistency' ),
		description: __( 'Replaces fractions with fraction symbols:', 'consistency' )
			+ `<span aria-hidden='true' style='display:block;'><code>1/2 3/5 1/9</code> <span style='font-size:20px'>→</span> <code>½ ⅗ ⅑</code></span>`,
		mask: /[1-9]\/[1-9]/,
		replace: matched => {
			switch ( matched ) {
				case '1/4':
					return '¼'
				case '1/2':
					return '½'
				case '3/4':
					return '¾'
				case '1/3':
					return '⅓'
				case '2/3':
					return '⅔'
				case '1/5':
					return '⅕'
				case '2/5':
					return '⅖'
				case '3/5':
					return '⅗'
				case '4/5':
					return '⅘'
				case '1/6':
					return '⅙'
				case '5/6':
					return '⅚'
				case '1/8':
					return '⅛'
				case '3/8':
					return '⅜'
				case '5/8':
					return '⅝'
				case '7/8':
					return '⅞'
				case '1/7':
					return '⅐'
				case '1/9':
					return '⅑'
				default:
					return ' '
			}
		},
		nbMoved: -2,
		category: 'symbol'
	},
	{
		// Replaces fractions with a fraction symbol
		slug: 'percentages',
		name: __( 'Percentages', 'consistency' ),
		description: __( 'Replaces percentages with percentages symbols:', 'consistency' )
			+ `<span aria-hidden='true' style='display:block;'><code>0/0 0/00 0/000</code> <span style='font-size:20px'>→</span> <code>% ‰ ‱</code></span>`,
		mask: /(0\/0|0\/00|0\/000)(?= | |\.|\,|\;|\:|\)|\]|\})(.)/,
		replace: matched => {
			const matchedFirstPart = matched.substring( 0, matched.length - 1 )
			const matchedLastPart = matched.substring( matched.length - 1, matched.length )
			switch ( matchedFirstPart ) {
				case '0/0':
					return '%' + matchedLastPart
				case '0/00':
					return '‰' + matchedLastPart
				case '0/000':
					return '‱' + matchedLastPart
				default:
					return ' ' + matchedLastPart
			}
		},
		nbMoved: lastPart => {
			const replacedString = lastPart.substring( 0, lastPart.length - 1 )
			switch ( replacedString ) {
				case '0/0':
					return -2
				case '0/00':
					return -3
				case '0/000':
					return -4
				default:
					return 0
			}
		 },
		category: 'symbol'
	},
]

