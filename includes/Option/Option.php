<?php
namespace Webaxones\Consistency\Option;

defined( 'ABSPATH' ) || exit;

use Webaxones\Consistency\Utils\Contracts\ActionInterface;
use Webaxones\Consistency\Utils\Contracts\ValueInterface;
use Webaxones\Consistency\Utils\Concerns\ObjectArrayTrait;

/**
 * This class manages Options (CRUD)
 */
class Option implements ActionInterface
{
	use ObjectArrayTrait;

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
	 * Option constructor
	 *
	 * @param  string                                                $option
	 * @param  \Webaxones\Consistency\Utils\Contracts\ValueInterface $value
	 */
	public function __construct( string $option, ValueInterface $value )
	{
		$this->option = $option;
		$this->value  = $value->build();
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
		return get_option( $this->option );
	}

	/**
	 * {@inheritdoc}
	 */
	public function add(): void
	{
		if ( false !== $this->get() ) {
			$this->update( $this->option, $this->get(), $this->value );
		}

		if ( false === $this->get() ) {
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
		$difference = $this->getDifferenceBetweenTwoObjectArray( (array) $this->get(), (array) $this->value );

		if ( empty( $difference ) ) {
			return;
		}

		update_option( $this->option, $difference );
	}
}
