<?php
namespace Webaxones\Consistency\Asset;

defined( 'ABSPATH' ) || exit;

use Webaxones\Consistency\Utils\Contracts\ActionInterface;
use Webaxones\Consistency\Plugin;
use const Webaxones\Consistency\PLUGIN_PATH;
use const Webaxones\Consistency\PLUGIN_URL;

/**
 * Consistency's Assets
 *
 * This class declares Consistency's assets to be hooked
 *
 * @throws
 */
class Asset implements ActionInterface
{
	/**
	 * {@inheritdoc}
	 */
	public function getActions(): array
	{
		return [ 'enqueue_block_editor_assets' => [ 'enqueueEditorAsset' ] ];
	}

	/**
	 * Enqueue Editor Asset
	 *
	 * @return void
	 */
	public function enqueueEditorAsset(): void
	{
		$info = include PLUGIN_PATH . 'build/index.asset.php';
		wp_enqueue_script(
			Plugin::PREFIX . '-editor-script',
			PLUGIN_URL . 'build/index.js',
			$info['dependencies'],
			$info['version'],
			true
		);
		wp_set_script_translations( Plugin::PREFIX . '-editor-script', 'consistency' );
	}
}
