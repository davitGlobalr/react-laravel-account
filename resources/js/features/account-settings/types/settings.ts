import type { RegisterOptions } from 'react-hook-form';

export type SettingType =
    | 'boolean'
    | 'text'
    | 'number'
    | 'select'
    | 'multiselect';

export type SettingOption = {
    label: string;
    value: string;
};

export type SettingsFormValue = boolean | string | number | string[];

export type SettingsValues = Record<string, SettingsFormValue>;

export type SettingRules = Omit<
    RegisterOptions<SettingsValues, string>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
>;

type BaseSettingField = {
    key: string;
    label: string;
    description?: string;
    rules?: SettingRules;
};

export type BooleanSettingField = BaseSettingField & {
    type: 'boolean';
    defaultValue: boolean;
};

export type TextSettingField = BaseSettingField & {
    type: 'text';
    defaultValue: string;
    placeholder?: string;
    inputType?: 'text' | 'email';
};

export type NumberSettingField = BaseSettingField & {
    type: 'number';
    defaultValue: number;
    placeholder?: string;
    min?: number;
    max?: number;
};

export type SelectSettingField = BaseSettingField & {
    type: 'select';
    defaultValue: string;
    options: SettingOption[];
};

export type MultiSelectSettingField = BaseSettingField & {
    type: 'multiselect';
    defaultValue: string[];
    options: SettingOption[];
};

export type SettingField =
    | BooleanSettingField
    | TextSettingField
    | NumberSettingField
    | SelectSettingField
    | MultiSelectSettingField;

export type Account = {
    id: string;
    name: string;
    settings: SettingsValues;
};

export type AccountApiResponse = {
    id: number | string;
    name: string;
    settings?:
        | {
              id?: number | string;
              settings?: Record<string, unknown> | null;
          }
        | []
        | null;
};

export type PaginatedAccountsResponse = {
    data: AccountApiResponse[];
    per_page: number;
    current_page: number;
    total: number;
    last_page: number;
    status: boolean;
};
export class AccountSettingsStorage {}
