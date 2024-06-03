<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

/**
 * Menu.
 */
#[ORM\Entity(repositoryClass: 'App\Repository\MenuRepository')]
#[ORM\Table(name: 'menu')]
#[ORM\Index(name: 'i_sorting', columns: ['sorting'])]
#[ORM\Index(name: 'i_active', columns: ['active'])]
#[ORM\Index(name: 'i_type', columns: ['type'])]
class Menu
{
    /**
     * @var int
     */
    #[ORM\Column(name: 'id', type: 'integer', nullable: false, options: ['unsigned' => true])]
    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: 'IDENTITY')]
    private $id;

    /**
     * Many Categories have One parent Menu.
     */
    #[ORM\ManyToOne(targetEntity: 'Menu', inversedBy: 'children')]
    #[ORM\JoinColumn(name: 'parent_id', referencedColumnName: 'id')]
    public $parent;

    /**
     * One Category has many Menu items.
     */
    #[ORM\OneToMany(targetEntity: 'Menu', mappedBy: 'parent')]
    public $children;

    /**
     * @var bool
     */
    #[ORM\Column(name: 'is_link', type: 'boolean', nullable: true, options: ['default' => 1])]
    private ?bool $isLink = null;

    /**
     * @var bool
     */
    #[ORM\Column(name: 'active', type: 'boolean', nullable: true, options: ['default' => 1])]
    private ?bool $active = null;

    /**
     * @var string
     */
    #[ORM\Column(name: 'type', type: 'string', length: 128, nullable: true)]
    private ?string $type = null;

    /**
     * @var string
     */
    #[ORM\Column(name: 'name', type: 'string', length: 128, nullable: true)]
    private ?string $name = null;

    /**
     * @var string
     */
    #[ORM\Column(name: 'link_text', type: 'string', length: 191, nullable: true)]
    private ?string $linkText = null;

    /**
     * @var string|null
     */
    #[ORM\Column(name: 'route_name', type: 'string', length: 191, nullable: true)]
    private ?string $routeName = null;

    /**
     * @var string|null
     */
    #[ORM\Column(name: 'route_param', type: 'string', length: 191, nullable: true)]
    private ?string $routeParam = null;

    /**
     * @var string|null
     */
    #[ORM\Column(name: 'uri', type: 'string', length: 191, nullable: true)]
    private ?string $uri = null;

    /**
     * @var string|null
     */
    #[ORM\Column(name: 'list_class', type: 'string', length: 128, nullable: true)]
    private $listClass;

    /**
     * @var string|null
     */
    #[ORM\Column(name: 'link_class', type: 'string', length: 128, nullable: true)]
    private $linkClass;

    /**
     * @var string|null
     */
    #[ORM\Column(name: 'icon', type: 'string', length: 128, nullable: true)]
    private $icon;

    /**
     * @var string|null
     */
    #[ORM\Column(name: 'role', type: 'string', length: 128, nullable: true)]
    private $role;

    /**
     * @var int|null
     */
    #[ORM\Column(name: 'sorting', type: 'integer', nullable: true, options: ['unsigned' => true])]
    private $sorting;

    /**
     * Menu constructor.
     */
    public function __construct()
    {
        $this->children = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getParent()
    {
        return $this->parent;
    }

    /**
     * @return Menu
     */
    public function setParent($parent)
    {
        $this->parent = $parent;

        return $this;
    }

    public function getChildren()
    {
        return $this->children;
    }

    /**
     * @return Menu
     */
    public function setChildren($children)
    {
        $this->children = $children;

        return $this;
    }

    public function isLink(): bool
    {
        return $this->isLink;
    }

    public function setIsLink(bool $isLink): Menu
    {
        $this->isLink = $isLink;

        return $this;
    }

    public function isActive(): bool
    {
        return $this->active;
    }

    public function getActive(): bool
    {
        return $this->active;
    }

    public function setActive(bool $active): Menu
    {
        $this->active = $active;

        return $this;
    }

    public function getType(): string
    {
        return $this->type;
    }

    public function setType(string $type): Menu
    {
        $this->type = $type;

        return $this;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): Menu
    {
        $this->name = $name;

        return $this;
    }

    public function getLinkText(): string
    {
        return $this->linkText;
    }

    public function setLinkText(string $linkText): Menu
    {
        $this->linkText = $linkText;

        return $this;
    }

    public function getRouteName(): ?string
    {
        return $this->routeName;
    }

    public function setRouteName(?string $routeName): Menu
    {
        $this->routeName = $routeName;

        return $this;
    }

    public function getRouteParam(): ?string
    {
        return $this->routeParam;
    }

    public function setRouteParam(?string $routeParam): Menu
    {
        $this->routeParam = $routeParam;

        return $this;
    }

    public function getUri(): ?string
    {
        return $this->uri;
    }

    public function setUri(?string $uri): Menu
    {
        $this->uri = $uri;

        return $this;
    }

    public function getListClass(): ?string
    {
        return $this->listClass;
    }

    public function setListClass(?string $listClass): Menu
    {
        $this->listClass = $listClass;

        return $this;
    }

    public function getLinkClass(): ?string
    {
        return $this->linkClass;
    }

    public function setLinkClass(?string $linkClass): Menu
    {
        $this->linkClass = $linkClass;

        return $this;
    }

    public function getIcon(): ?string
    {
        return $this->icon;
    }

    public function setIcon(?string $icon): Menu
    {
        $this->icon = $icon;

        return $this;
    }

    public function getRole(): ?string
    {
        return $this->role;
    }

    public function setRole(?string $role): Menu
    {
        $this->role = $role;

        return $this;
    }

    public function getSorting(): ?int
    {
        return $this->sorting;
    }

    public function setSorting(?int $sorting): Menu
    {
        $this->sorting = $sorting;

        return $this;
    }
}
