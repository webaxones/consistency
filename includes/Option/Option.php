<?php
namespace Webaxones\Consistency\Option;

defined( 'ABSPATH' ) || exit;

use Webaxones\Consistency\Utils\Contracts\ActionInterface;
use Webaxones\Consistency\Utils\Contracts\OptionInterface;
use Webaxones\Consistency\Utils\Contracts\DataValueInterface;

/**
 * This class manages Options (CRUD)
 */
class Option implements OptionInterface, ActionInterface
{
	/**
	 * Option Name
	 *
	 * @var string $option Name of the option to add
	 */
	protected string $option;

	/**
	 * New data value
	 *
	 * @var mixed $value New Data value
	 */
	protected mixed $value;

	/**
	 * Option current value
	 *
	 * @var mixed $currentValue Current option value
	 */
	protected mixed $currentValue;

	/**
	 * Option constructor
	 *
	 * @param  string                                                    $option
	 * @param  \Webaxones\Consistency\Utils\Contracts\DataValueInterface $value
	 */
	public function __construct( string $option, DataValueInterface $value )
	{
		$this->option       = $option;
		$this->value        = $value->setDataValue();
		$this->currentValue = $this->get();
	}

	/**
	 * {@inheritdoc}
	 */
	public function getActions(): array
	{
		return [ 'admin_init' => [ 'add' ] ];
	}

	/**
	 * {@inheritdoc}
	 */
	public function get(): mixed
	{
		return get_option( $this->option, 'not-exists' );
	}

	/**
	 * {@inheritdoc}
	 */
	public function add(): void
	{
		if ( 'not-exists' !== $this->currentValue ) {
			$this->update( $this->option, $this->currentValue, $this->value );
		}

		if ( 'not-exists' === $this->currentValue ) {
			add_option( $this->option, $this->value );
		}
	}

	/**
	 * {@inheritdoc}
	 */
	public function delete(): void
	{
		delete_option( $this->option );
	}

	/**
	 * {@inheritdoc}
	 */
	public function update(): void
	{
		$difference = array_udiff(
			(array) $this->value,
			(array) $this->currentValue,
			function( $a, $b ) {
				return strcmp( $a['slug'], $b['slug'] );
			}
		);

		if ( empty( $difference ) ) {
			return;
		}
		update_option( $this->option, $difference );
	}
}
