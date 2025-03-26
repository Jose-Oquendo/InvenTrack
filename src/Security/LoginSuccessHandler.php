<?php
namespace App\Security;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Http\Authentication\AuthenticationSuccessHandlerInterface;
use Symfony\Component\HttpFoundation\Request;

class LoginSuccessHandler implements AuthenticationSuccessHandlerInterface
{
    public function onAuthenticationSuccess(Request $request, TokenInterface $token): JsonResponse
    {
        // Generar un token de sesión o usar cualquier dato relevante
        $sessionToken = bin2hex(random_bytes(32)); // Ejemplo de generación de token

        // Puedes almacenar el token en la base de datos o usar sesiones aquí si es necesario

        return new JsonResponse([
            'message' => 'Login successful',
            'user' => [
                'uuid' => $token->getUser()->getUserIdentifier(),
                'email' => $token->getUser()->getEmail(),
                'roles' => $token->getUser()->getRoles(),
            ],
            'session_token' => $sessionToken, // Token retornado al cliente para usarlo
        ], Response::HTTP_OK);
    }
}

?>