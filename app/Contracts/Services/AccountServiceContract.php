<?php

namespace App\Contracts\Services;

use App\DTO\Account\CreateAccount;
use App\DTO\Account\UpdateAccount;
use App\Models\Account;
use Illuminate\Pagination\LengthAwarePaginator;

interface AccountServiceContract
{

    public function list(int $page = 1, int $perPage = 10): LengthAwarePaginator;

    public function getById(int $id): Account;

    public function store(CreateAccount $accountDto): Account;

    public function update(int $id, UpdateAccount $accountDto): Account;

    public function delete(int $id): bool;

}
