<?php

namespace App\Http\Requests\AccountSetting;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class AccountSettingStoreRequest extends FormRequest
{
    protected function prepareForValidation(): void
    {
        $this->merge(['account_id' => $this->route('id')]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'account_id' => ['required', 'exists:accounts,id'],
            'settings' => ['nullable', 'array'],
        ];
    }
}
