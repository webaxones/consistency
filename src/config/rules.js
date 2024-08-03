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
		// Replaces straight apostrophes with curly apostrophes
		slug: 'quote', // slug of the setting and the related regex
		name: __( 'Straight Apostrophe', 'consistency' ), // name of the setting
		description: __( 'Replace straight apostrophes with curly apostrophes:', 'consistency' )
			+ `<span aria-hidden='true' style='display:block;'><code>'</code> <span style='font-size:20px'>→</span> <code>’</code></span>`, // description of the setting
		mask: /\'/, // mask
		replace: '’', // replacement string
		nbMoved: 0, // number of characters less or more during replacement
		category: 'apostrophe' // category of the setting
	},
	{
		// Replaces two hyphens with an En dash
		slug: '2hyphens',
		name: __( 'En Dash', 'consistency' ),
		description: __( 'Replace two hyphens with an en dash:', 'consistency' )
			+ `<span aria-hidden='true' style='display:block;'><code>--</code> <span style='font-size:20px'>→</span> <code style="font-family:sans-serif;">–</code></span>`,
		mask: /(?:\-)\-/,
		replace: '–',
		nbMoved: -1,
		category: 'dash'
	},
	{
		// Replaces three hyphens with Em dash
		slug: '3hyphens',
		name: __( 'Em Dash', 'consistency' ),
		description: __( 'Replace three hyphens with an em dash:', 'consistency' )
			+ `<span aria-hidden='true' style='display:block;'><code>---</code> <span style='font-size:20px'>→</span> <code style="font-family:sans-serif;">—</code></span>`,
		mask: /(?:\–|\-\-)\-/,
		replace: '—',
		nbMoved: lastPart => {
			// Since we replace the string with a symbol, we must move the cursor to the left by the length of the replaced string minus 1 (1 for the symbol itself)
			return -( lastPart.length - 1 )
		},
		category: 'dash'
	},
	{
		// Replaces four hyphens with two-em dash
		slug: '4hyphens',
		name: __( 'Two-Em Dash', 'consistency' ),
		description: __( 'Replace four hyphens with two-em dash:', 'consistency' )
			+ `<span aria-hidden='true' style='display:block;'><code>----</code> <span style='font-size:20px'>→</span> <code style="font-family:sans-serif;">⸺</code></span>`,
		mask: /(?:\—|\–\-|\-\-\-)\-/,
		replace: '⸺',
		nbMoved: lastPart => {
			// Since we replace the string with a symbol, we must move the cursor to the left by the length of the replaced string minus 1 (1 for the symbol itself)
			return -( lastPart.length - 1 )
		},
		category: 'dash'
	},
	{
		// Add the sup HTML tag to ordinal number suffixes
		slug: 'ordinalNumberSuffix',
		name: __( 'Ordinal Number Suffix', 'consistency' ),
		description: __( 'Add the sup HTML tag to ordinal number suffixes', 'consistency' )
		+ `<span aria-hidden='true' style='display:block;'><code>1st</code> <span style='font-size:20px'>→</span> <code>1<sup>st</sup></code></span>`,
		mask: /([10-9]{1,20})(th|nd|rd|e|er|res|d|ds|de|des)( | |\.|\,|\;)/,
		replace: '$1<sup>$2<\/sup>$3',
		nbMoved: 0,
		category: 'suffixe'
	},
	{
		// Replaces straight quotes with curly quotes
		slug: 'regularToCurlyQuotes',
		name: __( 'Curly Quotes', 'consistency' ),
		description: __( 'Replace straight quotes with curly quotes:', 'consistency' )
			+ `<span aria-hidden='true' style='display:block;'><code>" "</code> <span style='font-size:20px'>→</span> <code>“ ”</code></span>`,
		mask: /"/, // specific mask with specific process
		replace: '“$1”',
		nbMoved: 0,
		category: 'quotation'
	},
	{
		// Replaces straight quotes with german quotes
		slug: 'regularToGermanQuotes',
		name: __( 'German Quotes', 'consistency' ),
		description: __( 'Replace straight quotes with german quotes:', 'consistency' )
		+ `<span aria-hidden='true' style='display:block;'><code>" "</code> <span style='font-size:20px'>→</span> <code>„ “</code></span>`,
		mask: /"/, // specific mask with specific process
		replace: '„$1“',
		nbMoved: 0,
		category: 'quotation'
	},
	{
		// Replaces straight quotes with german book-style quotes
		slug: 'regularToGermanBookStyleQuotes',
		name: __( 'German Book-Style Quotes', 'consistency' ),
		description: __( 'Replace straight quotes with german book-style quotes:', 'consistency' )
			+ `<span aria-hidden='true' style='display:block;'><code>" "</code> <span style='font-size:20px'>→</span> <code>» «</code></span>`,
		mask: /"/, // specific mask with specific process
		replace: '»$1«',
		nbMoved: 0,
		category: 'quotation'
	},
	{
		// Replaces straight quotes with french quotes
		slug: 'regularToFrenchQuotes',
		name: __( 'French Quotes with Spaces', 'consistency' ),
		description: __( 'Replace straight quotes with french quotes with non-breaking spaces:', 'consistency' )
			+ `<span aria-hidden='true' style='display:block;'><code>" "</code> <span style='font-size:20px'>→</span> <code>«   »</code></span>`,
		mask: /"/, // specific mask with specific process
		replace: '« $1 »',
		nbMoved: 1,
		category: 'quotation'
	},
	{
		// Replaces regular quotes with french quotes without spaces
		slug: 'regularToFrenchQuotesWithoutSpaces',
		name: __( 'French Quotes', 'consistency' ),
		description: __( 'Replace straight quotes with french quotes without spaces:', 'consistency' )
			+ `<span aria-hidden='true' style='display:block;'><code>" "</code> <span style='font-size:20px'>→</span> <code>« »</code></span>`,
		mask: /"/, // specific mask with specific process
		replace: '«$1»',
		nbMoved: 0,
		category: 'quotation'
	},
	{
		// Replaces curly quotes with french quotes
		slug: 'curlyToFrenchQuotes',
		name: __( 'Curly Quotes to French Quotes', 'consistency' ),
		description: __( 'Replace curly quotes with french quotes with non-breaking spaces:', 'consistency' )
			+ `<span aria-hidden='true' style='display:block;'><code>“ ”</code> <span style='font-size:20px'>→</span> <code>«   »</code></span>`,
		mask: /“.*?”/, // specific mask with specific process
		replace: matched => { return `« ${matched.substring( 1, matched.length - 1 )} »` },
		nbMoved: 0,
		category: 'quotation'
	},
	{
		// Replaces a breaking space followed by a character from this list [? ! : ; » € $ £ ¥ ₽ 元 %] with a non-breaking space
		slug: 'breakingSpace',
		name: __( 'Breaking Spaces', 'consistency' ),
		description: sprintf( __( 'Replace a breaking space followed by a character from this list:%1$s with a non-breaking space', 'consistency' )
			, `<br /><code>? ! : ; » € $ £ ¥ ₽ 元 %</code><br />` ),
		mask: / ([\?|\!|\:|\;|\»|\€|\$|\£|\¥|\₽|\元|\%])/,
		replace: ' $1',
		nbMoved: 0,
		category: 'space'
	},
	{
		// Adds a non-breaking space before a character from this list [? ! : ; » € $ £ ¥ ₽ 元 %] having no space before
		slug: 'noSpaceBefore',
		name: __( 'No Space Before', 'consistency' ),
		description: sprintf( __( 'Add a non-breaking space before a character from this list:%1$s having no space before', 'consistency' )
			, `<br /><code>? ! : ; » € $ £ ¥ ₽ 元 %</code><br />` ),
		mask: /(?<! | |&nbsp;)([\?|\!|\:|\»|\€|\$|\£|\¥|\₽|\元|\%])/,
		replace: ' $1',
		nbMoved: 1,
		category: 'space'
	},
	{
		// Removes any space preceding a character from this list [? ! : ; %]
		slug: 'spaceBefore',
		name: __( 'Space Before', 'consistency' ),
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
		name: __( 'No Breaking Space After', 'consistency' ),
		description: sprintf( __( 'Add a breaking space after a character from this list:%1$s when followed with another character', 'consistency' )
			, `<br /><code>, … ) ]</code><br />` ),
		mask: /([\,|\…|\)|\]])(?! | |\.|\,|\d|$)(.)/,
		replace: '$1 $2',
		nbMoved: 1,
		category: 'space'
	},
	{
		// Adds a non-breaking space after [«] having no space after
		slug: 'noNonBreakingSpaceAfter',
		name: __( 'No Non-Breaking Space After', 'consistency' ),
		description: __( 'Add a non-breaking space after open french quote having no space after', 'consistency' ),
		mask: /(«)(?! | |&nbsp;)/,
		replace: '$1 ',
		nbMoved: 0,
		category: 'space'
	},
	{
		// Capitalize the first letter of a sentence
		slug: 'capitalizeFirstSentenceLetter',
		name: __( 'First Sentence Letter', 'consistency' ),
		description: __( 'Capitalize the first letter of a sentence', 'consistency' ),
		mask: /(^[a-záàâäãåăçéèêëíìîïñóòôöõúùûüýÿæœșț])|(?<=[\.|\?|\!|\…] )[a-záàâäãåăçéèêëíìîïñóòôöõúùûüýÿæœșț]/,
		replace: matched => matched.toUpperCase(),
		nbMoved: 0,
		category: 'case'
	},
	{
		// Replaces etc... with etc.
		slug: 'etcThreeDots',
		name: __( 'Three Dots Following "etc"', 'consistency' ),
		description: __( 'Replace 3 dots placed after the abbreviation "etc" with a period:', 'consistency' )
		+ `<span aria-hidden='true' style='display:block;'><code>etc...</code> <span style='font-size:20px'>→</span> <code>etc.</code></span>`,
		mask: /etc(\.{3})/i,
		replace: matched => { return matched.substring(0, 3) + '.' },
		nbMoved: -2,
		category: 'ellipsis'
	},
	{
		// Replaces etc.. with etc.
		slug: 'etcTwoDots',
		name: __( 'Two Dots Following "etc"', 'consistency' ),
		description: __( 'Replace 2 dots placed after the abbreviation "etc" with a period:', 'consistency' )
		+ `<span aria-hidden='true' style='display:block;'><code>etc..</code> <span style='font-size:20px'>→</span> <code>etc.</code></span>`,
		mask: /etc(\.{2})/i,
		replace: matched => { return matched.substring(0, 2) + '.' },
		nbMoved: -1,
		category: 'ellipsis'
	},
	{
		// Replaces etc… with etc.
		slug: 'etcEllipsis',
		name: __( 'Ellipsis Following "etc"', 'consistency' ),
		description: __( 'Replace the ellipsis placed after the abbreviation "etc" with a period:', 'consistency' )
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
		name: __( 'Symbol in a Circle', 'consistency' ),
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
		name: __( 'Symbol in Small Caps and Superscript Style', 'consistency' ),
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
			// We remove the last character of the string because the regex check the character after the string to replace
			const replacedString = lastPart.substring( 0, lastPart.length - 1 )
			// Since we replace the string with a symbol, we must move the cursor to the left by the length of the replaced string minus 1 (1 for the symbol itself)
			return -( replacedString.length - 1 )
		},
		category: 'symbol'
	},
]

