<?php

namespace App\Controller\Admin\QrCode;


use App\Entity\Memory;
use App\Entity\Role;
use App\Entity\StatusQrCode;
use App\Entity\User;
use App\Repository\QrCodeRepository;
use App\Repository\UserRepository;
use DataTables\DataTablesInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\Translation\TranslatorInterface;

#[Route(path: '/admin/qrcode-table')]
#[Security("is_granted('ROLE_MANAGER')")]
class QrCodeTableController extends AbstractController
{
    #[Route(path: '/', name: 'admin_qrcode_table_index')]
    public function index(
        Request $request,
        DataTablesInterface $datatables,
        TranslatorInterface $translator,
        QrCodeRepository $qrCodeRepository
    ): JsonResponse {
        try {
            // Build Configuration Array and send $result thru the compiler
            $columns = [
                [
                    'db' => 'id',
                    'dt' => 'DT_RowId',
                    'formatter' => function ($d, $row) {
                        return 'row_'.$d;
                    },
                ],
                [
                    'db' => 'id',
                    'dt' => 'DT_RowClass',
                    'formatter' => function ($d, $row) {
                        return 'js--editable-parent';
                    },
                ],
                [
                    'db' => 'id',
                    'dt' => 'DT_RowAttr',
                    'formatter' => function ($d, $row) {
                        return ['data-id'=>$d];
                    },
                ],
                [
                    'db' => 'label',
                    'dt' => 'label',
                ],

                [
                    'db' => 'id',
                    'dt' => 'checkBox',
                    'formatter' => function ($d, $row) {
                        return '<span><input type="checkbox" class="js--check" name="userlog-status[]"
                             data-id="'.$d.'" ></span>';
                    },
                ],

                [
                    'db' => 'uuid',
                    'dt' => 'uuid',
                ],
                [
                    'db' => 'user',
                    'dt' => 'user',
                    'formatter' => function ($d, $row) {
                        if ($d instanceof User) {
                            return $d->getFullName();
                        }
                        return '---';
                    },
                ],
                [
                    'db' => 'client',
                    'dt' => 'client',
                    'formatter' => function ($d, $row) {
                        if ($d instanceof User) {
                            return $d->getEmail();
                        }
                        return '---';
                    },
                ],
                [
                    'db' => 'memory',
                    'dt' => 'memory',
                    'formatter' => function ($d, $row) {
                        if ($d instanceof Memory) {
                            return $d->getLastName().' '.$d->getFirstName().' '.$d->getPatronymic();
                        }
                        return '---';
                    },
                ],
                [
                    'db' => 'status',
                    'dt' => 'status',
                    'formatter' => function ($d, $row) {
                        if ($d instanceof StatusQrCode) {
                            return $d->getName();
                        }
                        return '---';
                    },
                ],
                [
                    'db' => 'img',
                    'dt' => 'img',
                    'formatter' => function ($d, $row) {
                        return '<img style="max-width: 150px" src="'.$d.'">';
                    },
                ],
                [
                    'db' => 'createdAt',
                    'dt' => 'createdAt',
                    'formatter' => function ($d, $row) {
                        if ($d instanceof \DateTime) {
                            return $d->format('d.m.Y H:i');
                        }
                    },
                ],
                [
                    'db' => 'updatedAt',
                    'dt' => 'updatedAt',
                    'formatter' => function ($d, $row) {
                        if ($d instanceof \DateTime) {
                            return $d->format('d.m.Y H:i');
                        }
                    },
                ],
                [
                    'db' => 'id',
                    'dt' => 'actions',
                    'formatter' => function ($d, $row) {
                        return $this->renderView('admin/qr-code/_datatables_index_actions.html.twig', [
                            'id' => $d,
                            'qrcode' => $row,
                        ]);
                    },
                ],
            ];

            // $users = $usersRepository->softDeletesFilter(true)->findAll();

            $request->request->add(['datatables' => [
                'columns' => $columns,
                'repository' => $qrCodeRepository, // ->activateSoftDeletesFilter(),
            ]]);

            // Tell the DataTables service to process the request,
            // specifying ID of the required handler.
            $results = $datatables->handle($request, 'base');

            return $this->json($results);
        } catch (HttpException $e) {
            // In fact the line below returns 400 HTTP status person.
            // The message contains the error description.
            return $this->json($e->getMessage(), $e->getStatusCode());
        }
    }
}
