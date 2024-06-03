<?php

namespace App\Repository;

use App\Entity\Menu;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\QueryBuilder;
use Doctrine\Persistence\ManagerRegistry;

class MenuRepository extends ServiceEntityRepository implements DataTablesRepositoryInterface
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Menu::class);
    }

    public function getQueryForDataTables(): QueryBuilder
    {
        return $this->createQueryBuilder('dt');
    }

    public function getMenuItems($type, $parent = null)
    {
        $query = $this->createQueryBuilder('m');

        $query->where('m.active = :active');
        $query->setParameter('active', true);

        $query->andWhere('m.type = :type');
        $query->setParameter('type', $type);

        if (null == $parent) {
            $query->andWhere('m.parent is null');
        } else {
            $query->andWhere('m.parent = :parent');
            $query->setParameter('parent', $parent);
        }

        $query->orderBy('m.sorting', 'ASC');

        return $query->getQuery()->getResult();
    }
}
