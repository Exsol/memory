<?php

namespace App\Form\Front\LinksMemory;

use App\Entity\Epitaph;
use App\Entity\LinksMemory;
use App\Entity\WordsMemory;
use App\Repository\RoleRepository;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Contracts\Translation\TranslatorInterface;

class LinksMemoryType extends AbstractType
{



    public function __construct(
    ) {
    }

    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('link', TextType::class, [
                'label' => 'label.linksMemory.link',
                'required' => true,
                'attr' => [
                    'class' => 'form-control required form-control-md',
                ]
            ])

            ->add('linkText', TextType::class, [
                'label' => 'label.linksMemory.linkText',
                'required' => false,
                'attr' => [
                    'class' => 'form-control  form-control-md',
                ]
            ]);








    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => LinksMemory::class,
        ]);
    }
}
