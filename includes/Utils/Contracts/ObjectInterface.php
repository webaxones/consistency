<?php

namespace Webaxones\Consistency\Utils\Contracts;

defined( 'ABSPATH' ) || exit;

interface ObjectInterface
{
	/**
	 * Get Object ID
	 *
	 * @return int
	 */
	public function getId(): int;

	/**
	 * Set Object ID
	 *
	 * @return void
	 */
	public function setId(): void;

	/**
	 * Get Object Type
	 *
	 * @return string
	 */
	public function getType(): string;
}
