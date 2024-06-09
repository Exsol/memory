<?php

namespace App\Repository;

use App\Entity\History;
use App\Traits\Repository\SoftDeletesTrait;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\QueryBuilder;
use Doctrine\Persistence\ManagerRegistry;

class HistoryRepository extends ServiceEntityRepository implements DataTablesRepositoryInterface
{
    use SoftDeletesTrait;

    /**
     * @var HistoryTypeRepository
     */
    private $historyTypeRepository;
    /**
     * @var UserRepository
     */
    private $userRepository;

    public function __construct(
        ManagerRegistry $registry,
        HistoryTypeRepository $historyTypeRepository,
        UserRepository $userRepository
    ) {
        parent::__construct($registry, History::class);
        $this->historyTypeRepository = $historyTypeRepository;
        $this->userRepository = $userRepository;
    }

    public function getQueryForDataTables(): QueryBuilder
    {
        // Set Base query, which is used in later queries
        $query = $this->createQueryBuilder('dt');
        //        $query->where('dt.author = :author');
        //        $query->setParameter('author', $user);

        return $query;
    }

    public function getTimeline(string $typeName, int $entityId): array
    {
        $historyType = $this->historyTypeRepository->findOneByName($typeName);

        return $this->findBy([
            'historyType' => $historyType,
            'entityId' => $entityId,
        ]);
    }

    public function render(string $type, string $style = 'bootstrap4'): ?string
    {
        return $type.'.'.$style;
    }
}
