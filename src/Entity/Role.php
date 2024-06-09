<?php

namespace App\Entity;

use App\Repository\RoleRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: RoleRepository::class)]
#[ORM\Table(name: 'roles')]
#[ORM\Index(name: 'i_is_selectable', columns: ['is_selectable'])]
#[ORM\Index(name: 'i_name', columns: ['name'])]
class Role
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'string', length: 64)]
    private $name;

    #[ORM\Column(type: 'boolean', options: ['default' => '0'])]
    private $taskCalculationActive;

    #[ORM\Column(type: 'boolean', options: ['default' => '1'])]
    private $isSelectable;

    #[ORM\Column(type: 'integer', nullable: true)]
    private ?int $sort = null;

    #[ORM\OneToMany(targetEntity: User::class, mappedBy: 'role')]
    private $users;

    #[ORM\Column(type: 'boolean', options: ['default' => '1'])]
    private $taskCalculationActiveCrm;

    #[ORM\Column(type: 'boolean', nullable: true)]
    private ?bool $carImageRequired = null;

    #[ORM\Column(type: 'boolean', nullable: true)]
    private ?bool $drivingLicenseImageActive = null;

    #[ORM\Column(type: 'boolean', nullable: true)]
    private ?bool $workStartDeactivated = null;

    #[ORM\ManyToMany(targetEntity: User::class, mappedBy: 'accessRoles')]
    private $accessUsers;

    #[ORM\Column(type: 'integer', nullable: true, options: ['default' => '0'])]
    private $workStartEarlierMinutes ;



    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private ?string $dashboardRoute = null;

    public function __construct()
    {
        $this->users = new ArrayCollection();
        $this->accessUsers = new ArrayCollection();
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

    public function __toString(): string
    {
        return $this->name;
    }

    public function getTaskCalculationActive(): ?bool
    {
        return $this->taskCalculationActive;
    }

    public function setTaskCalculationActive(bool $taskCalculationActive): self
    {
        $this->taskCalculationActive = $taskCalculationActive;

        return $this;
    }

    public function getIsSelectable(): ?bool
    {
        return $this->isSelectable;
    }

    public function setIsSelectable(?bool $isSelectable): self
    {
        $this->isSelectable = $isSelectable;

        return $this;
    }

    public function getSort(): ?int
    {
        return $this->sort;
    }

    public function setSort(?int $sort): self
    {
        $this->sort = $sort;

        return $this;
    }

    /**
     * @return Collection<int, User>
     */
    public function getUsers(): Collection
    {
        return $this->users;
    }

    public function addUser(User $user): self
    {
        if (!$this->users->contains($user)) {
            $this->users[] = $user;
            $user->setRole($this);
        }

        return $this;
    }

    public function removeUser(User $user): self
    {
        if ($this->users->removeElement($user)) {
            // set the owning side to null (unless already changed)
            if ($user->getRole() === $this) {
                $user->setRole(null);
            }
        }

        return $this;
    }

    public function getTaskCalculationActiveCrm(): ?bool
    {
        return $this->taskCalculationActiveCrm;
    }

    public function setTaskCalculationActiveCrm(bool $taskCalculationActiveCrm): self
    {
        $this->taskCalculationActiveCrm = $taskCalculationActiveCrm;

        return $this;
    }

    public function isCarImageRequired(): ?bool
    {
        return $this->carImageRequired;
    }

    public function setCarImageRequired(?bool $carImageRequired): self
    {
        $this->carImageRequired = $carImageRequired;

        return $this;
    }

    public function isDrivingLicenseImageActive(): ?bool
    {
        return $this->drivingLicenseImageActive;
    }

    public function setDrivingLicenseImageActive(?bool $drivingLicenseImageActive): self
    {
        $this->drivingLicenseImageActive = $drivingLicenseImageActive;

        return $this;
    }

    public function isWorkStartDeactivated(): ?bool
    {
        return $this->workStartDeactivated;
    }

    public function setWorkStartDeactivated(?bool $workStartDeactivated): self
    {
        $this->workStartDeactivated = $workStartDeactivated;

        return $this;
    }

    /**
     * @return Collection<int, User>
     */
    public function getAccessUsers(): Collection
    {
        return $this->accessUsers;
    }

    public function addAccessUser(User $accessUser): self
    {
        if (!$this->accessUsers->contains($accessUser)) {
            $this->accessUsers[] = $accessUser;
            $accessUser->addAccessRole($this);
        }

        return $this;
    }

    public function removeAccessUser(User $accessUser): self
    {
        if ($this->accessUsers->removeElement($accessUser)) {
            $accessUser->removeAccessRole($this);
        }

        return $this;
    }

    public function getWorkStartEarlierMinutes(): ?int
    {
        return $this->workStartEarlierMinutes;
    }

    public function setWorkStartEarlierMinutes(?int $workStartEarlierMinutes): self
    {
        $this->workStartEarlierMinutes = $workStartEarlierMinutes;

        return $this;
    }

    public function getDashboardRoute(): ?string
    {
        return $this->dashboardRoute;
    }

    public function setDashboardRoute(?string $dashboardRoute): self
    {
        $this->dashboardRoute = $dashboardRoute;

        return $this;
    }
}
