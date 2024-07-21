<?php

namespace App\Entity;

use App\Repository\MemoryRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
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

    #[ORM\Column(length: 255)]
    private ?string $mainPhoto = null;

    #[ORM\Column(length: 3000, nullable: true)]
    private ?string $biography = null;

    /**
     * @var Collection<int, Epitaph>
     */
    #[ORM\OneToMany(mappedBy: 'memory', targetEntity: Epitaph::class, cascade: ['persist', 'remove'])]
    private Collection $epitaph;

    /**
     * @var Collection<int, PhotoArhive>
     */
    #[ORM\OneToMany(mappedBy: 'memory', targetEntity: PhotoArhive::class)]
    private Collection $photoArhive;

    /**
     * @var Collection<int, WordsMemory>
     */
    #[ORM\OneToMany(mappedBy: 'memory', targetEntity: WordsMemory::class , cascade: ['persist', 'remove'])]
    private Collection $wordsMemory;

    /**
     * @var Collection<int, LinksMemory>
     */
    #[ORM\OneToMany(mappedBy: 'memory', targetEntity: LinksMemory::class, cascade: ['persist', 'remove'])]
    private Collection $linksMemory;

    #[ORM\ManyToOne(inversedBy: 'memories')]
    private ?User $client = null;

    /**
     * @var Collection<int, BurialPlace>
     */
    #[ORM\OneToMany(mappedBy: 'memories', targetEntity: BurialPlace::class, cascade: ['persist', 'remove'])]
    private Collection $burialPlace;

    #[ORM\ManyToOne(inversedBy: 'memories')]
    private ?MemoryThema $thema = null;

    public function __construct()
    {
        $this->epitaph = new ArrayCollection();
        $this->photoArhive = new ArrayCollection();
        $this->wordsMemory = new ArrayCollection();
        $this->linksMemory = new ArrayCollection();
        $this->burialPlace = new ArrayCollection();
    }

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

    public function getMainPhoto(): ?string
    {
        return $this->mainPhoto;
    }

    public function setMainPhoto(?string $mainPhoto): static
    {
        $this->mainPhoto = $mainPhoto;

        return $this;
    }

    public function getBiography(): ?string
    {
        return $this->biography;
    }

    public function setBiography(?string $biography): static
    {
        $this->biography = $biography;

        return $this;
    }

    /**
     * @return Collection<int, Epitaph>
     */
    public function getEpitaph(): Collection
    {
        return $this->epitaph;
    }

    public function addEpitaph(Epitaph $epitaph): static
    {
        if (!$this->epitaph->contains($epitaph)) {
            $this->epitaph->add($epitaph);
            $epitaph->setMemory($this);
        }

        return $this;
    }

    public function removeEpitaph(Epitaph $epitaph): static
    {
        if ($this->epitaph->removeElement($epitaph)) {
            // set the owning side to null (unless already changed)
            if ($epitaph->getMemory() === $this) {
                $epitaph->setMemory(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, PhotoArhive>
     */
    public function getPhotoArhive(): Collection
    {
        return $this->photoArhive;
    }

    public function addPhotoArhive(PhotoArhive $photoArhive): static
    {
        if (!$this->photoArhive->contains($photoArhive)) {
            $this->photoArhive->add($photoArhive);
            $photoArhive->setMemory($this);
        }

        return $this;
    }

    public function removePhotoArhive(PhotoArhive $photoArhive): static
    {
        if ($this->photoArhive->removeElement($photoArhive)) {
            // set the owning side to null (unless already changed)
            if ($photoArhive->getMemory() === $this) {
                $photoArhive->setMemory(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, WordsMemory>
     */
    public function getWordsMemory(): Collection
    {
        return $this->wordsMemory;
    }

    public function addWordsMemory(WordsMemory $wordsMemory): static
    {
        if (!$this->wordsMemory->contains($wordsMemory)) {
            $this->wordsMemory->add($wordsMemory);
            $wordsMemory->setMemory($this);
        }

        return $this;
    }

    public function removeWordsMemory(WordsMemory $wordsMemory): static
    {
        if ($this->wordsMemory->removeElement($wordsMemory)) {
            // set the owning side to null (unless already changed)
            if ($wordsMemory->getMemory() === $this) {
                $wordsMemory->setMemory(null);
            }
        }

        return $this;
    }


    /**
     * @return Collection<int, LinksMemory>
     */
    public function getLinksMemory(): Collection
    {
        return $this->linksMemory;
    }

    public function addLinksMemory(LinksMemory $linksMemory): static
    {
        if (!$this->linksMemory->contains($linksMemory)) {
            $this->linksMemory->add($linksMemory);
            $linksMemory->setMemory($this);
        }

        return $this;
    }

    public function removeLinksMemory(LinksMemory $linksMemory): static
    {
        if ($this->linksMemory->removeElement($linksMemory)) {
            // set the owning side to null (unless already changed)
            if ($linksMemory->getMemory() === $this) {
                $linksMemory->setMemory(null);
            }
        }

        return $this;
    }

    public function getClient(): ?User
    {
        return $this->client;
    }

    public function setClient(?User $client): static
    {
        $this->client = $client;

        return $this;
    }

    /**
     * @return Collection<int, BurialPlace>
     */
    public function getBurialPlace(): Collection
    {
        return $this->burialPlace;
    }

    public function addBurialPlace(BurialPlace $burialPlace): static
    {
        if (!$this->burialPlace->contains($burialPlace)) {
            $this->burialPlace->add($burialPlace);
            $burialPlace->setMemories($this);
        }

        return $this;
    }

    public function removeBurialPlace(BurialPlace $burialPlace): static
    {
        if ($this->burialPlace->removeElement($burialPlace)) {
            // set the owning side to null (unless already changed)
            if ($burialPlace->getMemories() === $this) {
                $burialPlace->setMemories(null);
            }
        }

        return $this;
    }

    public function getThema(): ?MemoryThema
    {
        return $this->thema;
    }

    public function setThema(?MemoryThema $thema): static
    {
        $this->thema = $thema;

        return $this;
    }


}
