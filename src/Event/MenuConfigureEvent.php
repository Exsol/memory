<?php
/**
 * Project wiwteo-app-neu.
 *
 * @author Ünal Aydin <aydin@mavimedia.com.com>
 * @copyright Ünal Aydin
 *
 * @version 1.0
 */

namespace App\Event;

use Knp\Menu\FactoryInterface;
use Knp\Menu\ItemInterface;
use Symfony\Contracts\EventDispatcher\Event;

class MenuConfigureEvent extends Event
{
    public const NAME = 'app.menu_configure';

    /**
     * @var FactoryInterface
     */
    private $factory;

    /**
     * @var ItemInterface
     */
    private $menu;

    public function __construct(FactoryInterface $factory, ItemInterface $menu)
    {
        $this->factory = $factory;
        $this->menu = $menu;
    }

    /**
     * @return FactoryInterface
     */
    public function getFactory()
    {
        return $this->factory;
    }

    /**
     * @return ItemInterface
     */
    public function getMenu()
    {
        return $this->menu;
    }
}
