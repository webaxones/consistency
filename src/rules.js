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
		// Replace straight quote with curly quote
		name: 'quote', // slug of the setting and the related regex
		mask: /\'/g, // mask
		replace: '’', // replacement string
		nbMoved: 0, // number of characters less or more during replacement
		locales: [ 'fr_FR', 'fr_BE', 'en_US', 'en_AU', 'en_CA', 'en_NZ', 'en_ZA', 'en_GB' ] // concerned locales
	},
	{
		// Replace three dots with ellipsis
		name: 'ellipsis',
		mask: /\.{3}/g,
		replace: '…',
		nbMoved: -2,
		locales: [ 'fr_FR', 'fr_BE', 'en_US', 'en_AU', 'en_CA', 'en_NZ', 'en_ZA', 'en_GB' ]
	},
	{
		// Replace regular quotes with curly quotes
		name: 'regularToCurlyQuotes',
		mask: /"([^"]*)"/g,
		replace: '“$1”',
		nbMoved: 0,
		locales: [ 'en_US', 'en_AU', 'en_CA', 'en_NZ', 'en_ZA', 'en_GB' ]
	},
	{
		// Replace regular quotes with french quotes
		name: 'regularToFrenchQuotes',
		mask: /"([^"]*)"/g,
		replace: '« $1 »',
		nbMoved: 2,
		locales: [ 'fr_FR', 'fr_BE' ]
	},
	{
		// Replace a breaking space followed by a character from this list [? ! : ; » € $ £ ¥ ₽ 元 %] with a non-breaking space
		name: 'breakingSpace',
		mask: / (?=[\?|\!|\:|\;|\»|\€|\$|\£|\¥|\₽|\元|\%])/g,
		replace: ' ',
		nbMoved: 0,
		locales: [ 'fr_FR', 'fr_BE' ]
	},
	{
		// Add a non-breaking space before a character from this list [? ! : ; » € $ £ ¥ ₽ 元 %] having no space before
		name: 'noSpaceBefore',
		mask: /(?<! | )([\?|\!|\:|\;|\»|\€|\$|\£|\¥|\₽|\元|\%])/g,
		replace: ' $1',
		nbMoved: 1,
		locales: [ 'fr_FR', 'fr_BE' ]
	},
	{
		// Remove any space preceding a character from this list [? ! : ; %]
		name: 'spaceBefore',
		mask: /([ | ])(?=[\?|\!|\:|\;|\%])/g,
		replace: '',
		nbMoved: -1,
		locales: [ 'en_US', 'en_AU', 'en_CA', 'en_NZ', 'en_ZA', 'en_GB' ]
	}
]
