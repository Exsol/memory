<?php
namespace App\Security\Authentication;

use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Http\Authentication\AuthenticationSuccessHandlerInterface;

class AuthenticationSuccessHandler implements AuthenticationSuccessHandlerInterface
{

    public function __construct(
        private readonly UrlGeneratorInterface $urlGenerator,
        private readonly Security $security
    )
    {
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token): RedirectResponse
    {
        return new RedirectResponse( $this->urlGenerator->generate('edit_person_list'));
        //return new JsonResponse(['apiToken' => $userApiToken]);
    }
}