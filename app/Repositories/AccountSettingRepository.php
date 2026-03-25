<?php
declare(strict_types=1);

namespace App\Repositories;

use App\Contracts\Repositories\AccountSettingRepositoryContract;
use App\DTO\AccountSetting\CreateAccountSetting;
use App\Models\AccountSetting;

readonly class AccountSettingRepository implements AccountSettingRepositoryContract
{

    public function __construct(private AccountSetting $model)
    {

    }

    public function storeOrUpdate(CreateAccountSetting $accountSettingDto): AccountSetting
    {
        return $this->model::query()->updateOrCreate([
            'account_id' => $accountSettingDto->getAccountId(),
        ], ['settings' => $accountSettingDto->getSettings()]);
    }

}
