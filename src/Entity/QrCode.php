<?php

namespace App\Entity;

use App\Repository\QrCodeRepository;
use Doctrine\ORM\Mapping as ORM;
use Knp\DoctrineBehaviors\Contract\Entity\TimestampableInterface;
use Knp\DoctrineBehaviors\Model\Timestampable\TimestampableTrait;

#[ORM\Entity(repositoryClass: QrCodeRepository::class)]
class QrCode implements TimestampableInterface
{
    use TimestampableTrait;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: 'text')]
    private ?string $img = null;

    #[ORM\Column(length: 255)]
    private ?string $uuid = null;

    #[ORM\ManyToOne(inversedBy: 'qrCodes')]
    #[ORM\JoinColumn(nullable: false)]
    private ?user $user = null;

    #[ORM\ManyToOne(inversedBy: 'qrCodeClient')]
    private ?User $client = null;

    #[ORM\OneToOne(inversedBy: 'status', cascade: ['persist', 'remove'])]
    private ?Memory $memory = null;

    #[ORM\ManyToOne(inversedBy: 'qrCodes')]
    #[ORM\JoinColumn(nullable: false)]
    private ?StatusQrCode $status = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getImg(): ?string
    {
        return $this->img;
    }

    public function setImg(string $img): static
    {
        $this->img = $img;

        return $this;
    }

    public function getUuid(): ?string
    {
        return $this->uuid;
    }

    public function setUuid(string $uuid): static
    {
        $this->uuid = $uuid;

        return $this;
    }

    public function getUser(): ?user
    {
        return $this->user;
    }

    public function setUser(?user $user): static
    {
        $this->user = $user;

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

    public function getMemory(): ?Memory
    {
        return $this->memory;
    }

    public function setMemory(?Memory $memory): static
    {
        $this->memory = $memory;

        return $this;
    }

    public function getStatus(): ?StatusQrCode
    {
        return $this->status;
    }

    public function setStatus(?StatusQrCode $status): static
    {
        $this->status = $status;

        return $this;
    }
}
