<?php
/**
 * Plugin Name:       Consistency
 * Plugin URI:        https://www.webaxones.com
 * Description:       Fixes typographical consistency
 * Version:           1.0.2
 * Requires at least: 6.0
 * Requires PHP:      7.3 or higher
 * Author:            Loïc Antignac
 * License:           GPL-3.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-3.0.html
 * Text Domain:       consistency
 */

namespace Consistency;

defined( 'ABSPATH' ) || exit;

/**
 * Enqueue Consistency Script in block editor
 *
 * @return void
 */
function enqueue_script(): void {
	$info = include plugin_dir_path( __FILE__ ) . '/build/index.asset.php';
	wp_enqueue_script(
		'consistency-script',
		plugin_dir_url( __FILE__ ) . '/build/index.js',
		$info['dependencies'],
		$info['version'],
		true
	);
	wp_set_script_translations( 'consistency-script', 'consistency' );
}
add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\enqueue_script' );

/**
 * Register consistency global settings
 *
 * @return void
 */
function register_settings(): void {
    register_setting(
        'consistency_plugin',
        'consistency_plugin_settings',
        [
			'type'          => 'array',
			'show_in_rest'  => [
				'schema' => [
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
				],
			],
			'auth_callback' => function() {
				return current_user_can( 'manage_options' );
			},
		]
    );
}

add_action( 'admin_init', __NAMESPACE__ . '\register_settings' );
add_action( 'rest_api_init', __NAMESPACE__ . '\register_settings' );

/**
 * Check if site is multilingual
 *
 * @return bool is it multilingual?
 */
function is_multilingual(): bool {

	$declaredClasses = get_declared_classes();
	// Polylang - WPML - TranslatePress
	if ( in_array( $declaredClasses, ['Polylang', 'SitePress', 'TRP_Translate_Press'], true ) ) {
		return true;
	}

	return false;
}

/**
 * Get the language probably used in contents
 *
 * @return string $locale locale used in contents
 */
function get_language_probably_used_in_contents(): string {
	$locale = get_bloginfo('language');
	return $locale;
}

/**
 * Set default settings
 *
 * @param  string $locale locale used in contents
 *
 * @return array $default_settings default settings
 */
function set_default_settings( string $locale ): array {
	$default_settings = [
		[
			'slug'  => 'quote',
			'value' => false,
		],
		[
			'slug'  => 'ellipsis',
			'value' => false,
		],
		[
			'slug'  => 'breakingSpace',
			'value' => false,
		],
	];
	if ( in_array( $locale, [ 'fr-FR', 'fr-BE' ], true ) ) {
		return [
			[
				'slug'  => 'quote',
				'value' => true,
			],
			[
				'slug'  => 'ellipsis',
				'value' => true,
			],
			[
				'slug'  => 'breakingSpace',
				'value' => true,
			],
		];
	}

	if ( in_array( $locale, [ 'en-US', 'en-AU', 'en-CA', 'en-NZ', 'en-ZA', 'en-GB' ], true ) ) {
		return [
			[
				'slug'  => 'quote',
				'value' => true,
			],
			[
				'slug'  => 'ellipsis',
				'value' => true,
			],
			[
				'slug'  => 'breakingSpace',
				'value' => false,
			],
		];
	}

	return $default_settings;
}

/**
 * Add Default Settings in wp_options
 *
 * @return void
 */
function add_default_settings(): void {
	$contents_locale  = get_language_probably_used_in_contents();
	$default_settings = set_default_settings( $contents_locale );

	if ( 'not-exists' === get_option( 'consistency_plugin_settings', 'not-exists' ) ) {

		add_option(
			'consistency_plugin_settings',
			$default_settings
		);
	}
}
register_activation_hook( __FILE__, __NAMESPACE__ . '\add_default_settings' );

/**
 * Register consistency user settings
 *
 * @return void
 */
function register_user_meta_settings(): void {
	register_meta(
		'user',
		'consistency_plugin_setting_state',
		[
            'type'              => 'boolean',
            'show_in_rest'      => true,
			'default'           => true,
			'auth_callback'     => function () {
				return current_user_can( 'edit_posts' );
			},
			'sanitize_callback' => 'rest_sanitize_boolean',
		]
	);
}
add_action( 'rest_api_init', __NAMESPACE__ . '\register_user_meta_settings' );

/**
 * Add current user consistency settings meta if doesn't exist
 *
 * @return void
 */
function add_current_user_meta_settings(): void {
	$current_user = wp_get_current_user();
	if ( ! metadata_exists( 'user', $current_user->ID, 'consistency_plugin_setting_state' ) && current_user_can( 'edit_posts' ) ) {
		add_user_meta( $current_user->ID, 'consistency_plugin_setting_state', true );
	}
}
add_action( 'admin_init', __NAMESPACE__ . '\add_current_user_meta_settings' );

/**
 * Clear the permalinks to avoid 404 on wp-json
 *
 * @return void
 */
function activate(): void {
	flush_rewrite_rules();
}
register_activation_hook( __FILE__, __NAMESPACE__ . '\activate' );

/**
 * Delete custom data when uninstalling the plugin
 *
 * @return void
 */
function uninstall(): void {
    delete_option( 'consistency_plugin_settings' );
	delete_metadata( 'user', 0, 'consistency_plugin_setting_state', '', true );
}
register_uninstall_hook( __FILE__, __NAMESPACE__ . '\uninstall' );
