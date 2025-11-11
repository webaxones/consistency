<?php

namespace Webaxones\Consistency\Utils\Concerns;

defined( 'ABSPATH' ) || exit;

trait ObjectArrayTrait
{
	/**
	 * Synchronize two slug-indexed object arrays to keep user values across schema changes.
	 *
	 * @param  array $storedValue Current value stored in database.
	 * @param  array $referenceValue Reference shape that contains the latest schema.
	 *
	 * @return array Normalized array ready to be persisted.
	 */
	protected function synchronizeObjectArraysBySlug( array $storedValue, array $referenceValue ): array
	{
		if ( empty( $referenceValue ) ) {
			return $storedValue;
		}

		if ( empty( $storedValue ) ) {
			return $referenceValue;
		}

		$storedBySlug = $this->indexObjectArrayBySlug( $storedValue );
		$normalized   = [];

		foreach ( $referenceValue as $referenceEntry ) {
			$slug = $referenceEntry['slug'] ?? '';

			if ( '' === $slug ) {
				continue;
			}

			$existingEntry = $storedBySlug[ $slug ] ?? [];
			$normalized[]  = $this->mergeObjectArrayEntry( $referenceEntry, $existingEntry );
			unset( $storedBySlug[ $slug ] );
		}

		if ( empty( $storedBySlug ) ) {
			return $normalized;
		}

		// Keep custom slugs added via filters even if the core schema dropped them.
		foreach ( $storedBySlug as $remainingEntry ) {
			if ( empty( $remainingEntry['slug'] ) ) {
				continue;
			}

			$normalized[] = $remainingEntry;
		}

		return $normalized;
	}

	/**
	 * Build an associative array keyed by slug for faster lookups.
	 *
	 * @param  array $objects Objects that contain a slug key.
	 *
	 * @return array
	 */
	protected function indexObjectArrayBySlug( array $objects ): array
	{
		if ( empty( $objects ) ) {
			return [];
		}

		$indexed = [];

		foreach ( $objects as $object ) {
			$slug = $object['slug'] ?? '';

			if ( '' === $slug ) {
				continue;
			}

			$indexed[ $slug ] = $object;
		}

		return $indexed;
	}

	/**
	 * Merge one reference entry with the stored entry while preserving user choices.
	 *
	 * @param  array $referenceEntry Entry that represents the latest schema.
	 * @param  array $storedEntry Entry saved in the database, can be empty.
	 *
	 * @return array
	 */
	protected function mergeObjectArrayEntry( array $referenceEntry, array $storedEntry ): array
	{
		if ( empty( $storedEntry ) ) {
			return $referenceEntry;
		}

		$merged = $referenceEntry;

		if ( array_key_exists( 'value', $storedEntry ) ) {
			$merged['value'] = $storedEntry['value'];
		}

		foreach ( $storedEntry as $key => $value ) {
			if ( array_key_exists( $key, $referenceEntry ) ) {
				continue;
			}

			$merged[ $key ] = $value;
		}

		return $merged;
	}
}
