<?php

namespace App\Controller;

use App\Entity\User;
use App\Event\SecurityPasswordResetEvent;
use App\Form\Security\PasswordResetEmailType;
use App\Form\Security\PasswordResetType;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Symfony\Contracts\Translation\TranslatorInterface;

/**
 * Controller used to manage the application security.
 * See https://symfony.com/doc/current/cookbook/security/form_login_setup.html.
 */
class SecurityController extends AbstractController
{

    /**
     * SecurityController constructor.
     */
    public function __construct(
        private readonly UserRepository              $userRepository,
        private readonly TranslatorInterface         $translator,
        private readonly UserPasswordHasherInterface $hasher,
        private readonly EntityManagerInterface      $manager,
        private readonly EventDispatcherInterface    $eventDispatcher,
        private readonly Security                    $security
    )
    {

    }

    #[Route(path: '/login', name: 'security_login')]
    public function login(AuthenticationUtils $helper): Response
    {
        dump($helper);
        return $this->render('security/login.html.twig', [
            // last username entered by the user (if any)
            'last_username' => $helper->getLastUsername(),
            // last authentication error (if any)
            'error' => $helper->getLastAuthenticationError(),
        ]);
    }

    #[Route(path: '/login-redirect', name: 'security_login_redirect')]
    public function loginRedirect(): Response
    {
        if (!$this->security->isGranted('IS_AUTHENTICATED_FULLY')) {
            return $this->redirectToRoute('security_login');
            // throw $this->createAccessDeniedException();
        }
        if ($this->security->isGranted('ROLE_MANAGER')) {
            return $this->redirectToRoute('admin_dashboard');
        } elseif ($this->security->isGranted('ROLE_MEMBER')) {
            return $this->redirectToRoute('admin_dashboard');
        } else {
            return $this->redirectToRoute('admin_dashboard');
        }
    }

    /**
     * This is the route the user can use to logout.
     *
     * But, this will never be executed. Symfony will intercept this first
     * and handle the logout automatically. See logout in config/packages/security.yaml
     */
    #[Route(path: '/logout', name: 'security_logout')]
    public function logout(): void
    {
        throw new \Exception('This should never be reached!');
    }

    /**
     * @throws \Exception
     */
    #[Route(path: '/reset-credential', methods: ['GET', 'POST'], name: 'security_reset_password')]
    public function resetPassword(Request $request): Response
    {
        // $user = $this->getUser();

        $form = $this->createForm(PasswordResetEmailType::class);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $data = $form->getData();

            if (empty($data['username'])) {
                $this->addFlash('danger', $this->translator->trans('security.username_empty'));

                return $this->redirectToRoute('security_reset_password');
            }

            $user = $this->userRepository->findOneBy([
                'username' => $data['username'],
            ]);

            if (null !== $user) {
                $dateInterval = new \DateInterval('PT2H');
                $user->generateResetToken($dateInterval);
                $this->manager->flush();

                // UserCreatedEvent is called
                $event = new SecurityPasswordResetEvent($user);

                // See https://symfony.com/doc/current/components/event_dispatcher.html
                $this->eventDispatcher->dispatch($event);

                $this->addFlash('success', $this->translator->trans('security.password_reset_email_send'));
            }

            return $this->redirectToRoute('security_reset_password');
        }

        return $this->render('security/password_reset.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    #[Route(path: '/reset-credential/{token}', methods: ['GET', 'POST'], name: 'security_reset_password_token')]
    public function resetPasswordToken(Request $request): Response
    {
        $token = $request->get('token');

        if (null !== $token) {
            // Check if Token is available
            /** @var User $user */
            $user = $this->userRepository->findOneBy([
                'resetToken' => $request->get('token'),
            ]);

            if (null !== $user && false != $user->isResetTokenValid($token)) {
                $form = $this->createForm(PasswordResetType::class);
                $form->handleRequest($request);

                if ($form->isSubmitted() && $form->isValid()) {
                    $user->setPassword($this->hasher->hashPassword($user, $form->get('newPassword')->getData()));
                    $user->clearResetToken();

                    $this->manager->flush();

                    $this->addFlash('success', $this->translator->trans('security.password_changed'));

                    return $this->redirectToRoute('security_login');
                }

                return $this->render('security/password_reset.html.twig', [
                    'form' => $form->createView(),
                ]);
            }
        }

        return $this->redirectToRoute('security_login');
    }
}
