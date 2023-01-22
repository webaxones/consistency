<?php
namespace Webaxones\Consistency\Meta;

defined( 'ABSPATH' ) || exit;

use Webaxones\Consistency\Utils\Contracts\DataInterface;
use Webaxones\Consistency\Utils\Contracts\ActionInterface;
use Webaxones\Consistency\Utils\Contracts\UserInterface;

/**
 * This class manages Metas
 */
class Meta implements DataInterface, ActionInterface
{
	/**
	 * Type of object metadata is for
	 *
	 * @var string
	 */
	protected string $objectType;

	/**
	 * Meta key to register
	 *
	 * @var string
	 */
	protected string $metaKey;

	/**
	 *  Subtype of object type
	 *  eg. post type if object type is post
	 *
	 * @see https://developer.wordpress.org/reference/functions/register_meta/
	 *
	 * @var string
	 */
	protected string $objectSubType;

	/**
	 * Type of data associated with this meta key
	 *
	 * @var string
	 */
	protected string $type;

	/**
	 * Whether the meta key has one value per object, or an array of values per object
	 *
	 * @var bool
	 */
	protected bool $single;

	/**
	 * REST API Schema associated with this meta key
	 *
	 * @var array
	 */
	protected array $restSchema;

	/**
	 * User capability name for auth_callback
	 *
	 * @var string
	 */
	protected string $capability;

	/**
	 * User capability for auth_callback
	 *
	 * @var bool
	 */
	protected bool $currentUserCan;

	/**
	 * Current user
	 *
	 * @var object
	 */
	protected object $currentUser;

	/**
	 * Setting constructor
	 *
	 * @param  string                                               $objectType Type of object metadata is for
	 * @param  string                                               $metaKey Meta key to register
	 * @param  string                                               $objectSubType Subtype of object type
	 * @param  string                                               $type Type of data associated with this meta key
	 * @param  bool                                                 $single Whether the meta key has one value per object, or an array of values per object
	 * @param  array                                                $restSchema REST API Schema associated with this meta key
	 * @param  string                                               $capability User capability for auth_callback
	 * @param  \Webaxones\Consistency\Utils\Contracts\UserInterface $currentUser Current User
	 */
	public function __construct( string $objectType, string $metaKey, string $objectSubType, string $type, bool $single, array $restSchema, string $capability, UserInterface $currentUser )
	{
		$this->objectType    = $objectType;
		$this->metaKey       = $metaKey;
		$this->objectSubType = $objectSubType;
		$this->type          = $type;
		$this->single        = $single;
		$this->restSchema    = $restSchema;
		$this->capability    = $capability;
		$this->currentUser   = $currentUser;
	}

	/**
	 * {@inheritdoc}
	 */
	public function getActions(): array
	{
		return [ 'rest_api_init' => [ 'register' ] ];
	}

	/**
	 * {@inheritdoc}
	 */
	public function register(): void
	{
		$args = [
			'type'              => $this->type,
			'single'            => $this->single,
			'show_in_rest'      => [
				'schema' => $this->restSchema,
			],
			'sanitize_callback' => [ $this, 'sanitizeCallback' ],
			'auth_callback'     => [ $this, 'authCallback' ],
		];
		register_meta( $this->objectType, $this->metaKey, $args );
	}

	/**
	 * {@inheritdoc}
	 */
	public function sanitizeCallback( mixed $value ): mixed
	{
		return rest_sanitize_array( $value );
	}

	/**
	 * Authentication callback for register_meta
	 *
	 * @param  bool $capability
	 *
	 * @return bool Can user register meta
	 */
	public function authCallback( bool $capability ): bool
	{
		return $this->currentUser->can( $capability );
	}
}
