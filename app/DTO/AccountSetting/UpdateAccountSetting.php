<?php

namespace App\DTO\AccountSetting;

use App\DTO\BaseDTO;

final class UpdateAccountSetting extends BaseDTO
{
    public function __construct(
        public int $account_id,
        public ?array $settings = [],
    ) {

    }

    public function toArray(): array
    {
        return [
            'account_id' => $this->account_id,
            'settings' => $this->settings,
        ];
    }
}
