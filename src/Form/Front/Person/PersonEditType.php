<?php

namespace App\Form\Front\Person;

use App\Entity\Memory;

use App\Entity\MemoryThema;
use App\Form\Front\BurialPlace\BurialPlaceType;
use App\Form\Front\Epitaph\EpitaphType;
use App\Form\Front\LinksMemory\LinksMemoryType;
use App\Form\Front\WordsMemory\WordsMemoryType;
use App\Repository\MemoryThemaRepository;
use App\Repository\RoleRepository;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Contracts\Translation\TranslatorInterface;

class PersonEditType extends AbstractType
{


    public function __construct(
        private readonly MemoryThemaRepository $memoryThemaRepository,
    )
    {
    }

    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('firstName', TextType::class, [
                'label' => 'label.person.firstName',
                'required' => true,
                'attr' => [
                    'class' => 'form-control required form-control-md',
                ]
            ])
            ->add('lastName', TextType::class, [
                'label' => 'label.person.lastName',
                'required' => true,
                'attr' => [
                    'class' => 'form-control required form-control-md',
                ]
            ])
            ->add('patronymic', TextType::class, [
                'label' => 'label.person.patronymic',
                'required' => true,
                'attr' => [
                    'class' => 'form-control required form-control-md',
                ]
            ])
            ->add('dateBirth', DateTimeType::class, [
                'required' => true,
                'widget' => 'single_text',
                'html5' => false,
                'format'=> 'dd.MM.yyyy',
                'attr' => [
                    'class' => 'js--datetimepicker form-control required form-control-md',
                ],
                'label' => 'label.person.dateBirth',
            ])
            ->add('dateDeads', DateTimeType::class, [
                'required' => true,
                'widget' => 'single_text',
                'html5' => false,
                'format'=> 'dd.MM.yyyy',
                'attr' => [
                    'class' => 'datepicker form-control required form-control-md',
                ],
                'label' => 'label.person.dateDeads',
            ])
            ->add('biography', TextareaType::class, [
                'required' => true,
                'attr' => [
                    'class' => 'form-control required form-control-md',
                    'rows' => 6,
                ],
                'label' => 'label.person.biography',
            ])
            ->add('epitaph', CollectionType::class, [
                'entry_type' => EpitaphType::class,
                'entry_options' => ['label' => false],
                'allow_add' => true,
                'by_reference' => false,
                'label' => false,
                'required' => false,
            ])
            ->add('wordsMemory', CollectionType::class, [
                'entry_type' => WordsMemoryType::class,
                'entry_options' => ['label' => false],
                'allow_add' => true,
               'by_reference' => false,
                'label' => false,
                'required' => false,
            ])
            ->add('burialPlace', CollectionType::class, [
                'entry_type' => BurialPlaceType::class,
                'entry_options' => ['label' => false],
                'allow_add' => true,
                'by_reference' => false,
                'label' => false,
                'required' => false,
            ])
            ->add('linksMemory', CollectionType::class, [
                'entry_type' => LinksMemoryType::class,
                'entry_options' => ['label' => false],
                'allow_add' => true,
                'by_reference' => false,
                'label' => false,
                'required' => false,
            ])
            ->add('thema', EntityType::class, [
                'class' => MemoryThema::class,
                'choices' => $this->memoryThemaRepository->findBy(['status' => true]),
                'choice_label' => function ($thema) {
                    return $thema->getThema();
                },
                'label' => 'label.person.thema',
                'expanded' => false,
                'multiple' => false,
                'attr' => [
                    'class' => 'form-control js--select-memory-thema form-control-md',
                ]
            ])
            ->add('politics', CheckboxType::class, [
                'mapped' => false,
                'label' => 'label.person.politics_agree',
                'data' => true,
                'required' => true,
                'attr' => [
                    'class' => 'required mx-2',
                ]
            ]);


    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Memory::class,
            'csrf_protection' => false,
        ]);
    }
}
