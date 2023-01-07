<?php

namespace Webaxones\Consistency\Utils\Contracts;

defined( 'ABSPATH' ) || exit;

interface DataValueInterface
{
	/**
	 * Set data value
	 *
	 * @return mixed $dataValue data value
	 */
	public function setDataValue(): mixed;
}
