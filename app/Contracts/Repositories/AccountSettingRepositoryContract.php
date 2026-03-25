<?php

namespace App\Contracts\Repositories;

use App\DTO\AccountSetting\CreateAccountSetting;
use App\Models\AccountSetting;

interface AccountSettingRepositoryContract
{
    public function storeOrUpdate(CreateAccountSetting $accountSettingDto): AccountSetting;
}
