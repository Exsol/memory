<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Controller for Homepage.
 */
#[Route(path: '/')]
class HomeController extends AbstractController
{

    public function __construct(
        private readonly Security $security
    )
    {

    }

    #[Route(path: '/', name: 'homepage', methods: ['GET'])]
    public function index(): Response
    {

        if ($this->security->isGranted('ROLE_MEMBER')) {
            return $this->redirectToRoute('edit_person_list');
        }else{
            return $this->redirectToRoute('404_error');
        }

        //return $this->redirectToRoute('security_login');
        //return $this->render('home/index.html.twig');
    }
}
