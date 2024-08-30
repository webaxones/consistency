<?php

namespace Webaxones\Consistency\Utils\Contracts;

defined( 'ABSPATH' ) || exit;

interface DataValueInterface
{
	/**
	 * Add value in table based on data kind
	 *
	 * @return void
	 */
	public function add(): void;


	/**
	 * Delete value in table based on data kind
	 *
	 * @return void
	 */
	public function delete(): void;

	/**
	 * Update value in table based on data kind
	 *
	 * @return void
	 */
	public function update(): void;

	/**
	 * Get value from table based on data kind
	 *
	 * @return $currentValue current value of the option
	 */
	public function get();
}
