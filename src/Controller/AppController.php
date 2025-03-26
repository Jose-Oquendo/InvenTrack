<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AppController extends AbstractController
{
    #[Route('/', name: 'app_inventack')]
    public function index(): Response
    {
        return $this->render('base.html.twig', [
            'controller_name' => 'AppController',
        ]);
    }

    #[Route('/api/consult', name: 'app_search')]
    public function search(): Response
    {   
        return new Response(json_encode(array([
            'numero de documento' => 15,
            'nombre' => 'Juan',
            'edad' => 18
        ])));
    }

    #[Route('/not-found', name: 'not_found')]
    public function noPatch(): Response
    {
        return new Response(
            '<html>
                <body>
                    La pagina a la que intenta ingresar no existe :(
                </body>
            </html>'
        );
    }
}
