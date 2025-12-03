<?php
namespace Webaxones\Consistency\Setup;

defined( 'ABSPATH' ) || exit;

use Webaxones\Consistency\Utils\Contracts\ActionInterface;

/**
 * This class manages plugin setup
 *
 * @throws
 */
class Setup implements ActionInterface
{
	/**
	 * Instance
	 *
	 * @var object $instance Instance of class
	 */
	protected static object $instance;

	/**
	 * {@inheritdoc}
	 */
	public function getActions(): array
	{
		return [ 'plugins_loaded' => [ 'init' ] ];
	}

	/**
	 * Setup init
	 *
	 * @return object
	 */
	public function init(): object
	{
		if ( is_null( self::$instance ) ) {
			self::$instance = new Setup();
		}

		return self::$instance;
	}

	/**
	 * Clear the permalinks to avoid 404 on wp-json
	 *
	 * @return void
	 */
	public static function onActivation(): void
	{
		flush_rewrite_rules();
	}

	/**
	 * Delete custom data when uninstalling the plugin
	 *
	 * @return void
	 */
	public static function onUninstallation(): void
	{
		delete_option( 'consistency_plugin_settings' );
		delete_metadata( 'user', 0, 'consistency_plugin_setting_state', '', true );
		delete_metadata( 'user', 0, 'consistency_plugin_user_settings', '', true );
	}
}
