<?php

namespace App\Form\Front\Epitaph;

use App\Entity\Epitaph;
use App\Repository\RoleRepository;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Contracts\Translation\TranslatorInterface;

class EpitaphType extends AbstractType
{



    public function __construct(
        private readonly TranslatorInterface $translator,
        private readonly RoleRepository $roleRepository,
    ) {
    }

    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('text', TextareaType::class, [
                'label' => 'label.epitaph.text',
                'required' => false,
                'attr' => [
                    'class' => 'form-control required form-control-md',
                    'row' => '6'
                ]
            ])

            ->add('sub_text', TextareaType::class, [
                'label' => 'label.epitaph.sub_text',
                'required' => false,
                'attr' => [
                    'class' => 'form-control  form-control-md',
                    'row' => '2'
                ]
            ]);








    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Epitaph::class,
        ]);
    }
}
