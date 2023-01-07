<?php

namespace Webaxones\Consistency\Utils\Contracts;

defined( 'ABSPATH' ) || exit;

interface ScriptInterface
{
	/**
	 * Get scripts
	 *
	 * @return array
	 */
	public function getScripts(): array;
}
