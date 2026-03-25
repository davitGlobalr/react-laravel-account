import { Head } from '@inertiajs/react';
import { AccountSettingsDashboard } from '@/features/account-settings/components/AccountSettingsDashboard';

export default function Welcome() {
    return (
        <>
            <Head title="Account Settings" />
            <AccountSettingsDashboard />
        </>
    );
}
