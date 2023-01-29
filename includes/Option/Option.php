<?php
namespace Webaxones\Consistency\Option;

defined( 'ABSPATH' ) || exit;

use Webaxones\Consistency\Utils\Contracts\ActionInterface;
use Webaxones\Consistency\Utils\Contracts\ValueInterface;
use Webaxones\Consistency\Utils\Concerns\ObjectArrayTrait;

/**
 * This class manages Options
 */
class Option implements ActionInterface
{
	use ObjectArrayTrait;

	/**
	 * Option Name
	 *
	 * @var string $optionName Name of the option to add
	 */
	protected string $optionName;

	/**
	 * New data value
	 *
	 * @var mixed $value New Data value
	 */
	protected mixed $value;

	/**
	 * Option constructor
	 *
	 * @param  string                                                $optionName
	 * @param  \Webaxones\Consistency\Utils\Contracts\ValueInterface $value
	 */
	public function __construct( string $optionName, ValueInterface $value )
	{
		$this->optionName = $optionName;
		$this->value      = $value->build();
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
		return get_option( $this->optionName );
	}

	/**
	 * {@inheritdoc}
	 */
	public function add(): void
	{
		if ( false !== $this->get() ) {
			$this->update( $this->optionName, $this->get(), $this->value );
		}

		if ( false === $this->get() ) {
			add_option( $this->optionName, $this->value );
		}
	}

	/**
	 * {@inheritdoc}
	 */
	public function delete(): void
	{
		delete_option( $this->optionName );
	}

	/**
	 * {@inheritdoc}
	 */
	public function update(): void
	{
		if ( ! is_array( $this->value ) ) {
			update_option( $this->optionName, $this->value );
			return;
		}

		$difference = $this->getDifferenceBetweenTwoObjectArray( (array) $this->get(), (array) $this->value );

		if ( empty( $difference ) ) {
			return;
		}

		update_option( $this->optionName, $difference );
	}
}
