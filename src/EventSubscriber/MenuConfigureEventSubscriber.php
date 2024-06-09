<?php

namespace App\EventSubscriber;

use App\Event\MenuConfigureEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class MenuConfigureEventSubscriber implements EventSubscriberInterface
{
    public static function getSubscribedEvents(): array
    {
        return [
            MenuConfigureEvent::class => 'onMenuConfigure',
        ];
    }

    public function onMenuConfigure(MenuConfigureEvent $event)
    {
        $menu = $event->getMenu();

        if ('mainnav' == $menu->getName()) {
            //            $menu->addChild('menu.homepage2', ['route' => 'admin_dashboard'])
            //                ->setLabel('Homepage')
            //                ->setAttribute('class', 'nav-item')
            //                ->setLinkAttribute('class', 'nav-link waves-effect waves-dark')
            //                ->setExtra('icon', 'fa fa fa-address-card')
            //                //->setExtra('icon-position', 'before')
            //            ;
        }

        if ('sidebarnav' == $menu->getName()) {
            //            $menu->addChild('menu.homepage2', ['route' => 'admin_dashboard'])
            //                ->setLabel('Homepage')
            //                ->setAttribute('class', 'nav-item')
            //                ->setLinkAttribute('class', 'nav-link waves-effect waves-dark')
            //                ->setExtra('icon', 'fa fa-address-book')
            //                //->setExtra('icon-position', 'before')
            //            ;
        }
    }
}
