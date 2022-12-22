export const processedBlocks = [
	'core/paragraph',
	'core/heading',
	'core/quote',
	'core/list-item',
	'core/freeform',
	'core/read-more',
]

export const regs = [
	{
		// Replaces straight quote with curly quote
		name: 'quote', // slug of the setting and the related regex
		mask: /\'/g, // mask
		replace: '’', // replacement string
		nbMoved: 0, // number of characters less or more during replacement
		locales: [ 'fr_FR', 'fr_BE', 'en_US', 'en_AU', 'en_CA', 'en_NZ', 'en_ZA', 'en_GB' ] // concerned locales
	},
	{
		// Replaces three dots with ellipsis
		name: 'ellipsis',
		mask: /\.{3}/g,
		replace: '…',
		nbMoved: -2,
		locales: [ 'fr_FR', 'fr_BE', 'en_US', 'en_AU', 'en_CA', 'en_NZ', 'en_ZA', 'en_GB' ]
	},
	{
		// Replaces two hyphens with em dash
		name: '2hyphens',
		mask: /\-{2}/g,
		replace: '—',
		nbMoved: -1,
		locales: [ 'fr_FR', 'fr_BE', 'en_US', 'en_AU', 'en_CA', 'en_NZ', 'en_ZA', 'en_GB' ]
	},
	{
		// Adds HTML tag sup to ordinal number suffix
		name: 'ordinalNumberSuffix',
		mask: /([10-9]{1,20})(th|nd|rd|e|er|res|d|ds|de|des)(?= | )/g,
		replace: '$1<sup>$2<\/sup>',
		nbMoved: 0,
		locales: [ 'fr_FR', 'fr_BE', 'en_US', 'en_AU', 'en_CA', 'en_NZ', 'en_ZA', 'en_GB' ]
	},
	{
		// Replaces regular quotes with curly quotes
		name: 'regularToCurlyQuotes',
		mask: /"([^"]*)"/g,
		replace: '“$1”',
		nbMoved: 0,
		locales: [ 'en_US', 'en_AU', 'en_CA', 'en_NZ', 'en_ZA', 'en_GB' ]
	},
	{
		// Replaces regular quotes with french quotes
		name: 'regularToFrenchQuotes',
		mask: /"([^"]*)"/g,
		replace: '« $1 »',
		nbMoved: 2,
		locales: [ 'fr_FR', 'fr_BE' ]
	},
	{
		// Replaces a breaking space followed by a character from this list [? ! : ; » € $ £ ¥ ₽ 元 %] with a non-breaking space
		name: 'breakingSpace',
		mask: / (?=[\?|\!|\:|\;|\»|\€|\$|\£|\¥|\₽|\元|\%])/g,
		replace: ' ',
		nbMoved: 0,
		locales: [ 'fr_FR', 'fr_BE' ]
	},
	{
		// Adds a non-breaking space before a character from this list [? ! : ; » € $ £ ¥ ₽ 元 %] having no space before
		name: 'noSpaceBefore',
		mask: /(?<! | |&nbsp;)([\?|\!|\:|\»|\€|\$|\£|\¥|\₽|\元|\%])/g,
		replace: ' $1',
		nbMoved: 1,
		locales: [ 'fr_FR', 'fr_BE' ]
	},
	{
		// Adds a non-breaking space after [«] having no space after
		name: 'noNonBreakingSpaceAfter',
		mask: /(«)(?! | |&nbsp;)/g,
		replace: '$1 ',
		nbMoved: 0,
		locales: [ 'fr_FR', 'fr_BE' ]
	},
	{
		// Adds a breaking space after a character from this list [, … ) ]] if this character is followed with another character except [, .] and a number
		name: 'noBreakingSpaceAfter',
		mask: /([\,|\…|\)|\]])(?! | |\.|\,|\d)/g,
		replace: '$1 ',
		nbMoved: 1,
		locales: [ 'fr_FR', 'fr_BE', 'en_US', 'en_AU', 'en_CA', 'en_NZ', 'en_ZA', 'en_GB' ]
	},
	{
		// Removes any space preceding a character from this list [? ! : ; %]
		name: 'spaceBefore',
		mask: /([ | ])(?=[\?|\!|\:|\;|\%])/g,
		replace: '',
		nbMoved: -1,
		locales: [ 'en_US', 'en_AU', 'en_CA', 'en_NZ', 'en_ZA', 'en_GB' ]
	}
]
