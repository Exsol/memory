<?php

namespace App\Controller\Admin\User;

use App\Entity\Role;
use App\Repository\UserRepository;
use DataTables\DataTablesInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\Translation\TranslatorInterface;

#[Route(path: '/admin/user-table')]
#[Security("is_granted('ROLE_ADMIN')")]
class UserTableController extends AbstractController
{
    #[Route(path: '/', name: 'admin_user_table_index')]
    public function index(
        Request $request,
        DataTablesInterface $datatables,
        TranslatorInterface $translator,
        UserRepository $userRepository
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
                    'dt' => 'id',
                ],
                [
                    'db' => 'username',
                    'dt' => 'username',
                ],
                [
                    'db' => 'email',
                    'dt' => 'email',
                ],
                [
                    'db' => 'id',
                    'dt' => 'fullname',
                    'formatter' => function ($d, $row) use ($userRepository) {
                        $user = $userRepository->find($d);
                        if (null !== $user) {
                            return $user->getFullName();
                        }
                        return '---';
                    },
                ],
                [
                    'db' => 'id',
                    'dt' => 'actions',
                    'formatter' => function ($d, $row) {
                        return $this->renderView('admin/user/_datatables_index_actions.html.twig', [
                            'id' => $d,
                            'user' => $row,
                        ]);
                    },
                ],
            ];

            // $users = $usersRepository->softDeletesFilter(true)->findAll();

            $request->request->add(['datatables' => [
                'columns' => $columns,
                'repository' => $userRepository, // ->activateSoftDeletesFilter(),
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
