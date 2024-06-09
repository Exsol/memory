<?php

namespace App\Repository;

use App\Entity\HistoryType;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method HistoryType|null find($id, $lockMode = null, $lockVersion = null)
 * @method HistoryType|null findOneBy(array $criteria, array $orderBy = null)
 * @method HistoryType[]    findAll()
 * @method HistoryType[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class HistoryTypeRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, HistoryType::class);
    }

    public function findOneByName(string $name)
    {
        $qb = $this->createQueryBuilder('ht');
        $query = $qb->select()
            ->where('ht.name = :name')
            ->setParameter('name', $name)
            ->getQuery()
            // ->getResult()
        ;

        return $query->setMaxResults(1)->getOneOrNullResult();
    }
}
