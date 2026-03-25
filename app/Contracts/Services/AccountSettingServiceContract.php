<?php

namespace App\Contracts\Services;

use App\DTO\AccountSetting\CreateAccountSetting;
use App\Models\AccountSetting;

interface AccountSettingServiceContract
{

    public function storeOrUpdate(CreateAccountSetting $accountSettingDto): AccountSetting;

}
