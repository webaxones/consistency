<?php

namespace Webaxones\Consistency\Utils\Contracts;

defined( 'ABSPATH' ) || exit;

interface ValueInterface
{
	/**
	 * Build data value
	 *
	 * @return mixed $dataValue data value
	 */
	public function build(): mixed;
}
