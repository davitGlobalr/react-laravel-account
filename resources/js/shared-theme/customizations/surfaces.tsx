import { alpha, type Components } from '@mui/material/styles';
import { gray } from '../themePrimitives';

export const surfacesCustomizations: Components = {
    MuiAppBar: {
        styleOverrides: {
            root: ({ theme }) => ({
                backgroundColor: (theme.vars || theme).palette.background.paper,
                color: (theme.vars || theme).palette.text.primary,
                boxShadow: 'none',
                backdropFilter: 'blur(12px)',
                borderBottom: `1px solid ${(theme.vars || theme).palette.divider}`,
            }),
        },
    },
    MuiPaper: {
        styleOverrides: {
            root: ({ theme }) => ({
                backgroundImage: 'none',
            }),
        },
        variants: [
            {
                props: { variant: 'outlined' },
                style: {
                    borderColor: alpha(gray[300], 0.5),
                },
            },
            {
                props: { variant: 'highlighted' },
                style: {
                    background: `linear-gradient(180deg, ${gray[50]} 0%, #fff 100%)`,
                    border: `1px solid ${alpha(gray[300], 0.5)}`,
                    boxShadow: 'var(--template-palette-baseShadow)',
                },
            },
        ],
    },
    MuiCard: {
        styleOverrides: {
            root: ({ theme }) => ({
                borderRadius: 12,
                border: `1px solid ${(theme.vars || theme).palette.divider}`,
                boxShadow: 'var(--template-palette-baseShadow)',
                backgroundImage: 'none',
            }),
        },
    },
    MuiToolbar: {
        styleOverrides: {
            root: {
                minHeight: 64,
            },
        },
    },
};
