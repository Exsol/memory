<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Controller for Homepage.
 */
#[Route(path: '/')]
class HomeController extends AbstractController
{
    #[Route(path: '/', name: 'homepage', methods: ['GET'])]
    public function index(): Response
    {
        return $this->redirectToRoute('security_login');
        //return $this->render('home/index.html.twig');
    }
}
