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

class AccountController extends Controller
{
    public function __construct(readonly private AccountServiceContract $accountService)
    {

    }

    public function list(AccountListRequest $request): JsonResponse
    {
        $accounts = $this->accountService->list($request->validated('page') ?? 1, $request->validated('per_page') ?? 5);
        return response()->json(['data' => AccountResource::collection($accounts), 'status' => true]);
    }

    public function getById(AccountRequest $accountRequest): JsonResponse
    {
        $account = $this->accountService->getById($accountRequest->validated('id'));
        return response()->json(['success' => true, 'data' => AccountResource::make($account)->resolve()]);
    }


    public function store(AccountStoreRequest $request): JsonResponse
    {
        $dto = new CreateAccount(name: $request->validated('name'));
        $account = $this->accountService->store($dto);
        return response()->json(['success' => true, 'data' => AccountResource::make($account)->resolve()]);
    }

    public function update(AccountUpdateRequest $request): JsonResponse
    {
        $dto = new UpdateAccount(name: $request->validated('name'));
        $account = $this->accountService->update($request->validated('id'), $dto);
        return response()->json(['success' => true, 'data' => AccountResource::make($account)->resolve()]);
    }

    public function delete(AccountDeleteRequest $request): JsonResponse
    {
        $status = $this->accountService->delete($request->validated('id'));
        return response()->json(['success' => $status]);
    }
}
