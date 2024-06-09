<?php

namespace App\Controller\Admin\Dashboard;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;


#[Route(path: '/admin/dashboard')]
class DashboardController extends AbstractController
{


    public function __construct()
    {
    }


    #[Route(path: '/', name: 'admin_dashboard')]
    public function indexDashoard()
    {
        /** @var User $user */
        $user = $this->getUser();

        // sum all orders
        return $this->render('admin/dashboard/index.html.twig');
        //return $this->redirectToRoute('security_login');
    }


//    #[Route(path: '/', name: 'admin')]
//    #[Route(path: '/', name: 'admin_index')]
//    public function index()
//    {
//        return $this->redirectToRoute('security_login');
//    }
}
