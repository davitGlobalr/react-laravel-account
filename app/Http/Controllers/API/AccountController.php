<?php

namespace App\Http\Controllers\API;

use App\Contracts\Services\AccountServiceContract;
use App\DTO\Account\CreateAccount;
use App\DTO\Account\UpdateAccount;
use App\Http\Controllers\Controller;
use App\Http\Requests\Account\AccountDeleteRequest;
use App\Http\Requests\Account\AccountListRequest;
use App\Http\Requests\Account\AccountRequest;
use App\Http\Requests\Account\AccountStoreRequest;
use App\Http\Requests\Account\AccountUpdateRequest;
use App\Http\Resources\AccountResource;
use Illuminate\Http\JsonResponse;
use OpenApi\Attributes as OA;

class AccountController extends Controller
{
    public function __construct(readonly private AccountServiceContract $accountService)
    {

    }

    #[OA\Get(
        path: 'api/accounts',
        operationId: 'getAccountsList',
        description: 'Get paginated list of accounts',
        summary: 'Get accounts list',
        tags: ['Accounts']
    )]
    #[OA\Parameter(
        name: 'page',
        description: 'Page number',
        in: 'query',
        required: false,
        schema: new OA\Schema(type: 'integer', example: 1)
    )]
    #[OA\Parameter(
        name: 'per_page',
        description: 'Items per page',
        in: 'query',
        required: false,
        schema: new OA\Schema(type: 'integer', example: 5)
    )]
    #[OA\Response(
        response: 200,
        description: 'Successful operation',
        content: new OA\JsonContent(
            properties: [
                new OA\Property(property: 'status', type: 'boolean', example: true),
                new OA\Property(
                    property: 'data',
                    type: 'array',
                    items: new OA\Items(ref: '#/components/schemas/AccountResource')
                ),
            ],
            type: 'object'
        )
    )]
    #[OA\Response(response: 401, description: 'Unauthenticated')]
    #[OA\Response(response: 403, description: 'Forbidden')]
    #[OA\Response(response: 422, description: 'Validation error')]
    #[OA\Response(response: 500, description: 'Internal Server Error')]
    public function list(AccountListRequest $request): JsonResponse
    {
        $accounts = $this->accountService->list($request->validated('page') ?? 1, $request->validated('per_page') ?? 10);
        return response()->json(['data' => AccountResource::collection($accounts), 'status' => true]);
    }

    #[OA\Get(
        path: 'api/accounts/{id}',
        operationId: 'getAccountById',
        description: 'Get account by id',
        summary: 'Get account',
        tags: ['Accounts']
    )]
    #[OA\Parameter(
        name: 'id',
        description: 'Account id',
        in: 'path',
        required: true,
        schema: new OA\Schema(type: 'integer', example: 1)
    )]
    #[OA\Response(
        response: 200,
        description: 'Successful operation',
        content: new OA\JsonContent(
            properties: [
                new OA\Property(property: 'success', type: 'boolean', example: true),
                new OA\Property(property: 'data', ref: '#/components/schemas/AccountResource'),
            ],
            type: 'object'
        )
    )]
    #[OA\Response(response: 401, description: 'Unauthenticated')]
    #[OA\Response(response: 403, description: 'Forbidden')]
    #[OA\Response(response: 404, description: 'Not found')]
    #[OA\Response(response: 422, description: 'Validation error')]
    #[OA\Response(response: 500, description: 'Internal Server Error')]
    public function getById(AccountRequest $accountRequest): JsonResponse
    {
        $account = $this->accountService->getById($accountRequest->validated('id'));
        return response()->json(['success' => true, 'data' => AccountResource::make($account)->resolve()]);
    }


    #[OA\Post(
        path: 'api/accounts',
        operationId: 'createAccount',
        description: 'Create account',
        summary: 'Create account',
        tags: ['Accounts']
    )]
    #[OA\RequestBody(
        required: true,
        content: new OA\JsonContent(
            required: ['name'],
            properties: [
                new OA\Property(property: 'name', type: 'string', example: 'Main account'),
            ],
            type: 'object'
        )
    )]
    #[OA\Response(
        response: 200,
        description: 'Successful operation',
        content: new OA\JsonContent(
            properties: [
                new OA\Property(property: 'success', type: 'boolean', example: true),
                new OA\Property(property: 'data', ref: '#/components/schemas/AccountResource'),
            ],
            type: 'object'
        )
    )]
    #[OA\Response(response: 401, description: 'Unauthenticated')]
    #[OA\Response(response: 403, description: 'Forbidden')]
    #[OA\Response(response: 422, description: 'Validation error')]
    #[OA\Response(response: 500, description: 'Internal Server Error')]
    public function store(AccountStoreRequest $request): JsonResponse
    {
        $dto = new CreateAccount(name: $request->validated('name'));
        $account = $this->accountService->store($dto);
        return response()->json(['success' => true, 'data' => AccountResource::make($account)->resolve()]);
    }

    #[OA\Put(
        path: 'api/accounts/{id}',
        operationId: 'updateAccount',
        description: 'Update account by id',
        summary: 'Update account',
        tags: ['Accounts']
    )]
    #[OA\Parameter(
        name: 'id',
        description: 'Account id',
        in: 'path',
        required: true,
        schema: new OA\Schema(type: 'integer', example: 1)
    )]
    #[OA\RequestBody(
        required: true,
        content: new OA\JsonContent(
            required: ['name'],
            properties: [
                new OA\Property(property: 'name', type: 'string', example: 'Updated account'),
            ],
            type: 'object'
        )
    )]
    #[OA\Response(
        response: 200,
        description: 'Successful operation',
        content: new OA\JsonContent(
            properties: [
                new OA\Property(property: 'success', type: 'boolean', example: true),
                new OA\Property(property: 'data', ref: '#/components/schemas/AccountResource'),
            ],
            type: 'object'
        )
    )]
    #[OA\Response(response: 401, description: 'Unauthenticated')]
    #[OA\Response(response: 403, description: 'Forbidden')]
    #[OA\Response(response: 404, description: 'Not found')]
    #[OA\Response(response: 422, description: 'Validation error')]
    #[OA\Response(response: 500, description: 'Internal Server Error')]
    public function update(AccountUpdateRequest $request): JsonResponse
    {
        $dto = new UpdateAccount(name: $request->validated('name'));
        $account = $this->accountService->update($request->validated('id'), $dto);
        return response()->json(['success' => true, 'data' => AccountResource::make($account)->resolve()]);
    }

    #[OA\Delete(
        path: 'api/accounts/{id}',
        operationId: 'deleteAccount',
        description: 'Delete account by id',
        summary: 'Delete account',
        tags: ['Accounts']
    )]
    #[OA\Parameter(
        name: 'id',
        description: 'Account id',
        in: 'path',
        required: true,
        schema: new OA\Schema(type: 'integer', example: 1)
    )]
    #[OA\Response(
        response: 200,
        description: 'Successful operation',
        content: new OA\JsonContent(
            properties: [
                new OA\Property(property: 'success', type: 'boolean', example: true),
            ],
            type: 'object'
        )
    )]
    #[OA\Response(response: 401, description: 'Unauthenticated')]
    #[OA\Response(response: 403, description: 'Forbidden')]
    #[OA\Response(response: 404, description: 'Not found')]
    #[OA\Response(response: 422, description: 'Validation error')]
    #[OA\Response(response: 500, description: 'Internal Server Error')]
    public function delete(AccountDeleteRequest $request): JsonResponse
    {
        $status = $this->accountService->delete($request->validated('id'));
        return response()->json(['success' => $status]);
    }
}
