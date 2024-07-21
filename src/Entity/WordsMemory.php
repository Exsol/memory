<?php

namespace App\Entity;

use App\Repository\WordsMemoryRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: WordsMemoryRepository::class)]
class WordsMemory
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 3000)]
    private ?string $words = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $fromPeople = null;

    #[ORM\ManyToOne(inversedBy: 'WordsMemory')]
    private ?Memory $memory = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getWords(): ?string
    {
        return $this->words;
    }

    public function setWords(?string $words): static
    {
        $this->words = $words;

        return $this;
    }

    public function getFromPeople(): ?string
    {
        return $this->fromPeople;
    }

    public function setFromPeople(?string $fromPeople): static
    {
        $this->fromPeople = $fromPeople;

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
}
