<?php

namespace Webaxones\Consistency\Utils\Contracts;

defined( 'ABSPATH' ) || exit;

interface DataInterface
{
	/**
	 * Register a data
	 *
	 * @return void
	 */
	public function register(): void;

	/**
	 * Method to sanitize data when registering a data
	 *
	 * @param  mixed $value value to sanitize
	 *
	 * @return bool
	 */
	public function sanitizeCallback( mixed $value ): bool;
}
