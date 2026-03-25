<?php

namespace App\DTO\Account;

use App\DTO\BaseDTO;

final  class CreateAccount extends BaseDTO
{
    public function __construct(
        public string $name,
    ) {

    }

    public function toArray(): array
    {
        return [
            'name' => $this->name,
        ];
    }
}
