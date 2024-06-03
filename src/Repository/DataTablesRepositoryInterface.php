<?php


namespace App\Repository;

use Doctrine\ORM\QueryBuilder;

interface DataTablesRepositoryInterface
{
    public function getQueryForDataTables(): QueryBuilder;

}
