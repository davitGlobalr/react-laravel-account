<?php

namespace App\Providers;

use App\Contracts\Services\AccountServiceContract;
use App\Contracts\Services\AccountSettingServiceContract;
use App\Services\AccountService;
use App\Services\AccountSettingService;
use Illuminate\Support\ServiceProvider;

class ServiceServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(AccountServiceContract::class, AccountService::class);
        $this->app->bind(AccountSettingServiceContract::class, AccountSettingService::class);
    }

    public function boot(): void
    {
        //
    }
}
