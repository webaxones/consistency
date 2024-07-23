<?php
namespace Webaxones\Consistency;

defined( 'ABSPATH' ) || exit;

use Webaxones\Consistency\Config\Languages;
use Webaxones\Consistency\Config\UserSettings;
use Webaxones\Consistency\Config\RestSchema;
use Webaxones\Consistency\Config\LocalizedRules;
use Webaxones\Consistency\Hook\Hook;
use Webaxones\Consistency\Asset\Asset;
use Webaxones\Consistency\Option\Option;
use Webaxones\Consistency\Setting\Setting;
use Webaxones\Consistency\User\CurrentUser;
use Webaxones\Consistency\Meta\Meta;
use Webaxones\Consistency\MetaData\MetaData;

/**
 * Plugin Class that run all processes
 *
 * @throws
 */
class Plugin
{
	public const PREFIX = 'consistency_plugin';

	/**
	 * Set Global Consistency Constants
	 *
	 * @return void
	 */
	protected static function setConstants(): void
	{
		defined( __NAMESPACE__ . '\VERSION' ) || define( __NAMESPACE__ . '\VERSION', '1.6.3' );
		defined( __NAMESPACE__ . '\PLUGIN_URL' ) || define( __NAMESPACE__ . '\PLUGIN_URL', plugin_dir_url( __DIR__ ) );
		defined( __NAMESPACE__ . '\PLUGIN_PATH' ) || define( __NAMESPACE__ . '\PLUGIN_PATH', plugin_dir_path( __DIR__ ) );
		defined( __NAMESPACE__ . '\OPTION_GROUP' ) || define( __NAMESPACE__ . '\OPTION_GROUP', 'consistency_plugin' );
		defined( __NAMESPACE__ . '\MAIN_OPTION_NAME' ) || define( __NAMESPACE__ . '\MAIN_OPTION_NAME', 'consistency_plugin_settings' );
		defined( __NAMESPACE__ . '\USER_SETTINGS_META_KEY' ) || define( __NAMESPACE__ . '\USER_SETTINGS_META_KEY', 'consistency_plugin_user_settings' );
	}

	/**
	 * Run processes
	 *
	 * @return void
	 */
	public static function run(): void
	{
		self::setConstants();
		$hooks = new Hook();
	
		// Add main script
		$assets = new Asset();
		$hooks->register( $assets );

		// Register default global settings in main option depending on language
		$languages = new Languages( LocalizedRules::$list );
		$option    = new Option( MAIN_OPTION_NAME, $languages );
		$hooks->register( $option );

		// Declare REST Schema for global settings
		$setting = new Setting( MAIN_OPTION_NAME, 'array', RestSchema::$globalSetting );
		$hooks->register( $setting );

		// Get current user
		$currentUser = new CurrentUser();
		$hooks->register( $currentUser );

		// Register default current user settings in metadata
		$userSettings = new UserSettings();
		$metadata     = new MetaData( USER_SETTINGS_META_KEY, $currentUser, $userSettings );
		$hooks->register( $metadata );

		// Declare REST Schema for user settings
		$meta = new Meta( USER_SETTINGS_META_KEY, 'array', RestSchema::$userMeta, 'edit_posts', $currentUser );
		$hooks->register( $meta );

		register_activation_hook( __FILE__, [ 'Setup', 'onActivation' ] );
		register_uninstall_hook( __FILE__, [ 'Setup', 'onUnstallation' ] );

	}
}
