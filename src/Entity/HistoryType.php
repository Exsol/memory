<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: 'App\Repository\HistoryTypeRepository')]
#[ORM\Table(name: 'history_types')]
#[ORM\Index(name: 'i_name', columns: ['name'])]
class HistoryType
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'string', length: 191)]
    private $name;

    #[ORM\OneToMany(targetEntity: 'App\Entity\History', mappedBy: 'historyType')]
    private $histories;

    public function __construct()
    {
        $this->histories = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }
}
