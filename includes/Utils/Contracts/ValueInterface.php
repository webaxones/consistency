<?php

namespace Webaxones\Consistency\Utils\Contracts;

defined( 'ABSPATH' ) || exit;

interface ValueInterface
{
	/**
	 * Build data value
	 *
	 * @return $dataValue data value
	 */
	public function build();
}
