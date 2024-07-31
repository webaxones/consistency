export const ruleIncompatibilities = [
	{
		slug: 'quote', // slug of the setting
		incompatibleWith: [] // List of slugs of the settings that are incompatible with the current setting
	},
	{
		slug: '2hyphens',
		incompatibleWith: []
	},
	{
		slug: '3hyphens',
		incompatibleWith: []
	},
	{
		slug: '4hyphens',
		incompatibleWith: []
	},
	{
		slug: 'ordinalNumberSuffix',
		incompatibleWith: []
	},
	{
		slug: 'regularToCurlyQuotes',
		incompatibleWith: [
			'regularToGermanQuotes',
			'regularToGermanBookStyleQuotes',
			'regularToFrenchQuotes',
			'regularToFrenchQuotesWithoutSpaces',
		]
	},
	{
		slug: 'regularToGermanQuotes',
		incompatibleWith: [
			'regularToCurlyQuotes',
			'regularToGermanBookStyleQuotes',
			'regularToFrenchQuotes',
			'regularToFrenchQuotesWithoutSpaces',
		]
	},
	{
		slug: 'regularToGermanBookStyleQuotes',
		incompatibleWith: [
			'regularToCurlyQuotes',
			'regularToGermanQuotes',
			'regularToFrenchQuotes',
			'regularToFrenchQuotesWithoutSpaces',
		]
	},
	{
		slug: 'regularToFrenchQuotes',
		incompatibleWith: [
			'regularToCurlyQuotes',
			'regularToGermanQuotes',
			'regularToGermanBookStyleQuotes',
			'regularToFrenchQuotesWithoutSpaces',
		]
	},
	{
		slug: 'regularToFrenchQuotesWithoutSpaces',
		incompatibleWith: [
			'regularToCurlyQuotes',
			'regularToGermanQuotes',
			'regularToGermanBookStyleQuotes',
			'regularToFrenchQuotes',
		]
	},
	{
		slug: 'curlyToFrenchQuotes',
		incompatibleWith: []
	},
	{
		slug: 'breakingSpace',
		incompatibleWith: [
			'spaceBefore',
		]
	},
	{
		slug: 'noSpaceBefore',
		incompatibleWith: [
			'spaceBefore',
		]
	},
	{
		slug: 'spaceBefore',
		incompatibleWith: [
			'breakingSpace',
			'noSpaceBefore',
		]
	},
	{
		slug: 'noBreakingSpaceAfter',
		incompatibleWith: []
	},
	{
		slug: 'noNonBreakingSpaceAfter',
		incompatibleWith: []
	},
	{
		slug: 'capitalizeFirstSentenceLetter',
		incompatibleWith: []
	},
	{
		slug: 'etcThreeDots',
		incompatibleWith: []
	},
	{
		slug: 'etcTwoDots',
		incompatibleWith: []
	},
	{
		slug: 'etcEllipsis',
		incompatibleWith: []
	},
	{
		slug: 'ellipsis',
		incompatibleWith: []
	},
	{
		slug: 'symbolInACircle',
		incompatibleWith: []
	},
	{
		slug: 'symbolInSmallCapsAndSuperscriptStyle',
		incompatibleWith: []
	},
	{
		slug: 'fractions',
		incompatibleWith: []
	},
	{
		slug: 'percentages',
		incompatibleWith: []
	},
]

