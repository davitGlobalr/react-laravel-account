import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { SettingField } from '@/features/account-settings/components/SettingField';
import type {
    Account,
    SettingField as SettingFieldType,
    SettingsValues,
} from '@/features/account-settings/types/settings';

type SettingsFormProps = {
    account: Account | null;
    config: SettingFieldType[];
    initialValues: SettingsValues;
    onSave: (accountId: string, values: SettingsValues) => Promise<void> | void;
    onResetToDefaults: (accountId: string) => SettingsValues;
};

export const SettingsForm = ({
    account,
    config,
    initialValues,
    onSave,
    onResetToDefaults,
}: SettingsFormProps) => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { isDirty, isSubmitting, isSubmitSuccessful },
    } = useForm<SettingsValues>({
        defaultValues: initialValues,
        mode: 'onBlur',
    });

    useEffect(() => {
        reset(initialValues);
    }, [initialValues, reset]);

    if (!account) {
        return (
            <Paper
                variant="outlined"
                sx={{
                    p: 3,
                    minHeight: 420,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
            </Paper>
        );
    }

    return (
        <Paper variant="outlined" sx={{ p: 3, flex: 1 }}>

            <Box
                component="form"
                onSubmit={handleSubmit(async (values) => {
                    await onSave(account.id, values);
                })}
            >
                <Stack spacing={3}>
                    {isSubmitSuccessful ? (
                        <Alert severity="success">Settings saved successfully.</Alert>
                    ) : null}

                    {config.map((fieldConfig) => (
                        <SettingField
                            key={fieldConfig.key}
                            control={control}
                            fieldConfig={fieldConfig}
                        />
                    ))}

                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                        <Button disabled={!isDirty || isSubmitting} type="submit" variant="contained">
                            Save settings
                        </Button>
                        <Button
                            disabled={!isDirty || isSubmitting}
                            type="button"
                            variant="outlined"
                            onClick={() => reset(initialValues)}
                        >
                            Reset changes
                        </Button>
                        <Button
                            color="secondary"
                            type="button"
                            variant="text"
                            onClick={() => {
                                const defaults = onResetToDefaults(account.id);
                                reset(defaults);
                            }}
                        >
                            Restore defaults
                        </Button>
                    </Box>
                </Stack>
            </Box>
        </Paper>
    );
};
