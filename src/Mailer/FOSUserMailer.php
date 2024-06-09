<?php

namespace App\Mailer;

use FOS\UserBundle\Model\UserInterface;
use FOS\UserBundle\Mailer\MailerInterface;
use Symfony\Component\Mailer\MailerInterface as SymfonyMailerInterface;
use Symfony\Component\Mime\Email;
use Twig\Environment;

class FOSUserMailer implements MailerInterface
{
    public function __construct(private readonly SymfonyMailerInterface $mailer, private readonly Environment $twig, private $fromEmail)
    {
    }

    public function sendConfirmationEmailMessage(UserInterface $user)
    {
        $template = 'emails/registration.html.twig';
        $url = 'http://your-url/confirm/' . $user->getConfirmationToken();
        $context = [
            'user' => $user,
            'confirmationUrl' => $url,
        ];

        $this->sendEmailMessage($template, $context, $user->getEmail());
    }

    public function sendResettingEmailMessage(UserInterface $user)
    {
        $template = 'emails/resetting.html.twig';
        $url = 'http://your-url/reset/' . $user->getConfirmationToken();
        $context = [
            'user' => $user,
            'confirmationUrl' => $url,
        ];

        $this->sendEmailMessage($template, $context, $user->getEmail());
    }

    private function sendEmailMessage($templateName, $context, $toEmail)
    {
        $body = $this->twig->render($templateName, $context);

        $email = (new Email())
            ->from($this->fromEmail)
            ->to($toEmail)
            ->subject('Subject here')
            ->html($body);

        $this->mailer->send($email);
    }
}
