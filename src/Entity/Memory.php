<?php

namespace App\Entity;

use App\Repository\MemoryRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: MemoryRepository::class)]
class Memory
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 25)]
    private ?string $firstName = null;

    #[ORM\Column(length: 255)]
    private ?string $lastName = null;

    #[ORM\Column(length: 255)]
    private ?string $patronymic = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeInterface $dateBirth = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeInterface $dateDeads = null;

    #[ORM\OneToOne(mappedBy: 'memory', cascade: ['persist', 'remove'])]
    private ?QrCode $status = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): static
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): static
    {
        $this->lastName = $lastName;

        return $this;
    }

    public function getPatronymic(): ?string
    {
        return $this->patronymic;
    }

    public function setPatronymic(string $patronymic): static
    {
        $this->patronymic = $patronymic;

        return $this;
    }

    public function getDateBirth(): ?\DateTimeInterface
    {
        return $this->dateBirth;
    }

    public function setDateBirth(\DateTimeInterface $dateBirth): static
    {
        $this->dateBirth = $dateBirth;

        return $this;
    }

    public function getDateDeads(): ?\DateTimeInterface
    {
        return $this->dateDeads;
    }

    public function setDateDeads(\DateTimeInterface $dateDeads): static
    {
        $this->dateDeads = $dateDeads;

        return $this;
    }

    public function getStatus(): ?QrCode
    {
        return $this->status;
    }

    public function setStatus(?QrCode $status): static
    {
        // unset the owning side of the relation if necessary
        if ($status === null && $this->status !== null) {
            $this->status->setMemory(null);
        }

        // set the owning side of the relation if necessary
        if ($status !== null && $status->getMemory() !== $this) {
            $status->setMemory($this);
        }

        $this->status = $status;

        return $this;
    }
}
