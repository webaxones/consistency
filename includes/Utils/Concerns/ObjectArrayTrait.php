<?php

namespace Webaxones\Consistency\Utils\Concerns;

defined( 'ABSPATH' ) || exit;

trait ObjectArrayTrait
{
	/**
	 * Get difference between 2 object arrays with same schema: slug - value
	 *
	 * @return string
	 */
	public function getDifferenceBetweenTwoObjectArray( array $array1, array $array2 ): array
	{
		if ( empty( $array1 ) ) {
			return $array2;
		}
		if ( empty( $array2 ) ) {
			return [];
		}
		return array_udiff(
			$array1,
			$array2,
			function( $a, $b ) {
				return strcmp( $a['slug'], $b['slug'] );
			}
		);
	}
}
