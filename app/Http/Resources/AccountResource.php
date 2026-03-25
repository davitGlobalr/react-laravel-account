<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: 'AccountResource',
    title: 'Account Resource',
    required: ['id', 'name'],
    properties: [
        new OA\Property(property: 'id', type: 'integer', example: 1),
        new OA\Property(property: 'name', type: 'string', example: 'Main account'),
        new OA\Property(
            property: 'settings',
            ref: '#/components/schemas/AccountSettingResource',
            description: 'Account settings.',
            nullable: true
        ),
    ],
    type: 'object'
)]
class AccountResource extends JsonResource
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
            'name' => $this->name,
            'settings' => $this->settings ? AccountSettingResource::make($this->settings) : [],
        ];
    }
}
