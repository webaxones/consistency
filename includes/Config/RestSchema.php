<?php
namespace Webaxones\Consistency\Config;

defined( 'ABSPATH' ) || exit;

/**
 * REST API Schemas
 */
class RestSchema
{
	/**
	 * Schema of rules settings in REST API
	 *
	 * @var array $ruleSettingSchema Schema of the setting in the REST API used in register_setting, which will contain the correction rules.
	 */
	public static array $ruleSettingSchema = [
		'items' => [
			'type'       => 'object',
			'properties' => [
				'slug'  => [
					'type' => 'string',
				],
				'value' => [
					'type' => ['string', 'number', 'integer', 'boolean', 'array', 'object', 'null'],
				],
			],
		],
	];

	/**
	 * Schema of User Meta Settings in REST API
	 *
	 * @var array $userMetaSchema Schema of the user meta in the REST API used in register_meta, which will contain the user choices for corrections (e.g., fix on paste, on the fly).
	 */
	public static array $userMetaSchema = [
		'items' => [
			'type'       => 'object',
			'properties' => [
				'slug'  => [
					'type' => 'string',
				],
				'value' => [
					'type' => ['string', 'number', 'integer', 'boolean', 'array', 'object', 'null'],
				],
			],
		],
	];
}
