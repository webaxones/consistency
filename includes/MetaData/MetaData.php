<?php
namespace Webaxones\Consistency\MetaData;

defined( 'ABSPATH' ) || exit;

use Webaxones\Consistency\Utils\Contracts\ActionInterface;
use Webaxones\Consistency\Utils\Contracts\ValueInterface;
use Webaxones\Consistency\Utils\Contracts\DataValueInterface;
use Webaxones\Consistency\Utils\Contracts\ObjectInterface;
use Webaxones\Consistency\Utils\Concerns\ObjectArrayTrait;


/**
 * This class manages MetaData
 */
class MetaData implements ActionInterface, DataValueInterface
{
	use ObjectArrayTrait;

	/**
	 * Object
	 *
	 * @var object $object object metadata is for
	 */
	protected object $object;

	/**
	 * Meta Key
	 *
	 * @var string $metaKey Metadata key
	 */
	protected string $metaKey;

	/**
	 * Current data value
	 *
	 * @var mixed $currentValue Current data value
	 */
	protected mixed $currentValue;

	/**
	 * New data value
	 *
	 * @var mixed $value New Data value
	 */
	protected mixed $value;

	/**
	 * Unique
	 *
	 * @var bool $unique Whether the specified metadata key should be unique for the object
	 */
	protected bool $unique;

	/**
	 * Unique
	 *
	 * @var bool $deleteAll If true, delete matching metadata entries for all objects, ignoring the specified object_id
	 */
	protected bool $deleteAll;

	/**
	 * MetaData constructor
	 *
	 * @param  string                                                 $metaKey Metadata key
	 * @param  \Webaxones\Consistency\Utils\Contracts\ObjectInterface $object Object metadata is for
	 * @param  \Webaxones\Consistency\Utils\Contracts\ValueInterface  $value New Data value
	 * @param  bool                                                   $unique Whether the specified metadata key should be unique for the object
	 * @param  bool                                                   $deleteAll  If true, delete matching metadata entries for all objects, ignoring the specified object_id
	 */
	public function __construct( string $metaKey, ObjectInterface $object, ValueInterface $value, bool $unique = false, bool $deleteAll = false )
	{
		$this->metaKey   = $metaKey;
		$this->object    = $object;
		$this->value     = $value->build();
		$this->unique    = $unique;
		$this->deleteAll = $deleteAll;
	}

	/**
	 * {@inheritdoc}
	 */
	public function getActions(): array
	{
		// Dependencies need to fire before
		return [ 'admin_init' => [ 'add', 20 ] ];
	}

	/**
	 * Set currentValue from database
	 *
	 * @return void
	 */
	public function setCurrentValue(): void
	{
		$this->currentValue = $this->get();
	}

	/**
	 * {@inheritdoc}
	 */
	public function get(): mixed
	{
		return get_metadata( $this->object->getType(), $this->object->getId(), $this->metaKey, true );
	}

	/**
	 * {@inheritdoc}
	 */
	public function add(): void
	{
		$this->setCurrentValue();

		if ( ! empty( $this->currentValue ) ) {
			$this->update();
		}

		if ( empty( $this->currentValue ) ) {
			add_metadata( $this->object->getType(), $this->object->getId(), $this->metaKey, $this->value, $this->unique );
		}
	}

	/**
	 * {@inheritdoc}
	 */
	public function delete(): void
	{
		delete_metadata( $this->object->getType(), $this->object->getId(), $this->metaKey, $this->value, $this->deleteAll );
	}

	/**
	 * {@inheritdoc}
	 */
	public function update(): void
	{
		$difference = $this->getDifferenceBetweenTwoObjectArray( (array) $this->currentValue, (array) $this->value );

		if ( empty( $difference ) ) {
			return;
		}

		update_metadata( $this->object->getType(), $this->object->getId(), $this->metaKey, $difference, '' );
	}
}
