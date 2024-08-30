<?php

namespace Webaxones\Consistency\Utils\Contracts;

defined( 'ABSPATH' ) || exit;

interface StyleInterface
{
	/**
	 * Get styles
	 *
	 * @return array
	 */
	public function getStyles(): array;
}
