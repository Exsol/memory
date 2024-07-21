<?php

namespace App\Form\Admin\QrCode;

use App\Entity\QrCode;
use App\Repository\QrCodeRepository;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Callback;
use Symfony\Component\Validator\Constraints\Unique;
use Symfony\Component\Validator\Context\ExecutionContextInterface;

class QrCodeEditType extends AbstractType
{
    public function __construct(
        private readonly QrCodeRepository $qrCodeRepository
    ) {
    }

    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('label', TextType::class, [
                'label' => 'label.qr_code_label',
                'attr' => [
                    'class' => 'form-control form-control-md',
                ],
                'constraints'        => [
                    new Callback([
                        'callback' => [$this, 'checkEmails'],
                    ]),
                ]
            ]);

    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => QrCode::class,
        ]);
    }


    public function checkEmails($data, ExecutionContextInterface $context)
    {
        $email = $data;
        dump($email);
        if ($this->qrCodeRepository->checkLabel($email)) {
            $context->addViolation($this->translator->trans('qrcode.label_is_most_be_unique'));
        }
    }
}
