<?php
namespace Webaxones\Consistency\Setting;

defined( 'ABSPATH' ) || exit;

use Webaxones\Consistency\Utils\Contracts\ActionInterface;
use Webaxones\Consistency\Utils\Contracts\DataInterface;
use const Webaxones\Consistency\OPTION_GROUP;

/**
 * This class manages Settings
 */
class Setting implements DataInterface, ActionInterface
{
	/**
	 * Settings group name
	 *
	 * @var string
	 */
	protected string $optionGroup;

	/**
	 * Name of an option to sanitize and save
	 *
	 * @var string
	 */
	protected string $optionName;

	/**
	 * Type of data associated with this setting
	 *
	 * @var string
	 */
	protected string $type;

	/**
	 * Whether data associated with this setting should be included in the REST API
	 * When registering complex settings, this argument may optionally be an array with a 'schema' key
	 *
	 * @var mixed
	 */
	protected $showInRest;

	/**
	 * Setting constructor
	 *
	 * @param  string $optionName Name of an option to sanitize and save
	 * @param  string $type Type of data associated with this setting
	 * @param  mixed  $showInRest True False OR REST Schema associated with this setting
	 * @param  string $optionGroup Settings group name
	 */

	public function __construct( string $optionName, string $type, $showInRest, string $optionGroup = OPTION_GROUP )
	{
		$this->optionName  = $optionName;
		$this->type        = $type;
		$this->showInRest  = $showInRest;
		$this->optionGroup = $optionGroup;
	}

	/**
	 * {@inheritdoc}
	 */
	public function getActions(): array
	{
		return [
			'admin_init'    => [ 'register' ],
			'rest_api_init' => [ 'register' ],
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
			'show_in_rest'      => $showInRestArgs,
			'sanitize_callback' => [ $this, 'sanitizeCallback' ],
		];

		register_setting( $this->optionGroup, $this->optionName, $args );
	}

	/**
	 * {@inheritdoc}
	 */
	public function sanitizeCallback( $value )
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
}
