import { useCallback, useEffect, useMemo, useState } from 'react';
import type {
    Account,
    SettingField,
    SettingsValues,
} from '@/features/account-settings/types/settings';
import {
    fetchAccounts,
    saveAccountSettingsToApi,
} from '@/features/account-settings/utils/accountSettingsApi';
import {
    buildDefaultValues,
    mergeWithDefaults,
} from '@/features/account-settings/utils/buildDefaultValues';

export const useAccountSettings = (
    config: SettingField[],
) => {
    const perPage = 10;
    const defaults = useMemo(() => buildDefaultValues(config), [config]);
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [lastPage, setLastPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadAccounts = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetchAccounts(defaults, currentPage, perPage);
            const nextAccounts = response.accounts;

            setAccounts(nextAccounts);
            setCurrentPage(response.currentPage);
            setTotal(response.total);
            setLastPage(response.lastPage);
            setSelectedAccountId((currentValue) =>
                nextAccounts.some((account) => account.id === currentValue)
                    ? currentValue
                    : nextAccounts[0]?.id ?? null,
            );
        } catch (loadError) {
            setError(
                loadError instanceof Error
                    ? loadError.message
                    : 'Failed to load accounts from the database.',
            );
        } finally {
            setIsLoading(false);
        }
    }, [currentPage, defaults, perPage]);

    useEffect(() => {
        void loadAccounts();
    }, [loadAccounts]);

    const selectedAccount = useMemo(
        () => accounts.find((account) => account.id === selectedAccountId) ?? null,
        [accounts, selectedAccountId],
    );

    const selectedSettings = useMemo(
        () => mergeWithDefaults(defaults, selectedAccount?.settings),
        [defaults, selectedAccount],
    );

    const handleSave = useCallback(
        async (accountId: string, values: SettingsValues) => {
            setError(null);

            try {
                const savedSettings = await saveAccountSettingsToApi(accountId, values);

                setAccounts((currentAccounts) =>
                    currentAccounts.map((account) =>
                        account.id === accountId
                            ? {
                                  ...account,
                                  settings: mergeWithDefaults(defaults, savedSettings),
                              }
                            : account,
                    ),
                );
            } catch (saveError) {
                setError(
                    saveError instanceof Error
                        ? saveError.message
                        : 'Failed to save account settings to the database.',
                );

                throw saveError;
            }
        },
        [defaults],
    );

    const handleReset = useCallback(() => defaults, [defaults]);

    return {
        defaults,
        accounts,
        currentPage,
        perPage,
        total,
        lastPage,
        selectedAccount,
        selectedAccountId,
        selectedSettings,
        isLoading,
        error,
        loadAccounts,
        setCurrentPage,
        setSelectedAccountId,
        handleSave,
        handleReset,
    };
};
