<?php

namespace Webaxones\Consistency\Config;

defined( 'ABSPATH' ) || exit;

use Webaxones\Consistency\Utils\Contracts\ValueInterface;

/**
 * Localization Management
 */
class LocalizationManagement implements ValueInterface
{
	/**
	 * Indicates whether the management of correction localization is enabled.
	 *
	 * @var bool
	 */
	protected bool $isLocalizationManaged;

	/**
	 * Constructor
	 */
	public function __construct( bool $isLocalizationManaged )
	{
		$this->isLocalizationManaged = $isLocalizationManaged;
	}

	/**
	 * {@inheritdoc}
	 */
	public function build(): bool
	{
		return $this->isLocalizationManaged ?? true;
	}
}
