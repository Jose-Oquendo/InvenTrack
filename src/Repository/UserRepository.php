<?php

namespace App\Repository;

use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\PasswordUpgraderInterface;
use Symfony\Component\PasswordHasher\Hasher\PasswordHasherFactory;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

/**
 * @extends ServiceEntityRepository<User>
* @implements PasswordUpgraderInterface<User>
 *
 * @method User|null find($id, $lockMode = null, $lockVersion = null)
 * @method User|null findOneBy(array $criteria, array $orderBy = null)
 * @method User[]    findAll()
 * @method User[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserRepository extends ServiceEntityRepository implements PasswordUpgraderInterface
{
    private $conn;
    private UserPasswordHasherInterface $hasher;

    public function __construct(ManagerRegistry $registry, UserPasswordHasherInterface $hasher)
    {
        parent::__construct($registry, User::class);
        $this->conn = $this->getEntityManager()->getConnection();
        $this->hasher = $hasher;
    }

    /**
     * Used to upgrade (rehash) the user's password automatically over time.
    */
    public function upgradePassword(PasswordAuthenticatedUserInterface $user, string $newHashedPassword): void
    {
        if (!$user instanceof User) {
            throw new UnsupportedUserException(sprintf('Instances of "%s" are not supported.', $user::class));
        }

        $user->setPassword($newHashedPassword);
        $this->getEntityManager()->persist($user);
        $this->getEntityManager()->flush();
    }

    public function addUser($data): ?User
    {
        $user = new User;
        $user->setName($data->name);
        $user->setEmail($data->email);
        $user->setUuid($data->ced);
        $user->setRoles($data->rol);
        $password = $this->hasher->hashPassword($user, $data->password);
        $this->upgradePassword($user, $password);

        return $user;
    }

    /**
    * @return User[] Returns an array of User objects
    */
   public function findUsers($data): array
   {
        $sql = 'SELECT email, name, roles, uuid  FROM user 
                    WHERE ( CAST(email AS CHAR) LIKE :txt or CAST(name AS CHAR) LIKE :txt or CAST(uuid AS CHAR) LIKE :txt)
                order by id ASC';
        $params = [
            'txt' => '%'.$data->txt.'%'
        ];
        $result = $this->conn->executeQuery($sql, $params);
        return $result->fetchAllAssociative();
   }

     /**
    * @return User[] Returns an array of User objects
    */
    public function getUser($data): array
    {
         $sql = 'SELECT email, name, roles, uuid 
                    FROM user 
                WHERE uuid = :user order by id ASC';
         $params = [
            'user' => $data->username
         ];
         $result = $this->conn->executeQuery($sql, $params);
         return $result->fetchAllAssociative();
    }

    /**
    * @return User[] Returns an array of User objects
    */
    public function editUser($data): array
    {
         $sql = 'UPDATE user set email = :email, name = :nam, roles = :rol 
                WHERE uuid = :ide returning *';
         $params = [
            'email' => $data->email,
            'nam' => $data->name,
            'rol' => json_encode($data->rol),
            'ide' => $data->ced
         ];
         $result = $this->conn->executeQuery($sql, $params);
         $response = $result->fetchAllAssociative();
         if(is_array($response)){
             return $response;
         } else {
             return [ ];
         }
 
    }

//    /**
//     * @return User[] Returns an array of User objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('u')
//            ->select('id, email, name, roles')
//            ->andWhere('u.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('u.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?User
//    {
//        return $this->createQueryBuilder('u')
//            ->andWhere('u.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
