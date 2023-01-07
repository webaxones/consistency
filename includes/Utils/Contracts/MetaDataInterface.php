<?php

namespace Webaxones\Consistency\Utils\Contracts;

defined( 'ABSPATH' ) || exit;

interface MetaDataInterface
{
	/**
	 * Add metadata in meta table
	 *
	 * @return void
	 */
	public function add(): void;


	/**
	 * Delete metadata in meta table
	 *
	 * @return void
	 */
	public function delete(): void;
}
