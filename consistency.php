<?php
/**
 * Plugin Name:       Consistency
 * Plugin URI:        https://www.webaxones.com
 * Description:       Fixes typographical consistency
 * Version:           1.4.7
 * Requires at least: 6.1
 * Requires PHP:      7.4 or higher
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
