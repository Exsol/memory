<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Controller for Homepage.
 */
#[Route(path: '/error')]
class ErrorController extends AbstractController
{
    #[Route(path: '/', name: '404_error', methods: ['GET'])]
    public function index(): Response
    {

        return $this->render('frontend/error/index.html.twig');
    }
}
