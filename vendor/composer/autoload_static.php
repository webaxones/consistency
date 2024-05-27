<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit2f7e358677dd7dd5194d994145b49327
{
    public static $prefixLengthsPsr4 = array (
        'W' => 
        array (
            'Webaxones\\Consistency\\' => 22,
        ),
        'P' => 
        array (
            'PHPCSStandards\\Composer\\Plugin\\Installers\\PHPCodeSniffer\\' => 57,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Webaxones\\Consistency\\' => 
        array (
            0 => __DIR__ . '/../..' . '/includes',
        ),
        'PHPCSStandards\\Composer\\Plugin\\Installers\\PHPCodeSniffer\\' => 
        array (
            0 => __DIR__ . '/..' . '/dealerdirect/phpcodesniffer-composer-installer/src',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
        'PHPCSStandards\\Composer\\Plugin\\Installers\\PHPCodeSniffer\\Plugin' => __DIR__ . '/..' . '/dealerdirect/phpcodesniffer-composer-installer/src/Plugin.php',
        'Webaxones\\Consistency\\Asset\\Asset' => __DIR__ . '/../..' . '/includes/Asset/Asset.php',
        'Webaxones\\Consistency\\Config\\LocalizedRules' => __DIR__ . '/../..' . '/includes/Config/LocalizedRules.php',
        'Webaxones\\Consistency\\Config\\RestSchema' => __DIR__ . '/../..' . '/includes/Config/RestSchema.php',
        'Webaxones\\Consistency\\Config\\Rules' => __DIR__ . '/../..' . '/includes/Config/Rules.php',
        'Webaxones\\Consistency\\Config\\UserSettings' => __DIR__ . '/../..' . '/includes/Config/UserSettings.php',
        'Webaxones\\Consistency\\Hook\\Hook' => __DIR__ . '/../..' . '/includes/Hook/Hook.php',
        'Webaxones\\Consistency\\MetaData\\MetaData' => __DIR__ . '/../..' . '/includes/MetaData/MetaData.php',
        'Webaxones\\Consistency\\Meta\\Meta' => __DIR__ . '/../..' . '/includes/Meta/Meta.php',
        'Webaxones\\Consistency\\Option\\Option' => __DIR__ . '/../..' . '/includes/Option/Option.php',
        'Webaxones\\Consistency\\Plugin' => __DIR__ . '/../..' . '/includes/Plugin.php',
        'Webaxones\\Consistency\\Setting\\Setting' => __DIR__ . '/../..' . '/includes/Setting/Setting.php',
        'Webaxones\\Consistency\\Setup\\Setup' => __DIR__ . '/../..' . '/includes/Setup/Setup.php',
        'Webaxones\\Consistency\\User\\CurrentUser' => __DIR__ . '/../..' . '/includes/User/CurrentUser.php',
        'Webaxones\\Consistency\\Utils\\Concerns\\ObjectArrayTrait' => __DIR__ . '/../..' . '/includes/Utils/Concerns/ObjectArrayTrait.php',
        'Webaxones\\Consistency\\Utils\\Contracts\\ActionInterface' => __DIR__ . '/../..' . '/includes/Utils/Contracts/ActionInterface.php',
        'Webaxones\\Consistency\\Utils\\Contracts\\DataInterface' => __DIR__ . '/../..' . '/includes/Utils/Contracts/DataInterface.php',
        'Webaxones\\Consistency\\Utils\\Contracts\\DataValueInterface' => __DIR__ . '/../..' . '/includes/Utils/Contracts/DataValueInterface.php',
        'Webaxones\\Consistency\\Utils\\Contracts\\FilterInterface' => __DIR__ . '/../..' . '/includes/Utils/Contracts/FilterInterface.php',
        'Webaxones\\Consistency\\Utils\\Contracts\\ObjectInterface' => __DIR__ . '/../..' . '/includes/Utils/Contracts/ObjectInterface.php',
        'Webaxones\\Consistency\\Utils\\Contracts\\ScriptInterface' => __DIR__ . '/../..' . '/includes/Utils/Contracts/ScriptInterface.php',
        'Webaxones\\Consistency\\Utils\\Contracts\\StyleInterface' => __DIR__ . '/../..' . '/includes/Utils/Contracts/StyleInterface.php',
        'Webaxones\\Consistency\\Utils\\Contracts\\UserInterface' => __DIR__ . '/../..' . '/includes/Utils/Contracts/UserInterface.php',
        'Webaxones\\Consistency\\Utils\\Contracts\\ValueInterface' => __DIR__ . '/../..' . '/includes/Utils/Contracts/ValueInterface.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit2f7e358677dd7dd5194d994145b49327::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit2f7e358677dd7dd5194d994145b49327::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInit2f7e358677dd7dd5194d994145b49327::$classMap;

        }, null, ClassLoader::class);
    }
}
