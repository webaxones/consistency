<?php
namespace Webaxones\Consistency\User;

defined( 'ABSPATH' ) || exit;

use Webaxones\Consistency\Utils\Contracts\ActionInterface;
use Webaxones\Consistency\Utils\Contracts\ObjectInterface;
use Webaxones\Consistency\Utils\Contracts\UserInterface;

/**
 * This class manages functions about User
 *
 * @throws
 */
class CurrentUser implements ObjectInterface, UserInterface, ActionInterface
{
	/**
	 * User Id
	 *
	 * @var int $userId User id
	 */
	protected int $userId = 0;

	/**
	 * Current user
	 *
	 * @var object $currentUser Current user
	 */
	protected object $currentUser;

	/**
	 * {@inheritdoc}
	 */
	public function getActions(): array
	{
		return [ 'admin_init' => [ 'setCurrentUserData', 10 ] ];
	}

	/**
	 * {@inheritdoc}
	 */
	public function setId(): void
	{
		$this->userId = get_current_user_id();
	}

	/**
	 * {@inheritdoc}
	 */
	public function getId(): int
	{
		return $this->userId;
	}

	/**
	 * {@inheritdoc}
	 */
	public function getType(): string
	{
		return 'user';
	}

	/**
	 * Set Current User Data
	 *
	 * @return void
	 */
	public function setCurrentUserData(): void
	{
		$this->currentUser = wp_get_current_user();
		$this->setId();
	}

	/**
	 * {@inheritdoc}
	 */
	public function can( string $capability ): bool
	{
		return in_array( $capability, (array) $this->currentUser->capabilities, true );
	}
}
