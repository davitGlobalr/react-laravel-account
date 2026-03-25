import type {
    AccountSettingsStorage,
    SettingsValues,
} from '@/features/account-settings/types/settings';
import { mergeWithDefaults } from '@/features/account-settings/utils/buildDefaultValues';

const STORAGE_KEY = 'account-settings-dashboard:v1';

const isBrowser = () => typeof window !== 'undefined';

export const readAccountSettingsStorage = (): AccountSettingsStorage => {
    if (!isBrowser()) {
        return {};
    }

    try {
        const rawValue = window.localStorage.getItem(STORAGE_KEY);

        if (!rawValue) {
            return {};
        }

        const parsedValue = JSON.parse(rawValue);

        return typeof parsedValue === 'object' && parsedValue !== null ? parsedValue : {};
    } catch {
        return {};
    }
};

export const writeAccountSettingsStorage = (
    nextStorage: AccountSettingsStorage,
): AccountSettingsStorage => {
    if (isBrowser()) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextStorage));
    }

    return nextStorage;
};

export const getAccountSettings = (
    accountId: string,
    defaults: SettingsValues,
): SettingsValues => {
    const storage = readAccountSettingsStorage();

    return mergeWithDefaults(defaults, storage[accountId]);
};

export const saveAccountSettings = (
    accountId: string,
    values: SettingsValues,
): AccountSettingsStorage => {
    const storage = readAccountSettingsStorage();

    return writeAccountSettingsStorage({
        ...storage,
        [accountId]: values,
    });
};

export const resetAccountSettings = (
    accountId: string,
    defaults: SettingsValues,
): AccountSettingsStorage => {
    const storage = readAccountSettingsStorage();

    return writeAccountSettingsStorage({
        ...storage,
        [accountId]: defaults,
    });
};
