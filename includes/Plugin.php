<?php
namespace Webaxones\Consistency;

defined( 'ABSPATH' ) || exit;

use Webaxones\Consistency\Config\Rules;
use Webaxones\Consistency\Config\UserSettings;
use Webaxones\Consistency\Config\RestSchema;
use Webaxones\Consistency\Hook\Hook;
use Webaxones\Consistency\Asset\Asset;
use Webaxones\Consistency\Option\Option;
use Webaxones\Consistency\Setting\Setting;
use Webaxones\Consistency\User\CurrentUser;
use Webaxones\Consistency\Meta\Meta;
use Webaxones\Consistency\MetaData\MetaData;
use Webaxones\Consistency\Setup\Setup;

/**
 * Plugin Class that run all processes
 *
 * @throws
 */
class Plugin
{
	const PREFIX = 'consistency_plugin';

	/**
	 * Run processes
	 *
	 * @return void
	 */
	public static function run(): void
	{
		self::setConstants();

		$hooks = new Hook();

		$assets = new Asset();
		$hooks->register( $assets );

		$rules  = new Rules();
		$option = new Option( 'consistency_plugin_settings', $rules );
		$hooks->register( $option );

		$setting = new Setting(
			self::PREFIX,
			self::PREFIX . '_settings',
			'array',
			RestSchema::$globalSetting
		);
		$hooks->register( $setting );

		$currentUser  = new CurrentUser();
		$userSettings = new UserSettings();
		$metadata     = new MetaData(
			'user',
			$currentUser,
			self::PREFIX . '_user_settings',
			$userSettings,
			false,
			false
		);
		$hooks->register( $metadata );

		$meta = new Meta(
			'user',
			self::PREFIX . '_user_settings',
			'',
			'array',
			true,
			RestSchema::$userMeta,
			'edit_posts',
			$currentUser
		);
		$hooks->register( $meta );

		register_activation_hook( __FILE__, [ 'Setup', 'onActivation' ] );
		register_uninstall_hook( __FILE__, [ 'Setup', 'onUnstallation' ] );

	}

	protected static function setConstants(): void
	{
		if ( ! defined( __NAMESPACE__ . '\PLUGIN_URL' ) ) {
			define( __NAMESPACE__ . '\PLUGIN_URL', plugin_dir_url( __DIR__ ) );
		}
		if ( ! defined( __NAMESPACE__ . '\PLUGIN_PATH' ) ) {
			define( __NAMESPACE__ . '\PLUGIN_PATH', plugin_dir_path( __DIR__ ) );
		}
		if ( ! defined( __NAMESPACE__ . '\VERSION' ) ) {
			define( __NAMESPACE__ . '\VERSION', '1.3.0' );
		}
	}
}
