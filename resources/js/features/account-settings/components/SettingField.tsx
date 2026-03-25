import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Controller  } from 'react-hook-form';
import type {Control} from 'react-hook-form';
import type {
    MultiSelectSettingField,
    SelectSettingField,
    SettingField as SettingFieldConfig,
    SettingsValues,
} from '@/features/account-settings/types/settings';

type SettingFieldProps = {
    fieldConfig: SettingFieldConfig;
    control: Control<SettingsValues>;
};

const renderSelectField = (
    fieldConfig: SelectSettingField,
    control: Control<SettingsValues>,
) => (
    <Controller
        name={fieldConfig.key}
        control={control}
        rules={fieldConfig.rules}
        render={({ field, fieldState }) => (
            <FormControl error={fieldState.invalid} fullWidth>
                <InputLabel id={`${fieldConfig.key}-label`}>{fieldConfig.label}</InputLabel>
                <Select
                    {...field}
                    label={fieldConfig.label}
                    labelId={`${fieldConfig.key}-label`}
                >
                    {fieldConfig.options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
                <FormHelperText>
                    {fieldState.error?.message ?? fieldConfig.description}
                </FormHelperText>
            </FormControl>
        )}
    />
);

const renderMultiSelectField = (
    fieldConfig: MultiSelectSettingField,
    control: Control<SettingsValues>,
) => (
    <Controller
        name={fieldConfig.key}
        control={control}
        rules={fieldConfig.rules}
        render={({ field, fieldState }) => {
            const selectedValues = Array.isArray(field.value) ? field.value : [];

            return (
                <FormControl component="fieldset" error={fieldState.invalid} variant="standard">
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        {fieldConfig.label}
                    </Typography>

                    <FormGroup>
                        {fieldConfig.options.map((option) => (
                            <FormControlLabel
                                key={option.value}
                                control={
                                    <Checkbox
                                        checked={selectedValues.includes(option.value)}
                                        onChange={(event) => {
                                            const nextValues = event.target.checked
                                                ? [...selectedValues, option.value]
                                                : selectedValues.filter(
                                                      (currentValue) =>
                                                          currentValue !== option.value,
                                                  );

                                            field.onChange(nextValues);
                                        }}
                                    />
                                }
                                label={option.label}
                            />
                        ))}
                    </FormGroup>

                    <FormHelperText>
                        {fieldState.error?.message ?? fieldConfig.description}
                    </FormHelperText>
                </FormControl>
            );
        }}
    />
);

export const SettingField = ({ fieldConfig, control }: SettingFieldProps) => {
    switch (fieldConfig.type) {
        case 'boolean':
            return (
                <Controller
                    name={fieldConfig.key}
                    control={control}
                    rules={fieldConfig.rules}
                    render={({ field }) => (
                        <Stack spacing={0.5}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={Boolean(field.value)}
                                        onChange={(_, checked) => field.onChange(checked)}
                                    />
                                }
                                label={fieldConfig.label}
                            />
                            {fieldConfig.description ? (
                                <Typography variant="body2" color="text.secondary">
                                    {fieldConfig.description}
                                </Typography>
                            ) : null}
                        </Stack>
                    )}
                />
            );

        case 'text':
            return (
                <Controller
                    name={fieldConfig.key}
                    control={control}
                    rules={fieldConfig.rules}
                    render={({ field, fieldState }) => (
                        <TextField
                            {...field}
                            error={fieldState.invalid}
                            fullWidth
                            helperText={fieldState.error?.message ?? fieldConfig.description}
                            label={fieldConfig.label}
                            placeholder={fieldConfig.placeholder}
                            type={fieldConfig.inputType ?? 'text'}
                        />
                    )}
                />
            );

        case 'number':
            return (
                <Controller
                    name={fieldConfig.key}
                    control={control}
                    rules={fieldConfig.rules}
                    render={({ field, fieldState }) => (
                        <TextField
                            error={fieldState.invalid}
                            fullWidth
                            helperText={fieldState.error?.message ?? fieldConfig.description}
                            label={fieldConfig.label}
                            placeholder={fieldConfig.placeholder}
                            type="number"
                            value={field.value}
                            onBlur={field.onBlur}
                            onChange={(event) => {
                                const rawValue = event.target.value;
                                field.onChange(rawValue === '' ? 0 : Number(rawValue));
                            }}
                            inputProps={{
                                min: fieldConfig.min,
                                max: fieldConfig.max,
                            }}
                        />
                    )}
                />
            );

        case 'select':
            return renderSelectField(fieldConfig, control);

        case 'multiselect':
            return renderMultiSelectField(fieldConfig, control);

        default:
            return null;
    }
};
