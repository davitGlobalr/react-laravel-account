import type { SettingField } from '@/features/account-settings/types/settings';

export const settingsConfig: SettingField[] = [
    {
        key: 'enableNotifications',
        label: 'Enable notifications',
        description: 'Allow this account to receive activity notifications.',
        type: 'boolean',
        defaultValue: false,
    },
    {
        key: 'supportEmail',
        label: 'Support email',
        description: 'Primary support email used for account communication.',
        type: 'text',
        inputType: 'email',
        placeholder: 'support@example.com',
        defaultValue: '',
        rules: {
            required: 'Support email is required.',
            pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Enter a valid email address.',
            },
        },
    },
    {
        key: 'dailyEmailLimit',
        label: 'Daily email limit',
        description: 'Maximum number of outbound emails allowed per day.',
        type: 'number',
        placeholder: '100',
        min: 0,
        defaultValue: 100,
        rules: {
            min: {
                value: 0,
                message: 'Daily email limit cannot be negative.',
            },
        },
    },
    {
        key: 'timezone',
        label: 'Timezone',
        description: 'Timezone used for scheduling and reporting.',
        type: 'select',
        defaultValue: 'UTC',
        options: [
            { label: 'UTC', value: 'UTC' },
            { label: 'Europe/Berlin', value: 'Europe/Berlin' },
            { label: 'America/New_York', value: 'America/New_York' },
            { label: 'Asia/Tokyo', value: 'Asia/Tokyo' },
        ],
    },
    {
        key: 'allowedChannels',
        label: 'Allowed channels',
        description: 'Channels available for outbound account communication.',
        type: 'multiselect',
        defaultValue: ['email'],
        options: [
            { label: 'Email', value: 'email' },
            { label: 'SMS', value: 'sms' },
            { label: 'Push', value: 'push' },
            { label: 'In-app', value: 'in_app' },
        ],
    },
];
