<?php

// autoload_real.php @generated by Composer

<<<<<<< Updated upstream
class ComposerAutoloaderInit591e10f7d93f3f15c6e390ce7509823a
=======
class ComposerAutoloaderInit3168fb79f2dee8d0a050e8e99818d5c9
>>>>>>> Stashed changes
{
    private static $loader;

    public static function loadClassLoader($class)
    {
        if ('Composer\Autoload\ClassLoader' === $class) {
            require __DIR__ . '/ClassLoader.php';
        }
    }

    /**
     * @return \Composer\Autoload\ClassLoader
     */
    public static function getLoader()
    {
        if (null !== self::$loader) {
            return self::$loader;
        }

        require __DIR__ . '/platform_check.php';

<<<<<<< Updated upstream
        spl_autoload_register(array('ComposerAutoloaderInit591e10f7d93f3f15c6e390ce7509823a', 'loadClassLoader'), true, true);
        self::$loader = $loader = new \Composer\Autoload\ClassLoader(\dirname(__DIR__));
        spl_autoload_unregister(array('ComposerAutoloaderInit591e10f7d93f3f15c6e390ce7509823a', 'loadClassLoader'));

        require __DIR__ . '/autoload_static.php';
        call_user_func(\Composer\Autoload\ComposerStaticInit591e10f7d93f3f15c6e390ce7509823a::getInitializer($loader));
=======
        spl_autoload_register(array('ComposerAutoloaderInit3168fb79f2dee8d0a050e8e99818d5c9', 'loadClassLoader'), true, true);
        self::$loader = $loader = new \Composer\Autoload\ClassLoader(\dirname(__DIR__));
        spl_autoload_unregister(array('ComposerAutoloaderInit3168fb79f2dee8d0a050e8e99818d5c9', 'loadClassLoader'));

        require __DIR__ . '/autoload_static.php';
        call_user_func(\Composer\Autoload\ComposerStaticInit3168fb79f2dee8d0a050e8e99818d5c9::getInitializer($loader));
>>>>>>> Stashed changes

        $loader->register(true);

        return $loader;
    }
}
