<?php
namespace App\Security;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Http\Authentication\AuthenticationFailureHandlerInterface;
use Symfony\Component\HttpFoundation\Request;

class LoginFailureHandler implements AuthenticationFailureHandlerInterface
{
    public function onAuthenticationFailure(Request $request, \Exception $exception): JsonResponse
    {
        return new JsonResponse([
            'message' => 'Login failed',
            'error' => $exception->getMessage(),
            'error_code' => 'AUTH_FAILURE', // Código de error personalizado
        ], Response::HTTP_UNAUTHORIZED);
    }
}
?>