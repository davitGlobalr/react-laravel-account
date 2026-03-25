import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { alpha   } from '@mui/material/styles';
import type {Components, Theme} from '@mui/material/styles';
import { svgIconClasses } from '@mui/material/SvgIcon';
import { gray, brand } from '../themePrimitives';

export const inputsCustomizations: Components<Theme> = {
    MuiButtonBase: {
        defaultProps: {
            disableTouchRipple: true,
            disableRipple: true,
        },
        styleOverrides: {
            root: {
                boxSizing: 'border-box',
                transition: 'all 100ms ease-in',
            },
        },
    },
    MuiButton: {
        styleOverrides: {
            root: ({ theme }) => ({
                boxShadow: 'none',
                textTransform: 'none',
                borderRadius: (theme.vars || theme).shape.borderRadius,
                variants: [
                    {
                        props: { size: 'small' },
                        style: { height: '2.25rem', padding: '8px 12px' },
                    },
                    {
                        props: { size: 'medium' },
                        style: { height: '2.5rem' },
                    },
                    {
                        props: { color: 'primary', variant: 'contained' },
                        style: {
                            color: '#fff',
                            backgroundColor: gray[900],
                            backgroundImage: `linear-gradient(to bottom, ${gray[700]}, ${gray[800]})`,
                            border: `1px solid ${gray[700]}`,
                            '&:hover': {
                                backgroundImage: 'none',
                                backgroundColor: gray[700],
                            },
                            ...theme.applyStyles('dark', {
                                color: '#000',
                                backgroundColor: gray[50],
                                backgroundImage: `linear-gradient(to bottom, ${gray[100]}, ${gray[50]})`,
                                border: `1px solid ${gray[50]}`,
                                '&:hover': {
                                    backgroundImage: 'none',
                                    backgroundColor: gray[300],
                                },
                            }),
                        },
                    },
                    {
                        props: { variant: 'outlined' },
                        style: {
                            color: (theme.vars || theme).palette.text.primary,
                            borderColor: gray[200],
                            backgroundColor: alpha(gray[50], 0.3),
                            '&:hover': {
                                backgroundColor: gray[100],
                                borderColor: gray[300],
                            },
                            ...theme.applyStyles('dark', {
                                backgroundColor: gray[800],
                                borderColor: gray[700],
                                '&:hover': {
                                    backgroundColor: gray[900],
                                    borderColor: gray[600],
                                },
                            }),
                        },
                    },
                ],
            }),
        },
    },
    MuiIconButton: {
        styleOverrides: {
            root: ({ theme }) => ({
                borderRadius: (theme.vars || theme).shape.borderRadius,
                color: (theme.vars || theme).palette.text.primary,
                border: `1px solid ${gray[200]}`,
                backgroundColor: alpha(gray[50], 0.3),
                '&:hover': {
                    backgroundColor: gray[100],
                    borderColor: gray[300],
                },
                ...theme.applyStyles('dark', {
                    backgroundColor: gray[800],
                    borderColor: gray[700],
                    '&:hover': {
                        backgroundColor: gray[900],
                        borderColor: gray[600],
                    },
                }),
                variants: [
                    {
                        props: { size: 'small' },
                        style: {
                            width: '2.25rem',
                            height: '2.25rem',
                            padding: '0.25rem',
                            [`& .${svgIconClasses.root}`]: {
                                fontSize: '1rem',
                            },
                        },
                    },
                    {
                        props: { size: 'medium' },
                        style: {
                            width: '2.5rem',
                            height: '2.5rem',
                        },
                    },
                ],
            }),
        },
    },
    MuiOutlinedInput: {
        styleOverrides: {
            input: {
                padding: 0,
            },
            root: ({ theme }) => ({
                padding: '8px 12px',
                color: (theme.vars || theme).palette.text.primary,
                borderRadius: (theme.vars || theme).shape.borderRadius,
                border: `1px solid ${(theme.vars || theme).palette.divider}`,
                backgroundColor: (theme.vars || theme).palette.background
                    .default,
                transition: 'border 120ms ease-in',
                '&:hover': {
                    borderColor: gray[400],
                },
                [`&.${outlinedInputClasses.focused}`]: {
                    outline: `3px solid ${alpha(brand[500], 0.5)}`,
                    borderColor: brand[400],
                },
                ...theme.applyStyles('dark', {
                    '&:hover': {
                        borderColor: gray[500],
                    },
                }),
            }),
            notchedOutline: {
                border: 'none',
            },
        },
    },
    MuiFormLabel: {
        styleOverrides: {
            root: ({ theme }) => ({
                typography: theme.typography.caption,
                marginBottom: 8,
            }),
        },
    },
};
