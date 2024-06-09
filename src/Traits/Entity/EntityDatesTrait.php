<?php
/**
 * Project Alca API
 *
 * @author Ünal Aydin <aydin@mavimedia.com.com>
 * @copyright Ünal Aydin
 * @version 1.0
 * @package App\Entity
 */

namespace App\Traits\Entity;

use Doctrine\ORM\Mapping as ORM;
use DateTime;

trait EntityDatesTrait
{

    /*
    |
    | Don't forget to add into entity class notation: @ORM\HasLifecycleCallbacks
    |
    */
    /**
     * @var DateTime $created
     */
    #[ORM\Column(name: 'created_at', type: 'datetime', nullable: false)]
    protected $createdAt;

    /**
     * @var DateTime $updated
     */
    #[ORM\Column(name: 'updated_at', type: 'datetime', nullable: false)]
    protected $updatedAt;

    #[ORM\PrePersist]
    #[ORM\PreUpdate]
    public function updatedTimestamps(): void
    {
        $dateTimeNow = new DateTime('now');
        $this->setUpdatedAt($dateTimeNow);
        if ($this->createdAt === null) {
            $this->setCreatedAt($dateTimeNow);
        }
    }

//    /**
//     * Gets triggered only on insert
//
//     * @ORM\PrePersist
//     */
//    public function onPrePersist()
//    {
//        $this->setCreatedAt(new DateTime("now"));
//    }
//
//    /**
//     * Gets triggered every time on update
//
//     * @ORM\PreUpdate
//     */
//    public function onPreUpdate()
//    {
//        $this->setUpdatedAt(new DateTime("now"));
//    }


    public function getCreatedAt() :?DateTime
    {
        return $this->createdAt;
    }

    public function setCreatedAt(DateTime $createdAt): self
    {
        $this->createdAt = $createdAt;
        return $this;
    }

    public function getUpdatedAt() :?DateTime
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(DateTime $updatedAt): self
    {
        $this->updatedAt = $updatedAt;
        return $this;
    }

}
