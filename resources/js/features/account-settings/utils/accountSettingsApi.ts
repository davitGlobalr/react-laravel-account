import type {
    Account,
    AccountApiResponse,
    PaginatedAccountsResponse,
    SettingsValues,
} from '@/features/account-settings/types/settings';
import { mergeWithDefaults } from '@/features/account-settings/utils/buildDefaultValues';

const ensureJsonResponse = async <T>(response: Response): Promise<T> => {
    const payload = await response.json();

    if (!response.ok) {
        const message =
            typeof payload?.message === 'string'
                ? payload.message
                : 'Failed to communicate with the account settings API.';

        throw new Error(message);
    }

    return payload as T;
};

const normalizeAccount = (
    account: AccountApiResponse,
    defaults: SettingsValues,
): Account => {
    const rawSettings =
        account.settings && !Array.isArray(account.settings)
            ? account.settings.settings ?? undefined
            : undefined;

    return {
        id: String(account.id),
        name: account.name,
        settings:
            rawSettings && typeof rawSettings === 'object'
                ? mergeWithDefaults(defaults, rawSettings as SettingsValues)
                : mergeWithDefaults(defaults),
    };
};

export const fetchAccounts = async (
    defaults: SettingsValues,
    page: number,
    perPage: number,
): Promise<{
    accounts: Account[];
    total: number;
    currentPage: number;
    perPage: number;
    lastPage: number;
}> => {
    const query = new URLSearchParams({
        page: String(page),
        per_page: String(perPage),
    });

    const response = await fetch(`/api/accounts/list?${query.toString()}`, {
        headers: {
            Accept: 'application/json',
        },
    });

    const payload = await ensureJsonResponse<PaginatedAccountsResponse>(response);

    return {
        accounts: payload.data.map((account) => normalizeAccount(account, defaults)),
        total: payload.total,
        currentPage: payload.current_page,
        perPage: payload.per_page,
        lastPage: payload.last_page,
    };
};

export const saveAccountSettingsToApi = async (
    accountId: string,
    settings: SettingsValues,
): Promise<SettingsValues> => {
    const response = await fetch(`/api/accounts/${accountId}/settings`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            settings,
        }),
    });

    const payload = await ensureJsonResponse<{
        data?: {
            settings?: Record<string, unknown> | null;
        };
    }>(response);

    return payload.data?.settings && typeof payload.data.settings === 'object'
        ? (payload.data.settings as SettingsValues)
        : settings;
};
