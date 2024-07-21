<?php

namespace App\Controller\Front\Person;

use App\Entity\Client;
use App\Entity\Memory;
use App\Entity\QrCode;
use App\Entity\User;

use App\Form\Front\Person\PersonCreateType;
use App\Form\Front\Person\PersonEditType;
use App\Notifier\CustomLoginLinkNotification;
use App\Repository\ClientRepository;
use App\Repository\QrCodeRepository;
use App\Repository\RoleRepository;
use App\Repository\StatusQrCodeRepository;
use App\Repository\UserRepository;
use App\Service\PersonService;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\EntityManagerInterface;
use Ramsey\Uuid\Uuid;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\Notifier\NotifierInterface;
use Symfony\Component\Notifier\Recipient\Recipient;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\LoginLink\LoginLinkHandlerInterface;
use Symfony\Component\Security\Http\LoginLink\LoginLinkNotification;
use Symfony\Contracts\Translation\TranslatorInterface;


#[Route(path: '/person')]
class PersonController extends AbstractController
{


    public function __construct(
        private readonly QrCodeRepository                        $qrCodeRepository,
        private readonly PersonService                           $personService,
        private readonly TranslatorInterface                     $translator,
        private readonly UserPasswordHasherInterface             $userPasswordEncoder,
        private readonly UserRepository                          $userRepository,
        private readonly RoleRepository                          $roleRepository,
        private readonly EntityManagerInterface                  $entityManager,
        private readonly StatusQrCodeRepository                  $statusQrCodeRepository,
        private readonly \Symfony\Bundle\SecurityBundle\Security $security
    )
    {
    }


    #[Route(path: '/code/{uuid}', name: 'person_code', options: ['expose' => true], methods: ['GET', 'POST'])]
    public function indexCode(Request $request, string $uuid): Response
    {

        $qrCode = $this->qrCodeRepository->findOneBy(['uuid' => $uuid]);

        if ($qrCode !== null) {


            if ($qrCode->getStatus()->getName() === 'printed') {

                $memory = new Memory();

                $form = $this->createForm(PersonCreateType::class, $memory);

                $form->handleRequest($request);

                if ($form->isSubmitted() && $form->isValid()) {

                    $payload = $request->getPayload()->all();

                    $uploadFiles = $request->files->get('files');

                    $email = $payload['person_create']['emailClient']['first'];

                    //create Client and Set Client
                    $user = $this->userRepository->findOneBy(['email' => $email]);


                    if ($user === null) {

                        $user = new User();

                        $user->setEmail($email);

                        $userName = explode('@', $email);

                        $userName = strtolower($userName[0]);

                        $user->setUsername($userName);

                        $role = $this->roleRepository->findOneBy(['name' => 'ROLE_MEMBER']);
                        $user->setRole($role);

                        $user->setPassword($this->userPasswordEncoder->hashPassword($user, Uuid::uuid4()));

                        $user->addQrCodeClient($qrCode);

                        $this->entityManager->persist($user);

                    }
                    $memory->setClient($user);

                    //set to QrCode Entity
                    $qrCode->setMemory($memory);

                    //set userQrCode to QrCode Entity
                    $user->addQrCodeClient($qrCode);

                    //change status to public
                    $qrCodeStatus = $this->statusQrCodeRepository->findOneBy(['name' => 'public']);

                    $qrCode->setStatus($qrCodeStatus);

                    //persist
                    $this->entityManager->persist($memory);


                    //set main_photo
                    //create PhotoArhive and set PhotoArhive
                    $this->personService->uploadAttachments($memory, $uploadFiles);

                    //flush
                    $this->entityManager->flush();

                    return new JsonResponse(['success' => true]);

                }
                return $this->render('frontend/person/index.html.twig', [
                    'form' => $form->createView(),
                    'uuid' => $uuid,
                ]);


            } elseif ($qrCode->getStatus()->getName() === 'public') {
                return $this->render('frontend/person/data.html.twig', [
                    'memory' => $qrCode->getMemory(),
                    'uuid' => $uuid
                ]);
            } else {
                return $this->render('frontend/error/index.html.twig');
            }


            // return $this->render('frontend/person/index.html.twig');


        } else {
            return $this->render('frontend/error/index.html.twig');
        }


    }


    #[Route('/get-edit-person-link/{uuid}', name: 'person_code_edit_link', options: ['expose' => true], methods: ['GET', 'POST'])]
    public function requestLoginLink(NotifierInterface $notifier, LoginLinkHandlerInterface $loginLinkHandler, UserRepository $userRepository, Request $request, string $uuid): JsonResponse
    {

        if ($request->isMethod('POST')) {

            $qrCode = $this->qrCodeRepository->findOneBy(['uuid' => $uuid]);

            if ($qrCode === null) {
                return new JsonResponse(['success' => false]);
            }


            $email = $qrCode->getClient()->getEmail();

            $user = $userRepository->findOneBy(['email' => $email]);

            $loginLinkDetails = $loginLinkHandler->createLoginLink($user);

            // create a notification based on the login link details
            $notification = new CustomLoginLinkNotification(
                $loginLinkDetails,
                $this->translator->trans('person.mail.link_edit') // email subject
            );


            // create a recipient for this user
            $recipient = new Recipient($user->getEmail());

            // send the notification to the user
            $notifier->send($notification, $recipient);


        }

        return new JsonResponse(['success' => true]);

    }

//    #[Security("is_granted('ROLE_MEMBER')")]
    #[Route(path: '/edit', name: 'edit_person_list', methods: ['GET', 'POST'])]
    public function editList(): Response
    {
        /** @var User $currentUser */
        $currentUser = $this->getUser();

        dump($currentUser);

        if ($currentUser === null) {
            return $this->render('frontend/error/index.html.twig');
        }

        $qrCodes = $currentUser->getQrCodeClient();

        //dump($qrCodes[0]);

        return $this->render('frontend/person/list_data.html.twig', [
            'qrCodes' => $qrCodes
        ]);

    }

    #[Route(path: '/edit/code/{uuid}', name: 'edit_person_page', options: ['expose' => true], methods: ['GET', 'POST'])]
    public function indexPage(Request $request, string $uuid): Response
    {
        /** @var User $currentUser */
        $currentUser = $this->getUser();

        if ($currentUser === null) {
            return $this->render('frontend/error/index.html.twig');
        }

        $qrCode = $this->qrCodeRepository->findOneBy(['uuid' => $uuid]);


        $clientQrCodes = $currentUser->getQrCodeClient()->toArray();


        //check if user have access to this data
        if (in_array($qrCode, $clientQrCodes)) {

            $memory = $qrCode->getMemory();


            $originalWordsMemory = new ArrayCollection();

//            // Create an ArrayCollection of the current Tag objects in the database
//            foreach ($memory->getWordsMemory() as $words) {
//                $originalWordsMemory->add($words);
//            }


            $form = $this->createForm(PersonEditType::class, $memory);

            $form->handleRequest($request);

            if ($form->isSubmitted() && $form->isValid()) {


                $allWords = $memory->getWordsMemory();

                $allLinks = $memory->getLinksMemory();

                $allEpitaph = $memory->getEpitaph();

                $allBurialPlace = $memory->getBurialPlace();

                foreach ($allWords as $word) {
                    if ($word->getWords() === null) {
                        $this->entityManager->remove($word);
                    }
                }

                foreach ($allLinks as $link) {
                    if ($link->getLink() === null) {
                        $this->entityManager->remove($link);
                    }
                }

                foreach ($allEpitaph as $epitaph) {
                    if ($epitaph->getText() === null) {
                        $this->entityManager->remove($epitaph);
                    }
                }

                foreach ($allBurialPlace as $burialPlace) {
                    if ($burialPlace->getLat() === null) {
                        $this->entityManager->remove($burialPlace);
                    }
                }

                //change status to public
                $qrCodeStatus = $this->statusQrCodeRepository->findOneBy(['name' => 'public']);

                $qrCode->setStatus($qrCodeStatus);


                $this->personService->deleteAttachment($memory);

                $uploadFiles = $request->files->get('files');

                $this->personService->uploadAttachments($memory, $uploadFiles);

                $this->entityManager->flush();

            }

            return $this->render('frontend/person/edit.html.twig', [
                'qrCode' => $qrCode,
                'form' => $form->createView(),
                'uuid' => $uuid
            ]);


        }


        return $this->render('frontend/error/index.html.twig');

    }


    #[Route(path: '/get-preview-main-photo/{uuid}', name: 'person_get_preview_main_photo', options: ['expose' => true], methods: ['GET', 'POST'])]
    public function getPreviewFilesMainPhoto(Request $request, string $uuid): Response
    {

        /** @var User $currentUser */
        $currentUser = $this->getUser();

        if ($currentUser === null) {
            return $this->render('frontend/error/index.html.twig');
        }

        $qrCode = $this->qrCodeRepository->findOneBy(['uuid' => $uuid]);

        if ($qrCode !== null) {

            $memory = $qrCode->getMemory();

            $clientQrCodes = $currentUser->getQrCodeClient()->toArray();

            //check if user have access to this data
            if (in_array($qrCode, $clientQrCodes)) {

                $mainPhoto = $memory->getMainPhoto();
                $previewFiles = [];

                if ($mainPhoto) {
                    $previewFiles = $this->personService->getMainPhotoForEdit($mainPhoto);
                }

                return $this->json($previewFiles, Response::HTTP_OK);

            }
        }

        return $this->render('frontend/error/index.html.twig');

    }

    #[Route(path: '/get-preview-photo-arhive/{uuid}', name: 'person_get_preview_photo_arhive', options: ['expose' => true], methods: ['GET', 'POST'])]
    public function getPreviewFilesPhotoArhive(Request $request, string $uuid): Response
    {

        /** @var User $currentUser */
        $currentUser = $this->getUser();

        if ($currentUser === null) {
            return $this->render('frontend/error/index.html.twig');
        }

        $qrCode = $this->qrCodeRepository->findOneBy(['uuid' => $uuid]);

        if ($qrCode !== null) {

            $memory = $qrCode->getMemory();

            $clientQrCodes = $currentUser->getQrCodeClient()->toArray();

            //check if user have access to this data
            if (in_array($qrCode, $clientQrCodes)) {

                $photoArhives = $memory->getPhotoArhive();
                $previewFiles = [];

                if ($photoArhives) {
                    $previewFiles = $this->personService->getPhotoArhiveForEdit($photoArhives);
                }

                return $this->json($previewFiles, Response::HTTP_OK);

            }
        }

        return $this->render('frontend/error/index.html.twig');

    }



    #[Route(path: '/privacy', name: 'person_privacy', options: ['expose' => true], methods: ['GET', 'POST'])]
    public function privacy(Request $request): Response
    {
        return $this->render('frontend/person/_modal_privacy.html.twig');
    }

}
