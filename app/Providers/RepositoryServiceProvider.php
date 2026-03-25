<?php

namespace App\Providers;

use App\Contracts\Repositories\AccountRepositoryContract;
use App\Contracts\Repositories\AccountSettingRepositoryContract;
use App\Repositories\AccountRepository;
use App\Repositories\AccountSettingRepository;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(AccountRepositoryContract::class, AccountRepository::class);
        $this->app->bind(AccountSettingRepositoryContract::class, AccountSettingRepository::class);
    }

    public function boot(): void
    {
        //
    }
}
