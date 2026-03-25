<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: 'AccountSettingResource',
    title: 'Account Setting Resource',
    required: ['id'],
    properties: [
        new OA\Property(property: 'id', type: 'integer', example: 1),
        new OA\Property(
            property: 'settings',
            type: 'object',
            example: ['theme' => 'dark', 'notifications' => true],
            nullable: true
        ),
    ],
    type: 'object'
)]
class AccountSettingResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'settings' => $this->settings,
        ];
    }
}
