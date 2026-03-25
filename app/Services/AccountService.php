<?php
declare(strict_types=1);

namespace App\Services;

use App\Contracts\Services\AccountServiceContract;
use App\DTO\Account\CreateAccount;
use App\DTO\Account\UpdateAccount;
use App\Models\Account;
use App\Repositories\AccountRepository;
use Illuminate\Pagination\LengthAwarePaginator;

class AccountService implements AccountServiceContract
{
    public function __construct(readonly private AccountRepository $accountRepository)
    {

    }

    public function list(int $page = 1, int $perPage = 10): LengthAwarePaginator
    {
        return $this->accountRepository->list($page, $perPage);
    }

    public function getById(int $id): Account
    {
        return $this->accountRepository->getById($id);
    }

    public function store(CreateAccount $accountDto): Account
    {
        return $this->accountRepository->store($accountDto);
    }

    public function update(int $id, UpdateAccount $accountDto): Account
    {
        return $this->accountRepository->update($id, $accountDto);
    }

    public function delete(int $id): bool
    {
        return $this->accountRepository->delete($id);
    }
}
