<?php

namespace App\Controller\Admin\QrCode;

use App\Entity\QrCode as QrCodeEntity;
use App\Entity\User;
use App\Form\Admin\QrCode\QrCodeEditType;
use App\Form\Admin\User\UserCreateType;
use App\Repository\StatusQrCodeRepository;
use App\Service\PdfService;
use App\Service\qrCodeBuilder;
use Doctrine\ORM\EntityManagerInterface;
use Ramsey\Uuid\Uuid;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\Translation\TranslatorInterface;
use Twig\Environment as TwigEnvironment;


#[Route(path: '/admin/qr-code')]
#[Security("is_granted('ROLE_MANAGER')")]
class QrCodeController extends AbstractController
{

    public function __construct(
        private readonly TranslatorInterface    $translator,
        private EventDispatcherInterface        $eventDispatcher,
        private readonly EntityManagerInterface $manager,
        private readonly StatusQrCodeRepository $statusQrCodeRepository,
        private readonly qrCodeBuilder          $qrCodeBuilder,
        private readonly TwigEnvironment        $twig,
        private readonly PdfService             $pdfService,
    )
    {
    }


    #[Route(path: '/', name: 'admin_qr_code')]
    public function indexQrCode(): Response
    {
        /** @var User $user */
        $user = $this->getUser();

        return $this->render('admin/qr-code/index.html.twig');
        //return $this->redirectToRoute('security_login');
    }

    /**
     * Creates a new QrCode entity.
     */
    #[Route(path: '/new/{token}', name: 'admin_qrcode_new', methods: ['GET', 'POST'])]
    #[IsGranted('ROLE_MANAGER')]
    public function new(Request $request, string $token): Response
    {

        if (!$this->isCsrfTokenValid('add_qrcode_token_csrf', $token)) {
            return $this->json('Not allowed to make QrCode', Response::HTTP_FORBIDDEN);
        }

        /** @var User $currentUser */
        $currentUser = $this->getUser();

        $qrCode = new QrCodeEntity();

        $qrCode->setUser($currentUser);

        $qrCodeStatus = $this->statusQrCodeRepository->findOneBy(['name' => 'new']);

        $qrCode->setStatus($qrCodeStatus);

        $this->manager->persist($qrCode);

        $this->manager->flush();

        $id = $qrCode->getId();

        $qrCodeUuid = Uuid::uuid4()->toString();

        $qrCode->setUuid($qrCodeUuid);

        $label = sprintf('%09d', $id);

        $qrCodeImg = $this->qrCodeBuilder->getQrCodeWithLabel($qrCodeUuid, $label);

        $qrCode->setImg($qrCodeImg);

        $qrCode->setLabel($label);

        $this->manager->flush();

        return $this->redirectToRoute('admin_qr_code');

    }

    /**
     * View QrCode in pdf.
     */
    #[Route(path: '/view/{id}', name: 'admin_qrcode_view', methods: ['GET', 'POST'])]
    public function view(QrCodeEntity $qrCode): Response
    {

        $qrCodeStatus = $this->statusQrCodeRepository->findOneBy(['name' => 'printed']);

//        $contentForPdf = $this->twig->render('pdf/page.html.twig', [
//            'qrCode' => $qrCode->getImg(),
//        ]);
//
//        $this->pdfService->render($contentForPdf, $qrCode->getUuid(), false);


        $img = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $qrCode->getImg()));

        $response = new Response();
        $filename = $qrCode->getLabel();
        $response->headers->set('Content-Type', 'application/octet-stream');
        $response->headers->set('Content-Disposition', 'attachment; filename='.$filename.'.png');
        $response->setContent($img);

        $qrCode->setStatus($qrCodeStatus);

        $this->manager->flush();

        return $response;
    }


    #[Route(path: '/view-pdf/{id}', name: 'admin_qrcode_view_pdf', methods: ['GET', 'POST'])]
    public function viewPdf(QrCodeEntity $qrCode): Response
    {

        //$qrCodeStatus = $this->statusQrCodeRepository->findOneBy(['name' => 'printed']);

        $contentForPdf = $this->twig->render('pdf/page.html.twig', [
            'qrCode' => $qrCode->getImg(),
        ]);

        $this->pdfService->render($contentForPdf, $qrCode->getUuid(), false);


//        $img = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $qrCode->getImg()));
//
//        $response = new Response();
//        $filename = $qrCode->getLabel();
//        $response->headers->set('Content-Type', 'application/octet-stream');
//        $response->headers->set('Content-Disposition', 'attachment; filename='.$filename.'.png');
//        $response->setContent($img);
//
//        $qrCode->setStatus($qrCodeStatus);
//
//        $this->manager->flush();
//
//        return $response;
    }



    /**
     * Edit QrCode entity.
     */
    #[Route(path: '/edit/{id}', name: 'admin_qrcode_edit', methods: ['GET', 'POST'])]
    #[IsGranted('ROLE_MANAGER')]
    public function edit(Request $request, QrCodeEntity $qrCode): Response
    {


        $form = $this->createForm(QrCodeEditType::class, $qrCode);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {


            $qrCodeImg = $this->qrCodeBuilder->getQrCodeWithLabel($qrCode->getUuid(), $qrCode->getLabel());

            $qrCode->setImg($qrCodeImg);

            $this->manager->flush();

            $this->addFlash('success', $this->translator->trans('qr_code.updated_successfully'));

            return $this->redirectToRoute('admin_qr_code');
        }


        return $this->render('admin/qr-code/edit.html.twig', [
            'form' => $form->createView(),
        ]);


    }

    /**
     * Delete QrCode in pdf.
     */
    #[Route(path: '/delete/{id}', name: 'admin_qrcode_delete', methods: ['GET', 'POST'])]
    #[IsGranted('ROLE_MANAGER')]
    public function delete(Request $request, QrCodeEntity $qrCode): Response
    {

        $this->manager->remove($qrCode);
        $this->manager->flush();

        $this->addFlash('success', $this->translator->trans('qrcode.deleted_successfully'));

        return $this->redirectToRoute('admin_qr_code');
    }

}


