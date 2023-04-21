<?php

namespace Webaxones\Consistency\Utils\Contracts;

defined( 'ABSPATH' ) || exit;

interface FilterInterface
{
	/**
	 * Get filters to register
	 *
	 * @return array
	 */
	public function getFilters(): array;
}
