<?php

namespace Webaxones\Consistency\Utils\Contracts;

defined( 'ABSPATH' ) || exit;

interface UserInterface
{
	/**
	 * Get User ID
	 *
	 * @return int
	 */
	public function getID(): int;

	/**
	 * Check if user has capability
	 *
	 * @param  string $capability capability to check
	 *
	 * @return bool
	 */
	public function can( string $capability ): bool;
}
