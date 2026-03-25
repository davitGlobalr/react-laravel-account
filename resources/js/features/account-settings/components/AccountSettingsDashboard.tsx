import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { AccountList } from '@/features/account-settings/components/AccountList';
import { SettingsForm } from '@/features/account-settings/components/SettingsForm';
import { settingsConfig } from '@/features/account-settings/config/settings.config';
import { useAccountSettings } from '@/features/account-settings/hooks/useAccountSettings';

const theme = createTheme({
    palette: {
        background: {
            default: '#f7f8fc',
            paper: '#ffffff',
        },
    },
    shape: {
        borderRadius: 16,
    },
});

export const AccountSettingsDashboard = () => {
    const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false);
    const {
        accounts,
        currentPage,
        perPage,
        total,
        selectedAccount,
        selectedAccountId,
        selectedSettings,
        isLoading,
        error,
        setCurrentPage,
        setSelectedAccountId,
        handleSave,
        handleReset,
    } = useAccountSettings(settingsConfig);

    const handleOpenSettings = (accountId: string) => {
        setSelectedAccountId(accountId);
        setIsSettingsDialogOpen(true);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="xl" sx={{ py: 4 }}>
                <Stack spacing={3}>
                    <Paper variant="outlined" sx={{ p: 3 }}>
                        <Stack spacing={1}>
                            <Typography variant="h4">Account Settings Dashboard</Typography>
                            <Typography color="text.secondary">
                                A config-driven settings system with reusable UI, strong TypeScript
                                types and per-account persistence.
                            </Typography>
                        </Stack>
                    </Paper>

                    {isLoading ? (
                        <Paper
                            variant="outlined"
                            sx={{
                                p: 4,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                minHeight: 180,
                            }}
                        >
                            <Stack alignItems="center" spacing={2}>
                                <CircularProgress size={28} />
                                <Typography color="text.secondary">
                                    Loading accounts from database...
                                </Typography>
                            </Stack>
                        </Paper>
                    ) : (
                        <AccountList
                            accounts={accounts}
                            page={currentPage}
                            rowsPerPage={perPage}
                            selectedAccountId={selectedAccountId}
                            total={total}
                            onPageChange={setCurrentPage}
                            onSelect={handleOpenSettings}
                        />
                    )}

                    {error ? <Alert severity="error">{error}</Alert> : null}
                </Stack>
            </Container>

            <Dialog
                fullWidth
                maxWidth="md"
                open={isSettingsDialogOpen}
                onClose={() => setIsSettingsDialogOpen(false)}
            >
                <DialogTitle sx={{ pr: 7 }}>
                    <Stack spacing={0.5}>
                        <Typography variant="h6">
                            {selectedAccount ? `${selectedAccount.name} settings` : 'Account settings'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Edit account-specific settings generated from configuration.
                        </Typography>
                    </Stack>
                    <IconButton
                        aria-label="Close settings dialog"
                        onClick={() => setIsSettingsDialogOpen(false)}
                        sx={{ position: 'absolute', right: 12, top: 12 }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <Box sx={{ pt: 1 }}>
                        <SettingsForm
                            account={selectedAccount}
                            config={settingsConfig}
                            initialValues={selectedSettings}
                            onSave={async (accountId, values) => {
                                await handleSave(accountId, values);
                                setIsSettingsDialogOpen(false);
                            }}
                            onResetToDefaults={handleReset}
                        />
                    </Box>
                </DialogContent>
            </Dialog>
        </ThemeProvider>
    );
};
