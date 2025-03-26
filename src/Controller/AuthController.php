<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use App\Repository\Mail;
use Error;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Security\Core\Security;
// use Symfony\Bundle\SecurityBundle\Security;

use Symfony\Component\Security\Http\Attribute\CurrentUser;

class AuthController extends AbstractController
{
    private $security;
    private $userRepository;
    private $serializer;

    public function __construct(
        UserRepository $userRepository,
        Security $security,
        SerializerInterface $serializer,
    ){
        $this->userRepository = $userRepository;
        $this->security = $security;
        $this->serializer = $serializer;
    }

    #[Route('/auth/create', name: 'app_auth_create', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        // $this->ValidateRequestToken($_SERVER['HTTP_AUTHORIZATION']);
        $jsonData = json_decode($request->getContent());
        $user = $this->userRepository->addUser($jsonData);
        return new JsonResponse([
            'msg' => 'Registro exitoso',
            'user' => $this->serializer->serialize($user, 'json')
        ], 201);
    }

    #[Route('/auth/users/search', name: 'app_user_search', methods: ['POST'])]
    public function search(Request $request): JsonResponse
    {
        // $this->ValidateRequestToken($_SERVER['HTTP_AUTHORIZATION']);
        $jsonData = json_decode($request->getContent());
        $users = $this->userRepository->findUsers($jsonData );
        return new JsonResponse([
            'msg' => 'Registro exitoso',
            'user' => $this->serializer->serialize($users, 'json')
        ], 200);
    }

    #[Route('/auth/users/edit', name: 'app_user_edit')]
    public function edit(Request $request): JsonResponse
    {
        // $this->ValidateRequestToken($_SERVER['HTTP_AUTHORIZATION']);
        $jsonData = json_decode($request->getContent());
        $user = $this->userRepository->editUser($jsonData);
        return new JsonResponse([
            'msg' => 'Registro exitoso',
            'user' => $this->serializer->serialize($user, 'json')
        ], 200);
    }

    #[Route('/auth/users/in', name: 'app_user', methods: ['POST'])]
    public function user(Request $request): JsonResponse
    {
        // $this->ValidateRequestToken($_SERVER['HTTP_AUTHORIZATION']);
        $jsonData = json_decode($request->getContent());
        $user = $this->userRepository->getUser($jsonData);
        return new JsonResponse([
            'user' => $this->serializer->serialize($user, 'json', ['json_encode_options' => \JSON_PRESERVE_ZERO_FRACTION])
        ], 200);
    }

    #[Route('/auth/password', name: 'app_restore', methods: ['POST'])]
    public function passRestore(MailerInterface $mailer, Request $request): JsonResponse
    {
        $mail = new Mail();
        $jsonData = json_decode($request->getContent());
        $user = $mail->sendEmail($mailer, $jsonData);
        return new JsonResponse([
            'user' => 'OK',
            'message' => $user->getContent()
        ], 200);
    }
}
