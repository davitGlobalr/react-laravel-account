<?php
declare(strict_types=1);

namespace App\Repositories;

use App\Contracts\Repositories\AccountRepositoryContract;
use App\DTO\Account\CreateAccount;
use App\DTO\Account\UpdateAccount;
use App\Models\Account;
use Illuminate\Pagination\LengthAwarePaginator;

readonly class AccountRepository implements AccountRepositoryContract
{
    public function __construct(private Account $model)
    {

    }

    /**
     * @param int $page
     * @param int $perPage
     * @return LengthAwarePaginator
     */
    public function list(int $page = 1, int $perPage = 10): LengthAwarePaginator
    {
        return $this->model::query()->with('settings')->paginate($perPage, ['*'], 'page', $page);
    }

    /**
     * @param int $id
     * @return Account
     */
    public function getById(int $id): Account
    {
        return $this->model::query()->findOrFail($id);
    }


    /**
     * @param CreateAccount $accountDto
     * @return Account
     */
    public function store(CreateAccount $accountDto): Account
    {
        return $this->model::query()->create($accountDto->toArray());
    }

    /**
     * @param int $id
     * @param UpdateAccount $accountDto
     * @return Account
     */
    public function update(int $id, UpdateAccount $accountDto): Account
    {
        $account = $this->getById($id);

        $account->update($accountDto->toArray());

        return $account;
    }

    /**
     * @param int $id
     * @return bool
     */
    public function delete(int $id): bool
    {
        $account = $this->getById($id);

        return (bool)$account->delete();
    }

}
