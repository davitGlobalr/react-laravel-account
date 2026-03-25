<?php

namespace App\Http\Controllers\API;

use App\Contracts\Services\AccountSettingServiceContract;
use App\DTO\AccountSetting\CreateAccountSetting;
use App\Http\Controllers\Controller;
use App\Http\Requests\AccountSetting\AccountSettingStoreRequest;
use App\Http\Resources\AccountSettingResource;
use Illuminate\Http\JsonResponse;

class AccountSettingController extends Controller
{
    public function __construct(readonly private AccountSettingServiceContract $accountSettingService)
    {
    }

    public function __invoke(AccountSettingStoreRequest $accountSettingStoreRequest): JsonResponse
    {
        $dto = new  CreateAccountSetting(account_id: $accountSettingStoreRequest->validated('account_id'),
            settings: $accountSettingStoreRequest->validated('settings'));
        $accountSetting = $this->accountSettingService->storeOrUpdate($dto);

        return response()->json(['success' => true, 'data' => AccountSettingResource::make($accountSetting)]);
    }
}
