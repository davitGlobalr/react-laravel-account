<?php
declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AccountSetting extends Model
{
    protected $fillable = ['account_id', 'settings'];

    protected $casts = [
        'settings' => 'array',
    ];

}
