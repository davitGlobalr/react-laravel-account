<?php

namespace App\OpenApi;

use OpenApi\Attributes as OA;

#[OA\Info(
    version: '1.0.0',
    description: 'API documentation for account and account settings endpoints',
    title: 'React Starter Kit API'
)]
#[OA\Server(
    url: '/',
    description: 'Default server'
)]
#[OA\Tag(
    name: 'Accounts',
    description: 'Operations with accounts'
)]
#[OA\Tag(
    name: 'Account Settings',
    description: 'Operations with account settings'
)]
final class OpenApiSpec
{
}
