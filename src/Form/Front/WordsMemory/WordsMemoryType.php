<?php

namespace App\Form\Front\WordsMemory;

use App\Entity\Epitaph;
use App\Entity\WordsMemory;
use App\Repository\RoleRepository;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Contracts\Translation\TranslatorInterface;

class WordsMemoryType extends AbstractType
{



    public function __construct(
    ) {
    }

    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('words', TextareaType::class, [
                'label' => 'label.WordsMemory.words',
                'required' => true,
                'attr' => [
                    'class' => 'form-control required form-control-md',
                    'row' => '6'
                ]
            ])

            ->add('fromPeople', TextareaType::class, [
                'label' => 'label.WordsMemory.fromPeople',
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
            'data_class' => WordsMemory::class,
        ]);
    }
}
