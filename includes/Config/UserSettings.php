<?php

namespace Webaxones\Consistency\Config;

defined( 'ABSPATH' ) || exit;

use Webaxones\Consistency\Utils\Contracts\ValueInterface;

/**
 * Default Settings current user
 */
class UserSettings implements ValueInterface
{
	/**
	 * Default settings for current user
	 *
	 * @var array $default List of default settings for the current user
	 */
	protected array $default = [
		[
			'slug'  => 'on_the_fly',
			'value' => true,
		],
		[
			'slug'  => 'on_paste',
			'value' => true,
		],
	];

	/**
	 * {@inheritdoc}
	 */
	public function build(): array
	{
		return $this->default;
	}
}
