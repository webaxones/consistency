export const regs = [
	{
		// Replace straight quote with curly quote
		name: 'quote',
		mask: /\'/g,
		replace: '’',
		nbMoved: 0 // number of characters less or more during replacement
	},
	{
		// Replace three dots with ellipsis
		name: 'ellipsis',
		mask: /\.{3}/g,
		replace: '…',
		nbMoved: -2
	},
	{
		// Replace a breaking space followed by a character from this list [? ! : € $ %] with a non-breaking space
		name: 'breakingSpace',
		mask: / (?=[\?|\!|\:|\;|\»|\€|\$|\£|\¥|\₽|\元|\%])/g,
		replace: ' ',
		nbMoved: 0
	}
]