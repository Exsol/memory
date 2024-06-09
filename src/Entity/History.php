<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Knp\DoctrineBehaviors\Contract\Entity\SoftDeletableInterface;
use Knp\DoctrineBehaviors\Contract\Entity\TimestampableInterface;
use Knp\DoctrineBehaviors\Model\SoftDeletable\SoftDeletableTrait;
use Knp\DoctrineBehaviors\Model\Timestampable\TimestampableTrait;
use Nelmio\ApiDocBundle\Annotation\Model;
use OpenApi\Attributes as OA;

/**
 * History.
 */
#[ORM\Entity(repositoryClass: 'App\Repository\HistoryRepository')]
#[ORM\Table(name: 'history')]
#[ORM\Index(name: 'i_entity_id', columns: ['entity_id'])]
class History implements SoftDeletableInterface, TimestampableInterface
{
    use SoftDeletableTrait;
    use TimestampableTrait;

    #[OA\Property(description: "The unique identifier of the history.")]
    #[ORM\Column(name: 'id', type: 'integer', nullable: false)]
    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: 'IDENTITY')]
    private int $id;

    #[OA\Property(description: "The unique identifier of the entity.")]
    #[ORM\Column(name: 'entity_id', type: 'integer', nullable: true)]
    private ?int $entityId;

    #[OA\Property(ref: new Model(type: User::class))]
    #[ORM\ManyToOne(targetEntity: 'App\Entity\User', inversedBy: 'histories')]
    #[ORM\JoinColumn(nullable: false)]
    private User $user;

    #[ORM\ManyToOne(targetEntity: 'App\Entity\HistoryType', inversedBy: 'histories')]
    #[ORM\JoinColumn(nullable: false)]
    private HistoryType $historyType;

    #[ORM\Column(name: 'icon', type: 'string', nullable: true, length: 191)]
    private ?string $icon;

    #[ORM\Column(name: 'class', type: 'string', nullable: true, length: 191)]
    private ?string $class;

    #[ORM\Column(name: 'text', type: 'string', nullable: true, length: 191)]
    private ?string $text;

    #[ORM\Column(name: 'assets', type: 'text', nullable: true)]
    private ?string $assets;

    public function __construct()
    {
    }

    public function getId(): int
    {
        return $this->id;
    }

    public function getEntityId(): int
    {
        return $this->entityId;
    }

    public function setEntityId(int $entityId): History
    {
        $this->entityId = $entityId;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser($user): static
    {
        $this->user = $user;

        return $this;
    }

    public function getHistoryType(): ?HistoryType
    {
        return $this->historyType;
    }

    public function setHistoryType($historyType): static
    {
        $this->historyType = $historyType;

        return $this;
    }

    public function getIcon(): ?string
    {
        return $this->icon;
    }

    public function setIcon(?string $icon): static
    {
        $this->icon = $icon;

        return $this;
    }

    public function getClass(): ?string
    {
        return $this->class;
    }

    public function setClass(?string $class): static
    {
        $this->class = $class;

        return $this;
    }

    public function getText(): ?string
    {
        return $this->text;
    }

    public function setText(?string $text): static
    {
        $this->text = $text;

        return $this;
    }

    public function getAssets(): ?string
    {
        return $this->assets;
    }

    public function setAssets(?string $assets): static
    {
        $this->assets = $assets;

        return $this;
    }
}
