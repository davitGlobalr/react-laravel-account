<?php

namespace App\DTO\Account;

use App\DTO\BaseDTO;

class UpdateAccount extends BaseDTO
{
    public function __construct(
        public ?string $name = null,
    )
    {

    }
    public function toArray(): array
    {
        return [
            'name' => $this->name,
        ];
    }
}
