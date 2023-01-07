<?php
namespace Webaxones\Consistency\Setting;

defined( 'ABSPATH' ) || exit;

use Webaxones\Consistency\Utils\Contracts\ActionInterface;
use Webaxones\Consistency\Utils\Contracts\DataInterface;

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
	 * REST API Schema associated with this setting
	 *
	 * @var array
	 */
	protected array $restSchema;

	/**
	 * Setting constructor
	 *
	 * @param  string $optionGroup Settings group name
	 * @param  string $optionName Name of an option to sanitize and save
	 * @param  string $type Type of data associated with this setting
	 * @param  array  $restSchema REST API Schema associated with this setting
	 */
	public function __construct( string $optionGroup, string $optionName, string $type, array $restSchema )
	{
		$this->optionGroup = $optionGroup;
		$this->optionName  = $optionName;
		$this->type        = $type;
		$this->restSchema  = $restSchema;
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
		$args = [
			'type'              => $this->type,
			'show_in_rest'      => [
				'schema' => $this->restSchema,
			],
			'sanitize_callback' => 'Webaxones\Consistency\Setting\sanitizeCallback',
		];
		register_setting( $this->optionGroup, $this->optionName, $args );
	}

	/**
	 * {@inheritdoc}
	 */
	public function sanitizeCallback( mixed $value ): bool
	{
		return rest_validate_array_value_from_schema( $value, $this->restSchema, $this->optionName );
	}
}
