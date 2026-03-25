<?php
declare(strict_types=1);

namespace App\Services;

use App\Contracts\Repositories\AccountSettingRepositoryContract;
use App\Contracts\Services\AccountSettingServiceContract;
use App\DTO\AccountSetting\CreateAccountSetting;
use App\Models\AccountSetting;

readonly class AccountSettingService implements AccountSettingServiceContract
{
    public function __construct(private AccountSettingRepositoryContract $accountSettingRepository)
    {

    }

    public function storeOrUpdate(CreateAccountSetting $accountSettingDto): AccountSetting
    {
        return $this->accountSettingRepository->storeOrUpdate($accountSettingDto);
    }
}
