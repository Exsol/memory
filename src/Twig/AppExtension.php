<?php

namespace App\Twig;

use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\Security\Core\Authentication\Token\SwitchUserToken;
use Symfony\Component\Security\Core\User\UserInterface;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

/**
 * This Twig extension adds a new 'md2html' filter to easily transform Markdown
 * contents into HTML contents inside Twig templates.
 *
 * See https://symfony.com/doc/current/cookbook/templating/twig_extension.html
 *
 */
class AppExtension extends AbstractExtension
{
//    /**
//     * @var string
//     */
//    private $appName;


    public function __construct(
       // string $appName,
        private readonly string $appName,
        private readonly Security $security

    ) {
        //$this->appName = $appName;
    }


    public function getFunctions(): array
    {
        return [
            new TwigFunction('app_name', function (): string {
                return $this->getAppName();
            }),
            new TwigFunction('getImpersonatorUser', function (): ?UserInterface {
                return $this->getImpersonatorUser();
            }),

        ];
    }


    public function getAppName(): string
    {
        return $this->appName;
    }

    public function getImpersonatorUser(): ?UserInterface
    {
        $token = $this->security->getToken();

        if ($token instanceof SwitchUserToken) {
            return $token->getOriginalToken()->getUser();
        }

        return null;
    }


}
