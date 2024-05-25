<?php
namespace Webaxones\Consistency\Config;

defined( 'ABSPATH' ) || exit;

/**
 * Localized Rules
 */
class LocalizedRules
{
	/**
	 * All the rules with the languages where they are active
	 *
	 * @var array
	 */
	public static array $list = [
		'quote'                                => [ 'fr-FR', 'fr-BE', 'en-US', 'en-AU', 'en-CA', 'en-NZ', 'en-ZA', 'en-GB' ],
		'2hyphens'                             => [ 'fr-FR', 'fr-BE', 'en-US', 'en-AU', 'en-CA', 'en-NZ', 'en-ZA', 'en-GB', 'de-DE', 'de-AT', 'de-CH', 'ro-RO' ],
		'ordinalNumberSuffix'                  => [ 'fr-FR', 'fr-BE', 'en-US', 'en-AU', 'en-CA', 'en-NZ', 'en-ZA', 'en-GB' ],
		'regularToCurlyQuotes'                 => [ 'en-US', 'en-AU', 'en-CA', 'en-NZ', 'en-ZA', 'en-GB' ],
		'regularToGermanQuotes'                => [ 'de-DE', 'de-AT', 'ro-RO' ],
		'regularToGermanBookStyleQuotes'       => [ 'de-DE', 'de-AT' ],
		'regularToFrenchQuotes'                => [ 'fr-FR', 'fr-BE' ],
		'regularToFrenchQuotesWithoutSpaces'   => [ 'de-CH' ],
		'curlyToFrenchQuotes'                  => [ 'fr-FR', 'fr-BE' ],
		'breakingSpace'                        => [ 'fr-FR', 'fr-BE' ],
		'noSpaceBefore'                        => [ 'fr-FR', 'fr-BE' ],
		'spaceBefore'                          => [ 'en-US', 'en-AU', 'en-CA', 'en-NZ', 'en-ZA', 'en-GB', 'de-DE', 'de-AT', 'de-CH', 'ro-RO' ],
		'noBreakingSpaceAfter'                 => [ 'fr-FR', 'fr-BE', 'en-US', 'en-AU', 'en-CA', 'en-NZ', 'en-ZA', 'en-GB' ],
		'noNonBreakingSpaceAfter'              => [ 'fr-FR', 'fr-BE' ],
		'capitalizeFirstSentenceLetter'        => [ 'fr-FR', 'fr-BE', 'en-US', 'en-AU', 'en-CA', 'en-NZ', 'en-ZA', 'en-GB', 'de-DE', 'de-AT', 'de-CH', 'ro-RO' ],
		'etcThreeDots'                         => [ 'fr-FR', 'fr-BE' ],
		'etcTwoDots'                           => [ 'en-US', 'en-AU', 'en-CA', 'en-NZ', 'en-ZA', 'en-GB' ],
		'etcEllipsis'                          => [ 'fr-FR', 'fr-BE' ],
		'ellipsis'                             => [ 'fr-FR', 'fr-BE', 'en-US', 'en-AU', 'en-CA', 'en-NZ', 'en-ZA', 'en-GB', 'de-DE', 'de-AT', 'de-CH', 'ro-RO' ],
		'symbolInACircle'                      => [ 'fr-FR', 'fr-BE', 'en-US', 'en-AU', 'en-CA', 'en-NZ', 'en-ZA', 'en-GB', 'de-DE', 'de-AT', 'de-CH', 'ro-RO' ],
		'symbolInSmallCapsAndSuperscriptStyle' => [ 'fr-FR', 'fr-BE', 'en-US', 'en-AU', 'en-CA', 'en-NZ', 'en-ZA', 'en-GB', 'de-DE', 'de-AT', 'de-CH', 'ro-RO' ],
		'fractions'                            => [ 'fr-FR', 'fr-BE', 'en-US', 'en-AU', 'en-CA', 'en-NZ', 'en-ZA', 'en-GB', 'de-DE', 'de-AT', 'de-CH', 'ro-RO' ],
		'percentages'                          => [ 'fr-FR', 'fr-BE', 'en-US', 'en-AU', 'en-CA', 'en-NZ', 'en-ZA', 'en-GB', 'de-DE', 'de-AT', 'de-CH', 'ro-RO' ],
	];
}