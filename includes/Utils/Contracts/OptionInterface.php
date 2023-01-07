<?php

namespace Webaxones\Consistency\Utils\Contracts;

defined( 'ABSPATH' ) || exit;

interface OptionInterface
{
	/**
	 * Add option in WP_Options table
	 *
	 * @return void
	 */
	public function add(): void;


	/**
	 * Delete option in WP_Options table
	 *
	 * @return void
	 */
	public function delete(): void;

	/**
	 * Update option in WP_Options table
	 *
	 * @return void
	 */
	public function update(): void;

	/**
	 * Get option from WP_Options table
	 *
	 * @return mixed $currentValue current value of the option
	 */
	public function get(): mixed;
}
