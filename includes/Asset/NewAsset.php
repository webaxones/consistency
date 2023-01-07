<?php
namespace Webaxones\Consistency\Asset;

defined( 'ABSPATH' ) || exit;

use Webaxones\Consistency\Utils\Contracts\ScriptInterface;
use Webaxones\Consistency\Utils\Contracts\StyleInterface;
use Webaxones\Consistency\Utils\Contracts\ActionInterface;
use Webaxones\Consistency\Plugin;
use const Webaxones\Consistency\PLUGIN_URL;

class Asset implements ActionInterface
{
	/**
	 * Hook name
	 *
	 * @var string
	 */
	protected string $hookName;

	/**
	 * Args to enqueue asset
	 *
	 * @var array
	 */
	protected array $args;

	/**
	 * Actions to declare
	 *
	 * @var array
	 */
	protected array $actions;

	/**
	 * {@inheritdoc}
	 */
	public function getActions(): array
	{
		return [ 'enqueue_block_editor_assets' => [ 'enqueueEditorAsset' ] ];
	}
	// public function getActions(): array
	// {
	// 	return [ 'enqueue_block_editor_assets' => [ 'enqueueEditorAsset' ] ];
	// }

	public function enqueueAsset( object $object ): void
	{
		if ( $object instanceof ScriptInterface ) {
			$this->enqueueScripts( $object );
		}

		if ( $object instanceof StyleInterface ) {
			$this->enqueueStyles( $object );
		}
	}

	public function enqueueScripts( object $object ): void
	{
		$scripts = $object->getScripts();

		foreach ( $scripts as $handle => $scriptSettings ) {

			$hookName = $scriptSettings[0] ?? '';
			$depFile  = $scriptSettings[1] ?? '';
			$src      = $scriptSettings[2] ?? '';
			$inFooter = $scriptSettings[3] ?? false;

			$this->args = [
				$handle,
				$depFile,
				$src,
				$inFooter,
			];

			$this->actions[] = [
				$hookName,
				$this->args,
			];

			$info = include $depFile;
			wp_enqueue_script(
				$handle,
				$src,
				$info['dependencies'],
				$info['version'],
				$inFooter
			);
		}
	}

	public function enqueueStyles( object $object ): void
	{
	}

	/**
	 * Enqueue Editor Asset
	 *
	 * @return void
	 */
	public function enqueueEditorAsset(): void
	{
		$info = include PLUGIN_URL . 'build/index.asset.php';
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
