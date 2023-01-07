<?php
/**
 * Plugin Name:       Consistency
 * Plugin URI:        https://www.webaxones.com
 * Description:       Fixes typographical consistency
 * Version:           1.2.2
 * Requires at least: 6.1
 * Requires PHP:      7.3 or higher
 * Author:            Loïc Antignac
 * License:           GPL-3.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-3.0.html
 * Text Domain:       consistency
 */

defined( 'ABSPATH' ) || exit;

use Webaxones\Consistency\Plugin;

if ( is_readable( __DIR__ . '/vendor/autoload.php' ) ) {
	require_once __DIR__ . '/vendor/autoload.php';
}

Plugin::run();

// /**
//  * Clear the permalinks to avoid 404 on wp-json
//  *
//  * @return void
//  */
// function activate(): void {
// 	flush_rewrite_rules();
// }
// register_activation_hook( __FILE__, __NAMESPACE__ . '\activate' );

// /**
//  * Delete custom data when uninstalling the plugin
//  *
//  * @return void
//  */
// function uninstall(): void {
//     delete_option( 'consistency_plugin_settings' );
// 	delete_metadata( 'user', 0, 'consistency_plugin_setting_state', '', true );
// 	delete_metadata( 'user', 0, 'consistency_plugin_user_settings', '', true );
// }
// register_uninstall_hook( __FILE__, __NAMESPACE__ . '\uninstall' );
