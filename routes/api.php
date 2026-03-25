<?php

use App\Http\Controllers\API\AccountController;
use App\Http\Controllers\API\AccountSettingController;
use Illuminate\Support\Facades\Route;

Route::middleware(['throttle:30,1'])->prefix('accounts')->group(function () {
    Route::get('/', [AccountController::class, 'list']);
    Route::get('/{id}', [AccountController::class, 'getById']);
    Route::post('/', [AccountController::class, 'store']);
    Route::put('/{id}', [AccountController::class, 'update']);
    Route::delete('/{id}', [AccountController::class, 'delete']);

    Route::post('/{id}/settings', AccountSettingController::class);
});
