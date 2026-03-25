<?php

namespace App\Http\Controllers\API;

use App\Contracts\Services\AccountSettingServiceContract;
use App\DTO\AccountSetting\CreateAccountSetting;
use App\Http\Controllers\Controller;
use App\Http\Requests\AccountSetting\AccountSettingStoreRequest;
use App\Http\Resources\AccountSettingResource;
use Illuminate\Http\JsonResponse;
use OpenApi\Attributes as OA;

class AccountSettingController extends Controller
{
    public function __construct(readonly private AccountSettingServiceContract $accountSettingService)
    {
    }

    #[OA\Post(
        path: 'api/accounts/{id}/settings',
        operationId: 'storeOrUpdateAccountSettings',
        description: 'Store or update account settings',
        summary: 'Store or update account settings',
        tags: ['Account Settings']
    )]
    #[OA\Parameter(
        name: 'id',
        description: 'Account id',
        in: 'path',
        required: true,
        schema: new OA\Schema(type: 'integer', example: 1)
    )]
    #[OA\RequestBody(
        required: false,
        content: new OA\JsonContent(
            properties: [
                new OA\Property(
                    property: 'settings',
                    type: 'object',
                    example: ['theme' => 'dark', 'notifications' => true],
                    nullable: true
                ),
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
                new OA\Property(property: 'data', ref: '#/components/schemas/AccountSettingResource'),
            ],
            type: 'object'
        )
    )]
    #[OA\Response(response: 401, description: 'Unauthenticated')]
    #[OA\Response(response: 403, description: 'Forbidden')]
    #[OA\Response(response: 404, description: 'Not found')]
    #[OA\Response(response: 422, description: 'Validation error')]
    #[OA\Response(response: 500, description: 'Internal Server Error')]
    public function __invoke(AccountSettingStoreRequest $accountSettingStoreRequest): JsonResponse
    {
        $dto = new  CreateAccountSetting(account_id: $accountSettingStoreRequest->validated('account_id'),
            settings: $accountSettingStoreRequest->validated('settings'));
        $accountSetting = $this->accountSettingService->storeOrUpdate($dto);

        return response()->json(['success' => true, 'data' => AccountSettingResource::make($accountSetting)]);
    }
}
