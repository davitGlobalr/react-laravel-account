<?php

use App\Providers\AppServiceProvider;
use App\Providers\FortifyServiceProvider;
use App\Providers\RepositoryServiceProvider;
use App\Providers\ServiceServiceProvider;

return [
    AppServiceProvider::class,
    FortifyServiceProvider::class,
    ServiceServiceProvider::class,
    RepositoryServiceProvider::class,
];
