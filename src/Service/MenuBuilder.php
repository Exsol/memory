<?php

namespace App\Service;

use App\Entity\Menu;
use App\Event\MenuConfigureEvent;
use App\Repository\MenuRepository;
use Knp\Menu\FactoryInterface;
use Knp\Menu\MenuItem;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Contracts\Translation\TranslatorInterface;

class MenuBuilder
{
    private $factory;
    /**
     * @var Security
     */
    private $security;
    /**
     * @var TranslatorInterface
     */
    private $translator;
    /**
     * @var EventDispatcher
     */
    private $dispatcher;
    /**
     * @var MenuRepository
     */
    private $menuRepository;
    /**
     * @var array
     */
    private $levelNames = [
        '',
        'first-level',
        'second-level',
        'third-level',
        'fourth-level',
    ];

    public function __construct(FactoryInterface $factory,
                                Security $security,
                                TranslatorInterface $translator,
                                EventDispatcherInterface $dispatcher,
                                MenuRepository $menuRepository)
    {
        $this->factory = $factory;
        $this->security = $security;
        $this->translator = $translator;
        $this->dispatcher = $dispatcher;
        $this->menuRepository = $menuRepository;
    }

    public function createMainMenu(array $options)
    {
        $menu = $this->factory->createItem('mainnav')
            ->setChildrenAttribute('class', 'navbar-nav me-auto');

        $menu->addChild('menu.toggler')
            ->setUri('javascript:void(0)')
            ->setLabel('')
            ->setAttribute('class', 'nav-item d-none d-md-block')
            ->setLinkAttribute('class', 'nav-link sidebartoggler waves-effect waves-dark')
            ->setExtra('icon', 'ri-close-line fs-6 ri-menu-2-line')// ->setExtra('icon-position', 'before')
        ;

        //        $menu->addChild('menu.search')
        //            ->setUri('javascript:void(0)')
        //            ->setLabel('')
        //            ->setAttribute('class', 'nav-item search-box')
        //            ->setLinkAttribute('class', 'nav-link waves-effect waves-dark')
        //            ->setExtra('icon', 'ti-search')//->setExtra('icon-position', 'before')
        //        ;

        //        if ($this->security->isGranted('ROLE_ADMIN')) {
        //            $menu->addChild('menu.backend', ['route' => 'admin_dashboard'])
        //                ->setLabel($this->translator->trans('menu.backend'))
        //                ->setAttribute('class', 'nav-item')
        //                ->setLinkAttribute('class', 'nav-link waves-effect waves-dark')
        //                ->setExtra('icon', 'fa fa-lock')//->setExtra('icon-position', 'before')
        //            ;
        //        }

        // MenuConfigureEvent is called
        $event = new MenuConfigureEvent($this->factory, $menu);
        $this->dispatcher->dispatch($event);

        return $menu;
    }

    public function createFrontendMainMenu(array $options)
    {
        $menu = $this->factory->createItem('frontend_main')
            ->setChildrenAttribute('class', 'navbar-nav float-left mr-auto');
        $rows = $this->menuRepository->getMenuItems('frontend_main', null);
        $this->setMenueItems($rows, $menu);

        // UserCreatedEvent is called
        $event = new MenuConfigureEvent($this->factory, $menu);
        $this->dispatcher->dispatch($event);

        return $menu;
    }

    public function createSidebarMenu(array $options)
    {
        $menu = $this->factory->createItem('sidebarnav')
            ->setChildrenAttribute('id', 'sidebarnav');

        $rows = $this->menuRepository->getMenuItems('sidebarnav', null);

        $this->setMenueItems($rows, $menu);

        // UserCreatedEvent is called
        $event = new MenuConfigureEvent($this->factory, $menu);
        $this->dispatcher->dispatch($event);

        return $menu;
    }

    private function setMenueItems($rows, $menu, $level = 0)
    {
        ++$level;

        /** @var Menu $row */
        foreach ($rows as $row) {
            // $role = $row->getRole();

            // $roles = preg_split('/\s?,\s?/', $row->getRole());
            $roles = [];
            if (null !== $row->getRole()) {
                $roles = preg_split('/\s?,\s?/', $row->getRole());
            }
            $accessGranted = false;
            foreach ($roles as $role) {
                if ($this->security->isGranted(trim($role))) {
                    $accessGranted = true;
                }
            }

            if ($accessGranted) {
                //                if (!$row->isLink()) {
                //                    /** @var MenuItem $item */
                //                    $item = $menu->addChild($row->getName());
                //                    $item->setUri('javascript:void(0)');
                //                } else {
                //                }

                $routeArray = [];
                if (null !== $row->getRouteName() && '' != $row->getRouteName()) {
                    $routeArray['route'] = $row->getRouteName();
                }

                /** @var MenuItem $item */
                $item = $menu->addChild($row->getName(), $routeArray);

                if (empty($routeArray)) {
                    $item->setUri($row->getUri());
                }

                // $linkText = '<span class="hide-menu">'.$this->translator->trans($row->getLinkText()).'</span>';
                $linkText = $this->translator->trans($row->getLinkText());

                $item->setLabel($linkText)
                    ->setAttribute('class', $row->getListClass())
                    ->setLinkAttribute('class', $row->getLinkClass())
                    ->setExtra('icon', $row->getIcon())
                    ->setExtra('span', 'hide-menu')
                ;

                if (count($row->getChildren()) > 0) {
                    $item->setChildrenAttribute('class', 'collapse '.$this->levelNames[$level]);

                    $subRows = $this->menuRepository->getMenuItems('sidebarnav', $row);
                    $this->setMenueItems($subRows, $menu[$row->getName()], $level);
                }
            }
        }
    }
}
