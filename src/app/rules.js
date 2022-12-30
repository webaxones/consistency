// List of all processed blocks (obligation to filter them because not all of them have textual content)
export const processedBlocks = [
	'core/paragraph',
	'core/heading',
	'core/quote',
	'core/list-item',
	'core/read-more',
]

// List of all correction rules with each regular expression used
export const regs = [
	{
		// Replaces straight quote with curly quote
		name: 'quote', // slug of the setting and the related regex
		mask: /\'/, // mask
		replace: '’', // replacement string
		nbMoved: 0, // number of characters less or more during replacement
		locales: [ 'fr_FR', 'fr_BE', 'en_US', 'en_AU', 'en_CA', 'en_NZ', 'en_ZA', 'en_GB' ] // concerned locales
	},
	{
		// Replaces three dots with ellipsis
		name: 'ellipsis',
		mask: /\.{3}/,
		replace: '…',
		nbMoved: -2,
		locales: [ 'fr_FR', 'fr_BE', 'en_US', 'en_AU', 'en_CA', 'en_NZ', 'en_ZA', 'en_GB' ]
	},
	{
		// Replaces two hyphens with em dash
		name: '2hyphens',
		mask: /\-{2}/,
		replace: '—',
		nbMoved: -1,
		locales: [ 'fr_FR', 'fr_BE', 'en_US', 'en_AU', 'en_CA', 'en_NZ', 'en_ZA', 'en_GB' ]
	},
	{
		// Adds HTML tag sup to ordinal number suffix
		name: 'ordinalNumberSuffix',
		mask: /([10-9]{1,20})(th|nd|rd|e|er|res|d|ds|de|des)(?= | )/,
		replace: '$1<sup>$2<\/sup>',
		nbMoved: 0,
		locales: [ 'fr_FR', 'fr_BE', 'en_US', 'en_AU', 'en_CA', 'en_NZ', 'en_ZA', 'en_GB' ]
	},
	{
		// Replaces regular quotes with curly quotes
		name: 'regularToCurlyQuotes',
		mask: /"/, // specific mask with specific process
		replace: '“$1”',
		nbMoved: 0,
		locales: [ 'en_US', 'en_AU', 'en_CA', 'en_NZ', 'en_ZA', 'en_GB' ]
	},
	{
		// Replaces regular quotes with french quotes
		name: 'regularToFrenchQuotes',
		mask: /"/, // specific mask with specific process
		replace: '« $1 »',
		nbMoved: 1,
		locales: [ 'fr_FR', 'fr_BE' ]
	},
	{
		// Replaces a breaking space followed by a character from this list [? ! : ; » € $ £ ¥ ₽ 元 %] with a non-breaking space
		name: 'breakingSpace',
		mask: / ([\?|\!|\:|\;|\»|\€|\$|\£|\¥|\₽|\元|\%])/,
		replace: ' $1',
		nbMoved: 0,
		locales: [ 'fr_FR', 'fr_BE' ]
	},
	{
		// Adds a non-breaking space before a character from this list [? ! : ; » € $ £ ¥ ₽ 元 %] having no space before
		name: 'noSpaceBefore',
		mask: /(?<! | |&nbsp;)([\?|\!|\:|\»|\€|\$|\£|\¥|\₽|\元|\%])/,
		replace: ' $1',
		nbMoved: 1,
		locales: [ 'fr_FR', 'fr_BE' ]
	},
	{
		// Adds a non-breaking space after [«] having no space after
		name: 'noNonBreakingSpaceAfter',
		mask: /(«)(?! | |&nbsp;)/,
		replace: '$1 ',
		nbMoved: 0,
		locales: [ 'fr_FR', 'fr_BE' ]
	},
	{
		// Adds a breaking space after a character from this list [, … ) ]] if this character is followed with another character except [, .] and a number
		name: 'noBreakingSpaceAfter',
		mask: /([\,|\…|\)|\]])(?! | |\.|\,|\d)/,
		replace: '$1 ',
		nbMoved: 1,
		locales: [ 'fr_FR', 'fr_BE', 'en_US', 'en_AU', 'en_CA', 'en_NZ', 'en_ZA', 'en_GB' ]
	},
	{
		// Capitalize the first letter of a sentence
		name: 'capitalizeFirstSentenceLetter',
		mask: /(^[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ]$)|(\. [a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ])/,
		replace: matched => matched.toUpperCase(),
		nbMoved: 0,
		locales: [ 'fr_FR', 'fr_BE', 'en_US', 'en_AU', 'en_CA', 'en_NZ', 'en_ZA', 'en_GB' ]
	},
	{
		// Removes any space preceding a character from this list [? ! : ; %]
		name: 'spaceBefore',
		mask: /([ | ])(?=[\?|\!|\:|\;|\%])/,
		replace: '',
		nbMoved: -1,
		locales: [ 'en_US', 'en_AU', 'en_CA', 'en_NZ', 'en_ZA', 'en_GB' ]
	}
]

// Regular expressions with pairs
export const regsWithPair = [
	'regularToCurlyQuotes',
	'regularToFrenchQuotes',
]

