<?php

namespace App\Form\Front\BurialPlace;

use App\Entity\BurialPlace;
use App\Entity\Epitaph;
use App\Repository\RoleRepository;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Contracts\Translation\TranslatorInterface;

class BurialPlaceType extends AbstractType
{



    public function __construct(

    ) {
    }

    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('adress', TextType::class, [
                'label' => 'label.burialPlace.adress',
                'required' => false,
                'attr' => [
                    'class' => 'form-control form-control-md'
                ]
            ])

            ->add('lat', HiddenType::class, [
                'label' => 'label.burialPlace.lat',
                'required' => false,
                'attr' => [
                    'class' => 'form-control lat form-control-md',
                    'row' => '2'
                ]
            ])
            ->add('lng', HiddenType::class, [
                'label' => 'label.burialPlace.lng',
                'required' => false,
                'attr' => [
                    'class' => 'form-control lng form-control-md',
                    'row' => '2'
                ]
            ])

        ;








    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => BurialPlace::class,
        ]);
    }
}
