<?php

namespace App\Repository;

use Doctrine\DBAL\Connection;

class MyService
{
    private Connection $connection;

    public function __construct(Connection $connection)
    {
        $this->connection = $connection;
    }

    public function findUsersByCustomQuery()
    {
        $sql = 'SELECT * FROM user WHERE created_at > :date';
        $stmt = $this->connection->prepare($sql);
        $stmt->bindValue('date', new \DateTime('-1 month'));
        $stmt->execute();

        return $stmt->fetchAll();
    }
}