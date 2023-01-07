<?php
namespace Webaxones\Consistency\MetaData;

defined( 'ABSPATH' ) || exit;

use Webaxones\Consistency\Utils\Contracts\MetaDataInterface;
use Webaxones\Consistency\Utils\Contracts\ActionInterface;
use Webaxones\Consistency\Utils\Contracts\DataValueInterface;
use Webaxones\Consistency\Utils\Contracts\UserInterface;


/**
 * This class manages MetaData (CRUD)
 */
class MetaData implements MetaDataInterface, ActionInterface
{
	/**
	 * Meta Type
	 *
	 * @var string $metaType Type of object metadata is for
	 */
	protected string $metaType;

	/**
	 * Object
	 *
	 * @var object $object object metadata is fo
	 */
	protected object $object;

	/**
	 * Meta Key
	 *
	 * @var string $metaKey Metadata key
	 */
	protected string $metaKey;

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

	public function __construct( string $metaType, UserInterface $currentUser, string $metaKey, DataValueInterface $value, bool $unique = false, bool $deleteAll = false )
	{
		$this->metaType  = $metaType;
		$this->object    = $currentUser;
		$this->metaKey   = $metaKey;
		$this->value     = $value->setDataValue();
		$this->unique    = $unique;
		$this->deleteAll = $deleteAll;
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
	public function add(): void
	{
		$objectId = $this->object->getID();
		add_metadata( $this->metaType, $objectId, $this->metaKey, $this->value, $this->unique );
	}

	/**
	 * {@inheritdoc}
	 */
	public function delete(): void
	{
		$objectId = $this->object->getID();
		delete_metadata( $this->metaType, $objectId, $this->metaKey, $this->value, $this->deleteAll );
	}
}
