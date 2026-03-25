import type {
    SettingField,
    SettingsFormValue,
    SettingsValues,
} from '@/features/account-settings/types/settings';

const cloneDefaultValue = (value: SettingsFormValue): SettingsFormValue =>
    Array.isArray(value) ? [...value] : value;

export const buildDefaultValues = (config: SettingField[]): SettingsValues =>
    config.reduce<SettingsValues>((accumulator, field) => {
        accumulator[field.key] = cloneDefaultValue(field.defaultValue);

        return accumulator;
    }, {});

export const mergeWithDefaults = (
    defaults: SettingsValues,
    values?: SettingsValues,
): SettingsValues =>
    Object.entries(defaults).reduce<SettingsValues>((accumulator, [key, value]) => {
        const nextValue = values?.[key];
        accumulator[key] =
            nextValue === undefined ? cloneDefaultValue(value) : cloneDefaultValue(nextValue);

        return accumulator;
    }, {});
