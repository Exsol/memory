<?php

namespace App\Repository;

use App\Entity\Role;
use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\ORMException;
use Doctrine\ORM\QueryBuilder;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\SecurityBundle\Security;

/**
 * @extends ServiceEntityRepository<Role>
 *
 * @method Role|null find($id, $lockMode = null, $lockVersion = null)
 * @method Role|null findOneBy(array $criteria, array $orderBy = null)
 * @method Role[]    findAll()
 * @method Role[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class RoleRepository extends ServiceEntityRepository
{
    /**
     * @var Security
     */
    private $security;

    public function __construct(ManagerRegistry $registry, Security $security)
    {
        parent::__construct($registry, Role::class);

        $this->security = $security;
    }

    public function getQueryForDataTables(): QueryBuilder
    {
        // Set Base query, which is used in later queries
        return $this->createQueryBuilder('dt');
    }

    public function findAllSelectable()
    {
        $qb = $this->createQueryBuilder('r');

//        if ($this->security->isGranted('ROLE_SUPER_ADMIN')) {
//            $qb
//                ->select('r')
//                ->orderBy('r.sort', 'ASC')
//            ;
//        } elseif ($this->security->isGranted('ROLE_ADMIN')) {
//            $qb
//                ->select('r')
//                ->where('r.isSelectable = :val')
//                ->orWhere('r.name IN (:allowedRoles)')
//
//                ->setParameter('val', true)
//                ->setParameter('allowedRoles', ['ROLE_ADMIN'])
//                ->orderBy('r.sort', 'ASC')
//            ;
//        } else {
//            $qb
//                ->select('r')
//                ->andWhere('r.isSelectable = :val')
//                ->setParameter('val', true)
//                ->orderBy('r.sort', 'ASC')
//            ;
//        }
            $qb
                ->select('r')
                ->where('r.isSelectable = :val')
                ->orWhere('r.name IN (:allowedRoles)')

                ->setParameter('val', true)
                ->setParameter('allowedRoles', ['ROLE_ADMIN'])
                ->orderBy('r.sort', 'ASC')
            ;
        return $qb->getQuery()
            ->getResult();
    }

    public function findSelectableForEmployeeForm()
    {
        //        /** @var User $loggedInUser */
        //        $loggedInUser = $this->security->getUser();
        //        $userRole = $loggedInUser->getRole()->getName();
        //
        //        if ( $userRole == 'ROLE_EXTERNAL_AREA_MANAGER' || $userRole == 'ROLE_EXTERNAL_COUNTRY_MANAGER' ) {
        //            $selectable = ['ROLE_BOLT_SERVICE'];
        //        } else {
        //            $selectable = ['ROLE_SERVICE', 'ROLE_WAREHOUSE_MANAGER'];
        //        }

        $selectable = ['ROLE_SERVICE', 'ROLE_BOLT_SERVICE', 'ROLE_WAREHOUSE_MANAGER'];

        $qb = $this->createQueryBuilder('r');

        $qb
            ->select('r')
            ->andWhere('r.name IN (:name)')
            ->setParameter('name', $selectable)
            ->orderBy('r.sort', 'ASC')
        ;

        return $qb->getQuery()
            ->getResult();
    }

    public function findByNames(array $roleNames)
    {
        return $this->createQueryBuilder('r')
            ->andWhere('r.name IN (:roleNames)')
            ->setParameter('roleNames', $roleNames)
            ->orderBy('r.sort', 'ASC')
            ->getQuery()
            ->getResult()
        ;
    }

    /**
     * @throws ORMException
     * @throws OptimisticLockException
     */
    public function add(Role $entity, bool $flush = true): void
    {
        $this->_em->persist($entity);
        if ($flush) {
            $this->_em->flush();
        }
    }

    /**
     * @throws ORMException
     * @throws OptimisticLockException
     */
    public function remove(Role $entity, bool $flush = true): void
    {
        $this->_em->remove($entity);
        if ($flush) {
            $this->_em->flush();
        }
    }

    // /**
    //  * @return Role[] Returns an array of Role objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('r')
            ->andWhere('r.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('r.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Role
    {
        return $this->createQueryBuilder('r')
            ->andWhere('r.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
