<?php

namespace App\Controller\Admin\User;

use App\Entity\User;

use App\Repository\UserRepository;

use Carbon\Carbon;
use Doctrine\ORM\EntityManagerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\String\Slugger\AsciiSlugger;
use Symfony\Contracts\Translation\TranslatorInterface;
use App\Form\Admin\User\UserCreateType;

#[Route(path: '/admin/user')]
#[Security("is_granted('ROLE_ADMIN')")]
class UserController extends AbstractController
{

    public function __construct(
        private readonly TranslatorInterface $translator,
        private EventDispatcherInterface     $eventDispatcher,
        private UserPasswordHasherInterface  $hasher,
        private EntityManagerInterface       $manager,
    ) {
    }

    /**
     * Lists all User entities.
     */
    #[Route(path: '/', name: 'admin_user_index', methods: ['GET'])]
    public function index(UserRepository $usersRepository): Response
    {
        //        $em = $this->manager;
        //        $em->getFilters()->enable('softdeleteable');
        //        $users = $usersRepository->softDeletesFilter(true)->findAll();

        return $this->render('admin/user/index.html.twig');
    }

    /**
     * Creates a new User entity.
     */
    #[Route(path: '/new', name: 'admin_user_new', methods: ['GET', 'POST'])]
    #[IsGranted('ROLE_ADMIN')]
    public function new(Request $request, ?User $user): Response
    {
        /** @var User $currentUser */
        $currentUser = $this->getUser();

        $user = new User();



        $form = $this->createForm(UserCreateType::class, $user);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            $postData = $request->getPayload()->all();

            $user->setPassword($this->hasher->hashPassword($user, $form->get('newPassword')->getData()));

            $this->manager->persist($user);
            $this->manager->flush();

            $this->manager->flush();
            // See https://symfony.com/doc/current/book/controller.html#flash-messages
            $this->addFlash('success', $this->translator->trans('user.created_successfully'));

            return $this->redirectToRoute('admin_user_index');
        }


        return $this->render('admin/user/new.html.twig', [
            'user' => $user,
            'form' => $form->createView(),
        ]);
    }


    /**
     * Displays a form to edit an existing User entity.
     */
    #[Route(path: '/edit/{id<\d+>}', name: 'admin_user_edit', methods: ['GET', 'POST'])]
    #[IsGranted('ROLE_ADMIN')]
    public function edit(Request $request, User $user, SerializerInterface $serializer): Response
    {

        $form = $this->createForm(UserCreateType::class, $user);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            if (null !== $form->get('newPassword')->getData()) {
                $user->setPassword($this->hasher->hashPassword($user, $form->get('newPassword')->getData()));
            }

            $this->manager->flush();

            $this->addFlash('success', $this->translator->trans('user.updated_successfully'));

           // return $this->redirectToRoute('admin_user_edit', ['id' => $user->getId()]);
            return $this->redirectToRoute('admin_user_index');
        }


        return $this->render('admin/user/edit.html.twig', [
            'user' => $user,
            'form' => $form->createView(),
        ]);
    }


    /**
     * Deletes a User entity.
     */
    #[Route(path: '/{id}/delete', name: 'admin_user_delete', methods: ['POST', 'GET'])]
    #[IsGranted('ROLE_ADMIN')]
    public function delete(User $user): Response
    {

        $this->manager->remove($user);
        $this->manager->flush();

        $this->addFlash('success', $this->translator->trans('user.deleted_successfully'));

        return $this->redirectToRoute('admin_user_index');
    }


}
