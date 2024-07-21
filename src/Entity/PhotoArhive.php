<?php

namespace App\Entity;

use App\Repository\PhotoArhiveRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PhotoArhiveRepository::class)]
class PhotoArhive
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $photo = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $description = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $sort = null;

    #[ORM\ManyToOne(inversedBy: 'photoArhive')]
    private ?Memory $memory = null;

    #[ORM\ManyToOne(inversedBy: 'photoArchive')]
    private ?Memory $memoryEntity = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPhoto(): ?string
    {
        return $this->photo;
    }

    public function setPhoto(string $photo): static
    {
        $this->photo = $photo;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getSort(): ?string
    {
        return $this->sort;
    }

    public function setSort(?string $sort): static
    {
        $this->sort = $sort;

        return $this;
    }

    public function getMemory(): ?Memory
    {
        return $this->memory;
    }

    public function setMemory(?Memory $memory): static
    {
        $this->memory = $memory;

        return $this;
    }

    public function getMemoryEntity(): ?Memory
    {
        return $this->memoryEntity;
    }

    public function setMemoryEntity(?Memory $memoryEntity): static
    {
        $this->memoryEntity = $memoryEntity;

        return $this;
    }
}
