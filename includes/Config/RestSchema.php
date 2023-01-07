<?php
namespace Webaxones\Consistency\Config;

defined( 'ABSPATH' ) || exit;

/**
 * REST API Schemas
 */
class RestSchema
{
	/**
	 * Schema of Global settings in REST API
	 *
	 * @var array $globalSetting Schema of Global settings in REST API used in register_settings
	 */
	public static array $globalSetting = [
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
	 * @var array $userMeta Schema of User Meta Settings in REST API used in register_meta
	 */
	public static array $userMeta = [
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