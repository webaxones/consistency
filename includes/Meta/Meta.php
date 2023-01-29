<?php
namespace Webaxones\Consistency\Meta;

defined( 'ABSPATH' ) || exit;

use Webaxones\Consistency\Utils\Contracts\DataInterface;
use Webaxones\Consistency\Utils\Contracts\ActionInterface;
use Webaxones\Consistency\Utils\Contracts\ObjectInterface;

/**
 * This class manages Metas
 */
class Meta implements DataInterface, ActionInterface
{
	/**
	 * Meta key to register
	 *
	 * @var string
	 */
	protected string $metaKey;

	/**
	 * Type of data associated with this meta key
	 *
	 * @var string
	 */
	protected string $type;

	/**
	 * Whether data associated with this meta should be included in the REST API
	 * When registering complex metas, this argument may optionally be an array with a 'schema' key
	 *
	 * @var mixed
	 */
	protected mixed $showInRest;

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
	 * Object
	 *
	 * @var object
	 */
	protected object $object;

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
	 * Whether the meta key has one value per object, or an array of values per object
	 *
	 * @var bool
	 */
	protected bool $single;

	/**
	 * Setting constructor
	 *
	 * @param  string                                                 $metaKey Meta key to register
	 * @param  string                                                 $type Type of data associated with this meta key
	 * @param  mixed                                                  $showInRest True False OR REST Schema associated with this meta
	 * @param  string                                                 $capability User capability for auth_callback
	 * @param  \Webaxones\Consistency\Utils\Contracts\ObjectInterface $object Object metadata is for
	 * @param  string                                                 $objectSubType Subtype of object type
	 * @param  bool                                                   $single Whether the meta key has one value per object, or an array of values per object
	 */
	public function __construct( string $metaKey, string $type, mixed $showInRest, string $capability, ObjectInterface $object, string $objectSubType = '', bool $single = true )
	{
		$this->metaKey       = $metaKey;
		$this->type          = $type;
		$this->showInRest    = $showInRest;
		$this->capability    = $capability;
		$this->object        = $object;
		$this->objectSubType = $objectSubType;
		$this->single        = $single;
	}

	/**
	 * {@inheritdoc}
	 */
	public function getActions(): array
	{
		return [
			'rest_api_init' => [ 'register' ],
			'admin_init'    => [ 'authCallback', 20 ],
		];
	}

	/**
	 * {@inheritdoc}
	 */
	public function register(): void
	{
		$showInRestArgs = is_array( $this->showInRest ) ? [ 'schema' => $this->showInRest ] : (bool) $this->showInRest;
		$args           = [
			'type'              => $this->type,
			'single'            => $this->single,
			'show_in_rest'      => $showInRestArgs,
			'sanitize_callback' => [ $this, 'sanitizeCallback' ],
			'auth_callback'     => [ $this, 'authCallback' ],
		];
		register_meta( $this->object->getType(), $this->metaKey, $args );
	}

	/**
	 * {@inheritdoc}
	 */
	public function sanitizeCallback( mixed $value ): mixed
	{
		switch ( $this->type ) {
			case 'string':
				return (string) $value;

			case 'boolean':
				return (bool) $value;

			case 'integer':
				return (int) $value;

			case 'number':
				return $value;

			case 'array':
			case 'object':
				return rest_sanitize_array( $value );

			default:
				return $value;
		}
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
		return $this->object->can( $capability );
	}
}
