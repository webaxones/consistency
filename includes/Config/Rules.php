<?php

namespace Webaxones\Consistency\Config;

defined( 'ABSPATH' ) || exit;

use Webaxones\Consistency\Utils\Contracts\ValueInterface;

/**
 * Rules used in Consistency correction
 */
class Rules implements ValueInterface
{
	/**
	 * Languages used in WordPress
	 *
	 * @var array
	 */
	protected array $languages = [
		'af', 'am', 'ar', 'arg', 'ary', 'as', 'az', 'azb', 'bel', 'bg-BG', 'bn-BD', 'bo', 'bs-BA', 'ca', 'ceb', 'ckb', 'cs-CZ', 'cy', 'da-DK', 'de-AT', 'de-CH', 'de-CH-informal', 'de-DE', 'de-DE-formal', 'dsb', 'dzo', 'el', 'en-AU', 'en-CA', 'en-GB', 'en-NZ', 'en-US', 'en-ZA', 'eo', 'es-AR', 'es-CL', 'es-CO', 'es-CR', 'es-DO', 'es-EC', 'es-ES', 'es-GT', 'es-MX', 'es-PE', 'es-PR', 'es-UY', 'es-VE', 'et', 'eu', 'fa-AF', 'fa-IR', 'fi', 'fr-BE', 'fr-CA', 'fr-FR', 'fur', 'fy', 'gd', 'gl-ES', 'gu', 'haz', 'he-IL', 'hi-IN', 'hr', 'hsb', 'hu-HU', 'hy', 'id-ID', 'is-IS', 'it-IT', 'ja', 'jv-ID', 'kab', 'ka-GE', 'kk', 'km', 'kn', 'ko-KR', 'lo', 'lt-LT', 'lv', 'mk-MK', 'ml-IN', 'mn', 'mr', 'ms-MY', 'my-MM', 'nb-NO', 'ne-NP', 'nl-BE', 'nl-NL', 'nl-NL-formal', 'nn-NO', 'oci', 'pa-IN', 'pl-PL', 'ps', 'pt-AO', 'pt-BR', 'pt-PT', 'pt-PT-ao90', 'rhg', 'ro-RO', 'ru-RU', 'sah', 'si-LK', 'skr', 'sk-SK', 'sl-SI', 'snd', 'sq', 'sr-RS', 'sv-SE', 'sw', 'szl', 'tah', 'ta-IN', 'ta-LK', 'te', 'th', 'tl', 'tr-TR', 'tt-RU', 'ug-CN', 'uk', 'ur', 'uz-UZ', 'vi', 'zh-CN', 'zh-HK', 'zh-TW',
	];

	/**
	 * All the rules with the languages where they are active
	 *
	 * @var array
	 */
	protected array $localizedRules = [
		'quote'                         => [ 'fr-FR', 'fr-BE', 'en-US', 'en-AU', 'en-CA', 'en-NZ', 'en-ZA', 'en-GB' ],
		'ellipsis'                      => [ 'fr-FR', 'fr-BE', 'en-US', 'en-AU', 'en-CA', 'en-NZ', 'en-ZA', 'en-GB' ],
		'breakingSpace'                 => [ 'fr-FR', 'fr-BE' ],
		'regularToCurlyQuotes'          => [ 'en-US', 'en-AU', 'en-CA', 'en-NZ', 'en-ZA', 'en-GB' ],
		'regularToFrenchQuotes'         => [ 'fr-FR', 'fr-BE' ],
		'noSpaceBefore'                 => [ 'fr-FR', 'fr-BE' ],
		'spaceBefore'                   => [ 'en-US', 'en-AU', 'en-CA', 'en-NZ', 'en-ZA', 'en-GB' ],
		'2hyphens'                      => [ 'fr-FR', 'fr-BE', 'en-US', 'en-AU', 'en-CA', 'en-NZ', 'en-ZA', 'en-GB' ],
		'ordinalNumberSuffix'           => [ 'fr-FR', 'fr-BE', 'en-US', 'en-AU', 'en-CA', 'en-NZ', 'en-ZA', 'en-GB' ],
		'noBreakingSpaceAfter'          => [ 'fr-FR', 'fr-BE', 'en-US', 'en-AU', 'en-CA', 'en-NZ', 'en-ZA', 'en-GB' ],
		'noNonBreakingSpaceAfter'       => [ 'fr-FR', 'fr-BE' ],
		'capitalizeFirstSentenceLetter' => [ 'fr-FR', 'fr-BE', 'en-US', 'en-AU', 'en-CA', 'en-NZ', 'en-ZA', 'en-GB' ],
	];

	/**
	 * Rules to register in option
	 *
	 * @var array
	 */
	protected array $rules;

	/**
	 * Check if language used in content is part of all WordPress languages
	 *
	 * @param  string $language Language
	 *
	 * @return bool
	 */
	protected function isPartOfWordPressLanguages( string $language ): bool
	{
		if ( '' !== $language && in_array( $language, $this->languages, true ) ) {
			return true;
		}
		return false;
	}

	/**
	 * Get language used in content
	 *
	 * @return string Language
	 */
	protected function getLanguageUsedInContent(): string
	{
		$language = get_bloginfo( 'language' );
		if ( ! $this->isPartOfWordPressLanguages( $language ) ) {
			return 'en-US';
		}
		return $language;
	}

	/**
	 * Set rules depending on current language and localized rules
	 *
	 * @return array
	 */
	protected function setRules(): array
	{
		foreach ( $this->localizedRules as $key => $value ) {
			$this->rules[] = [
				'slug'  => $key,
				'value' => in_array( $this->getLanguageUsedInContent(), $value, true ),
			];
		}
		return $this->rules;
	}

	/**
	 * {@inheritdoc}
	 */
	public function build(): array
	{
		return $this->rules ?? $this->setRules();
	}
}
