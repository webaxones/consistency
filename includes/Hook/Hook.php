<?php

namespace Webaxones\Consistency\Hook;

defined( 'ABSPATH' ) || exit;

use Webaxones\Consistency\Utils\Contracts\ActionInterface;
use Webaxones\Consistency\Utils\Contracts\FilterInterface;

/**
 * Hooks manager
 */
class Hook
{
	/**
	 * Register hooks
	 *
	 * @param  object $object
	 *
	 * @return void
	 */
	public function register( object $object ): void
	{
		if ( $object instanceof ActionInterface ) {
			$this->registerActions( $object );
		}

		if ( $object instanceof FilterInterface ) {
			$this->registerFilters( $object );
		}
	}

	/**
	 * Register actions
	 *
	 * @param  object $object
	 *
	 * @return void
	 */
	public function registerActions( object $object ): void
	{
		$actions = $object->getActions();

		foreach ( $actions as $actionName => $actionSettings ) {
			$method   = $actionSettings[ 0 ] ?? '';
			$priority = $actionSettings[ 1 ] ?? 10;
			$args     = $actionSettings[ 2 ] ?? 1;
			add_action( $actionName, [ $object, $method ], $priority, $args );
		}
	}

	/**
	 * Register filters
	 *
	 * @param  object $object
	 *
	 * @return void
	 */
	public function registerFilters( object $object ): void
	{
		$filters = $object->getFilters();

		foreach ( $filters as $filterName => $filterSettings ) {
			$method   = $filterSettings[ 0 ] ?? '';
			$priority = $filterSettings[ 1 ] ?? 10;
			$args     = $filterSettings[ 2 ] ?? 1;

			add_filter( $filterName, [ $object, $method ], $priority, $args );
		}
	}
}
