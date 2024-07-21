<?php

namespace App\Handler\DataTables;

use App\Utils\CaseConverter;
use DataTables\AbstractDataTableHandler;
use DataTables\DataTableQuery;
use DataTables\DataTableResults;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\QueryBuilder;

class BaseDataTable extends AbstractDataTableHandler
{
    public const ID = 'base';

    /**
     * @var EntityManagerInterface
     */
    private $entityManager;

    /**
     * @var CaseConverter
     */
    private $caseConverter;

    /**
     * Dependency Injection constructor.
     */
    public function __construct(
        EntityManagerInterface $entityManager,
        CaseConverter $caseConverter
    ) {
        $this->entityManager = $entityManager;
        $this->caseConverter = $caseConverter;
    }

    public function handle(DataTableQuery $request, $baseQuery = null, $configArray = []): DataTableResults
    {
        $datatablesRequest = $request->customData['datatables'];
        $repository = $datatablesRequest['repository'];
        $results = new DataTableResults();
        $excludeFieldsFromSearch = $datatablesRequest['excludeFieldsFromSearch'] ?? [];
        $joinFieldsFromSearch = $datatablesRequest['joinFields'] ?? [];
        $repositoryMethod = $datatablesRequest['repositoryMethod'] ?? null;

        /* @var QueryBuilder $baseQuery */
        if (!empty($repositoryMethod)) {
            $baseQuery = $repository->$repositoryMethod();
        } else {
            $baseQuery = $repository->getQueryForDataTables();
        }

        // Entity Identifier
        $id = $this->entityManager->getClassMetadata($repository->getClassName())->getSingleIdentifierFieldName();

        $dbColumns = array_unique($this->pluck($datatablesRequest['columns'], 'db'));

        // Total number of posts.
        $query = clone $baseQuery;
        $query->select('COUNT(dt.'.$id.')');
        $results->recordsTotal = $query->getQuery()->getSingleScalarResult();

        // Query to get requested entities.
        $query = clone $baseQuery;

        // Search.
        if ('' !== $request->search->value && '0' !== $request->search->value) {
            $searchQuery = [];
            foreach ($dbColumns as $dbColumn) {
                if (!in_array($dbColumn, $excludeFieldsFromSearch) || in_array($dbColumn, $joinFieldsFromSearch)) {
                    $searchQuery[] = 'LOWER(dt.'.$this->caseConverter->snakeToCamelCase($dbColumn).') LIKE :search';
                }
            }

            $js = 0;
            $joinColumnSearch = [];
            foreach ($joinFieldsFromSearch as $joinField) {
                $value = strtolower($request->search->value);
                if ($value && in_array($joinField['tableName'], $dbColumns)) {
                    $alias = 'js'.$js;
                    foreach ($joinField['fields'] as $fieldName => $fieldType) {
                        if ('integer' == $fieldType) {
                            $value = (int) $value;
                            $joinColumnSearch[] = "LOWER($alias.{$this->caseConverter->snakeToCamelCase($fieldName)}) = :search";
                        } else {
                            $value = "%{$value}%";
                            $joinColumnSearch[] = "LOWER($alias.{$this->caseConverter->snakeToCamelCase($fieldName)}) LIKE :search";
                        }
                    }

                    $query->leftJoin('dt.'.$this->caseConverter->snakeToCamelCase($joinField['tableName']), $alias);

                    ++$js;
                }
            }

            $query->andWhere(implode(' OR ', array_merge($searchQuery, $joinColumnSearch)));
            $query->setParameter('search', strtolower("%{$request->search->value}%"));
        }

        // Filter by columns.
        $jc = 0;
        $c = 0;
        $joinFields = [];

        foreach ($joinFieldsFromSearch as $joinField) {
            $joinFields[] = $joinField['tableName'];
        }

        foreach ($request->columns as $column) {
            $columnValue = strtolower($column->search->value);

            if (!empty($columnValue)) {
                if (!in_array($column->data, $excludeFieldsFromSearch) && !in_array($column->data, $joinFields)) {
                    if (in_array($column->data, $dbColumns)) {
                        if ('id' == $column->data) {
                            $columnValue = (int) $columnValue;
                            $columnWhere = "dt.{$this->caseConverter->snakeToCamelCase($column->data)} = :value$c";
                        } else {
                            $columnValue = "%{$columnValue}%";
                            $columnWhere = "dt.{$this->caseConverter->snakeToCamelCase($column->data)} LIKE :value$c";
                        }
                        $query->andWhere($columnWhere);
                        $query->setParameter("value$c", $columnValue);
                    }
                } elseif (in_array($column->data, $joinFields)) {
                    $alias = 'jc'.$c;
                    $joinColumnWhere = [];
                    foreach ($joinFieldsFromSearch as $joinField) {
                        if ($column->data == $joinField['tableName']) {
                            $f = 0;
                            $columnValues = [];
                            foreach ($joinField['fields'] as $fieldName => $fieldType) {
                                if ('integer' == $fieldType) {
                                    $columnValues[$f] = (int) $columnValue;
                                    $joinColumnWhere[$f] = "LOWER($alias.{$this->caseConverter->snakeToCamelCase($fieldName)}) = :value{$c}{$f}";
                                } else {
                                    $columnValues[$f] = "%{$columnValue}%";
                                    $joinColumnWhere[$f] = "LOWER($alias.{$this->caseConverter->snakeToCamelCase($fieldName)}) LIKE :value{$c}{$f}";
                                }
                                ++$f;
                            }

                            $query->leftJoin('dt.'.$this->caseConverter->snakeToCamelCase($joinField['tableName']), $alias)
                                ->andWhere(implode(' OR ', $joinColumnWhere));
                            foreach ($columnValues as $key => $columnValue) {
                                $query->setParameter("value{$c}{$key}", $columnValue);
                            }
                        }
                    }
                }
            }

            ++$c;
        }

        // Order.
        foreach ($request->order as $order) {
            $orderColumn = $request->columns[$order->column];
            if (in_array($orderColumn->data, $dbColumns)) {
                $query->addOrderBy('dt.'.$this->caseConverter->snakeToCamelCase($orderColumn->data), $order->dir);
            }
        }

        // Get filtered count.
        $queryCount = clone $query;
        $queryCount->select('COUNT(dt.'.$id.')');
        $results->recordsFiltered = $queryCount->getQuery()->getSingleScalarResult();

        // Restrict results.
        $query->setMaxResults($request->length);
        $query->setFirstResult($request->start);

        foreach ($query->getQuery()->getResult() as $row) {
            $resultData = [$id => $row->getId()];
            foreach ($dbColumns as $dbColumn) {
                $resultData[$dbColumn] = $row->{'get'.$this->caseConverter->snakeToCamelCase($dbColumn, false)}();
            }
            $results->data[] = $resultData;
        }

        $results->data = $this->dataOutput($datatablesRequest['columns'], $results->data);

        return $results;
    }

    /**
     * Create the data output array for the DataTables rows.
     *
     * @param array $columns Column information array
     * @param array $data    Data from the SQL get
     *
     * @return array Formatted data in a row based format
     */
    public function dataOutput($columns, $data)
    {
        $out = [];

        foreach ($data as $i => $singleData) {
            $row = [];
            foreach ($columns as $j => $column) {
                $column = $column;
                // Is there a formatter?
                if (isset($column['formatter'])) {
                    $row[$column['dt']] = $column['formatter']($singleData[$column['db']], $singleData);
                } else {
                    $row[$column['dt']] = $singleData[$column['db']];
                }
            }
            $out[] = $row;
        }

        return $out;
    }

    /**
     * Pull a particular property from each assoc. array in a numeric array,
     * returning and array of the property values from each item.
     *
     * @param array  $a    Array to get data from
     * @param string $prop Property to read
     *
     * @return array Array of property values
     */
    public function pluck($a, $prop)
    {
        $out = [];

        foreach ($a as $i => $singleA) {
            $out[] = $singleA[$prop];
        }

        return $out;
    }

    /**
     * Return a string from an array or a string.
     *
     * @param array|string $a    Array to join
     * @param string       $join Glue for the concatenation
     *
     * @return string Joined string
     */
    public function flatten($a, $join = ' AND ')
    {
        if (!$a) {
            return '';
        } elseif ($a && is_array($a)) {
            return implode($join, $a);
        }

        return $a;
    }
}
