<?php

namespace App\EntityInterface;

interface TimestamperInterface
{
    public function getCreatedAt();

    /**
     * @param \DateTime|\DateTimeImmutable $createdAt
     */
    public function setCreatedAt(\DateTimeInterface $createdAt);

    public function getUpdatedAt();

    /**
     * @param \DateTime|\DateTimeImmutable $updatedAt
     */
    public function setUpdatedAt(\DateTimeInterface $updatedAt);

    public function updateTimestamps();
}
