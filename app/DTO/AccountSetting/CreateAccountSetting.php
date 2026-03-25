<?php

namespace App\DTO\AccountSetting;

use App\DTO\BaseDTO;

final class CreateAccountSetting extends BaseDTO
{
    public function __construct(
        public int $account_id,
        public ?array $settings = [],
    ) {

    }


    public function getAccountId(): int
    {
        return $this->account_id;
    }

    public function getSettings(): ?array
    {
        return $this->settings;
    }

    public function toArray(): array
    {
        return [
            'account_id' => $this->account_id,
            'settings' => $this->settings,
        ];
    }
}
