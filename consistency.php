<?php
/**
 * Plugin Name:       Consistency
 * Plugin URI:        https://www.webaxones.com
 * Description:       Fixes typographical consistency
 * Version:           1.0.0
 * Requires at least: 6.0
 * Requires PHP:      8.0
 * Author:            Loïc Antignac
 * License:           GPL-3.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-3.0.html
 * Text Domain:       consistency
 * Domain Path:  /languages
 */

namespace Consistency;

defined( 'ABSPATH' ) || exit;

/**
 * Enqueue Consistency Script in block editor
 *
 * @return void
 */
function enqueue_script() {
	$info = include plugin_dir_path( __FILE__ ) . '/build/index.asset.php';
	wp_enqueue_script(
		'consistency-script',
		plugin_dir_url( __FILE__ ) . '/build/index.js',
		$info['dependencies'],
		$info['version'],
		true
	);
}
add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\enqueue_script' );

/**
 * Register consistency global settings
 *
 * @return void
 */
function register_settings() {
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

function add_default_settings() {
	if ( 'not-exists' === get_option( 'consistency_plugin_settings', 'not-exists' ) ) {
		$default_settings = [
			[
				'slug'  => 'quote',
				'value' => true,
			],
			[
				'slug'  => 'ellipsis',
				'value' => true,
			],
			[
				'slug'  => 'nonBreakingSpace',
				'value' => true,
			],
		];

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
function register_user_meta_settings() {
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
function add_current_user_meta_settings() {
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
function activate() {
	flush_rewrite_rules();
}
register_activation_hook( __FILE__, __NAMESPACE__ . '\activate' );

/**
 * Delete custom data when uninstalling the plugin
 *
 * @return void
 */
function uninstall() {
    delete_option( 'consistency_plugin_settings' );
	delete_metadata( 'user', 0, 'consistency_plugin_setting_state', '', true );
}
register_uninstall_hook( __FILE__, __NAMESPACE__ . '\uninstall' );
