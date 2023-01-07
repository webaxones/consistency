<?php

namespace Webaxones\Consistency\Utils\Contracts;

defined( 'ABSPATH' ) || exit;

interface ActionInterface
{
	/**
	 * Get actions to register
	 *
	 * @return array
	 */
	public function getActions(): array;
}
