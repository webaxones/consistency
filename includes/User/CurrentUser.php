<?php
namespace Webaxones\Consistency\User;

defined( 'ABSPATH' ) || exit;

use Webaxones\Consistency\Utils\Contracts\CurrentUserInterface;

/**
 * This class manages functions about User
 *
 * @throws
 */
class CurrentUser implements CurrentUserInterface
{
	/**
	 * {@inheritdoc}
	 */
	public function getID(): int
	{
		return get_current_user_id();
	}

	/**
	 * {@inheritdoc}
	 */
	public function can( string $capability ): bool
	{
		return current_user_can( $capability, '' );
	}
}
