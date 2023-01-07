<?php

namespace Webaxones\Consistency\Config;

defined( 'ABSPATH' ) || exit;

use Webaxones\Consistency\Utils\Contracts\DataValueInterface;

/**
 * Default Settings current user
 */
class UserSettings implements DataValueInterface
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
		[
			'slug'  => 'on_selection',
			'value' => false,
		],
	];

	/**
	 * {@inheritdoc}
	 */
	public function setDataValue(): array
	{
		return $this->default;
	}
}
