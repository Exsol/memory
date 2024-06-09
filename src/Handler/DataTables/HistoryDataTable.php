<?php
/**
 * Project wiwteo-app-neu.
 *
 * @author Ünal Aydin <aydin@mavimedia.com.com>
 * @copyright Ünal Aydin
 *
 * @version 1.0
 */

namespace App\Handler\DataTables;

use App\Entity\History;
use App\Entity\HistoryType;
use App\EntityInterface\HistoryInterface;
use App\Repository\HistoryRepository;
use App\Repository\HistoryTypeRepository;
use DataTables\AbstractDataTableHandler;
use DataTables\DataTableQuery;
use DataTables\DataTableResults;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
use Symfony\Contracts\Translation\TranslatorInterface;

class HistoryDataTable extends AbstractDataTableHandler
{
    public const ID = 'history';

    /**
     * @var EntityManagerInterface
     */
    protected $entityManager;

    /**
     * @var HistoryRepository
     */
    private $historyRepository;

    /**
     * @var HistoryTypeRepository
     */
    private $historyTypeRepository;

    /**
     * @var TranslatorInterface
     */
    private $translator;

    /**
     * Dependency Injection constructor.
     */
    public function __construct(EntityManagerInterface $entityManager,
        HistoryRepository $historyRepository,
        HistoryTypeRepository $historyTypeRepository,
        TranslatorInterface $translator)
    {
        $this->entityManager = $entityManager;
        $this->historyRepository = $historyRepository;
        $this->historyTypeRepository = $historyTypeRepository;
        $this->translator = $translator;
    }

    public function handle(DataTableQuery $request, $baseQuery = null, $configArray = []): DataTableResults
    {
        /* @var \Doctrine\ORM\EntityRepository $repository */
        // $repository = $this->entityManager->getRepository('App:History');

        if (isset($request->customData['type']) && !empty($request->customData['type'])) {
            $historyType = $this->historyTypeRepository->findOneByName($request->customData['type']);
        }

        $results = new DataTableResults();

        // Set Base query, which is used in later queries
        $baseQuery = $this->historyRepository->createQueryBuilder('h');

        if (isset($request->customData['type']) && !empty($request->customData['type'])) {
            $baseQuery->where('h.historyType = :historyType');
            $baseQuery->setParameter('historyType', $historyType);
        }

        // Total number of users.
        $query = clone $baseQuery;
        $query->select('COUNT(h.id)');
        $results->recordsTotal = $query->getQuery()->getSingleScalarResult();

        // Query to get requested entities.
        $query = clone $baseQuery;

        // Order.
        foreach ($request->order as $order) {
            // "ID" column
            if (0 == $order->column) {
                $query->addOrderBy('h.id', $order->dir);
            } // "Login" column
            elseif (1 == $order->column) {
                $query->addOrderBy('h.user', $order->dir);
            } // "Login" column
            elseif (2 == $order->column) {
                $query->addOrderBy('h.text', $order->dir);
            } // "Full name" column
            elseif (3 == $order->column) {
                $query->addOrderBy('h.createdAt', $order->dir);
            }
        }

        // Get filtered count.
        $queryCount = clone $query;
        $queryCount->select('COUNT(h.id)');
        $results->recordsFiltered = $queryCount->getQuery()->getSingleScalarResult();

        // Restrict results.
        $query->setMaxResults($request->length);
        $query->setFirstResult($request->start);

        /** @var \App\Entity\History[] $users */
        $rows = $query->getQuery()->getResult();

        $data = [];
        $i = 0;
        /** @var History $row */
        foreach ($rows as $row) {
            $data[$i] = [
                'id' => $row->getId(),
                'user' => $row->getUser()->getFirstName().' '.$row->getUser()->getLastName(),
                'text' => $this->translator->trans($row->getText()),
                'created_at' => $row->getCreatedAt()->format('d.m.Y H:i:s'),
            ];

            $data[$i]['entity'] = '';

            // get Entity
            /** @var HistoryType $rowHistoryType */
            $rowHistoryType = $row->getHistoryType();

            /** @var EntityRepository $entityRepository */
            $entityRepository = $this->entityManager->getRepository('App:'.$rowHistoryType->getName());
            if (null !== $entityRepository) {
                $entity = $entityRepository->find($row->getEntityId());
                if (null !== $entity && $entity instanceof HistoryInterface) {
                    $data[$i]['entity'] = $entity->getHistorySlug();
                }
            }

            ++$i;
        }

        $results->data = $data;

        return $results;
    }
}
