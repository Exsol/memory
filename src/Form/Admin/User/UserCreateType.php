<?php

namespace App\Form\Admin\User;

use App\Entity\Role;
use App\Entity\User;
use App\Repository\RoleRepository;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Contracts\Translation\TranslatorInterface;

class UserCreateType extends AbstractType
{



    public function __construct(
        private readonly TranslatorInterface $translator,
        private readonly RoleRepository $roleRepository,
    ) {
    }

    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('username', TextType::class, [
                'label' => 'label.username',
                'attr' => [
                    'class' => 'form-control form-control-md',
                ]
            ])
            ->add('firstName', TextType::class, [
                'label' => 'label.firstName',
                'attr' => [
                    'class' => 'form-control form-control-md',
                ]
            ])
            ->add('lastName', TextType::class, [
                'label' => 'label.lastName',
                'attr' => [
                    'class' => 'form-control form-control-md',
                ]
            ])
            ->add('email', EmailType::class, [
                'label' => 'label.email',
                'attr' => [
                    'class' => 'form-control form-control-md',
                ]
            ])
            ->add('role', EntityType::class, [
                'class' => Role::class,
                'choices' => $this->roleRepository->findAllSelectable(),
                'choice_label' => function ($role) {
                    return $this->translator->trans('label.'.strtolower($role->getName()));
                },
                'choice_translation_domain' => 'messages',
                'label' => 'label.roles',
                'expanded' => false,
                'multiple' => false,
                'attr' => [
                    'class' => 'form-control form-control-md',
                ]
            ])
            ->add('newPassword', RepeatedType::class, [
                'type' => PasswordType::class,
                'constraints' => [
                    new NotBlank(),
                    new Length([
                        'min' => 5,
                        'max' => 20,
                    ]),
                ],
                'mapped' => false,
                'first_options' => [
                    'label' => 'label.new_password',
                    'attr' => [
                        'class' => 'form-control form-control-md',
                    ],
                    'row_attr' => [
                        'class' => 'col-md-6',
                    ],
                ],
                'second_options' => [
                    'label' => 'label.new_password_confirm',
                    'attr' => [
                        'class' => 'form-control form-control-md',
                    ],
                    'row_attr' => [
                        'class' => 'col-md-6',
                    ],
                ],

            ]);


//            ->add('accessRoles', EntityType::class, [ // add this
//                'class' => Role::class,
//                'label' => 'label.access_roles',
//                'required' => false,
//                'expanded' => false,
//                'multiple' => true,
//                'choice_label' => function (Role $role) {
//                    return $role->getName();
//                },
//                'choices' => $this->roleRepository->findAll(),
//                'attr' => [
//                    'class' => 'select2 form-control is--role',
//                ],
//            ]);


    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }
}
