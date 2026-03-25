import { menuItemClasses } from '@mui/material/MenuItem';
import { selectClasses } from '@mui/material/Select';
import { alpha   } from '@mui/material/styles';
import type {Components, Theme} from '@mui/material/styles';
import { tabClasses } from '@mui/material/Tab';
import { gray, brand } from '../themePrimitives';

export const navigationCustomizations: Components<Theme> = {
    MuiMenuItem: {
        styleOverrides: {
            root: ({ theme }) => ({
                borderRadius: (theme.vars || theme).shape.borderRadius,
                padding: '6px 8px',
                [`&.${menuItemClasses.selected}`]: {
                    backgroundColor: alpha(theme.palette.action.selected, 0.3),
                },
            }),
        },
    },
    MuiMenu: {
        styleOverrides: {
            paper: ({ theme }) => ({
                marginTop: 4,
                borderRadius: (theme.vars || theme).shape.borderRadius,
                border: `1px solid ${(theme.vars || theme).palette.divider}`,
                backgroundImage: 'none',
                background: '#fff',
                boxShadow: 'var(--template-palette-baseShadow)',
                ...theme.applyStyles('dark', {
                    background: gray[900],
                }),
            }),
        },
    },
    MuiSelect: {
        styleOverrides: {
            root: ({ theme }) => ({
                border: '1px solid',
                borderColor: gray[200],
                borderRadius: (theme.vars || theme).shape.borderRadius,
                backgroundColor: (theme.vars || theme).palette.background.paper,
                '&:hover': {
                    borderColor: gray[300],
                },
                [`&.${selectClasses.focused}`]: {
                    borderColor: gray[400],
                },
                '&:before, &:after': {
                    display: 'none',
                },
                ...theme.applyStyles('dark', {
                    borderColor: gray[700],
                    '&:hover': {
                        borderColor: gray[600],
                    },
                }),
            }),
        },
    },
    MuiLink: {
        defaultProps: {
            underline: 'none',
        },
        styleOverrides: {
            root: ({ theme }) => ({
                color: (theme.vars || theme).palette.text.primary,
                fontWeight: 500,
                position: 'relative',
                width: 'fit-content',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    width: '100%',
                    height: 1,
                    bottom: 0,
                    left: 0,
                    backgroundColor: (theme.vars || theme).palette.text
                        .secondary,
                    opacity: 0.3,
                    transition: 'width 0.3s ease, opacity 0.3s ease',
                },
                '&:hover::before': {
                    width: 0,
                },
                '&:focus-visible': {
                    outline: `3px solid ${alpha(brand[500], 0.5)}`,
                    outlineOffset: 4,
                    borderRadius: 2,
                },
            }),
        },
    },
    MuiDrawer: {
        styleOverrides: {
            paper: ({ theme }) => ({
                backgroundColor: (theme.vars || theme).palette.background
                    .default,
                borderRight: `1px solid ${(theme.vars || theme).palette.divider}`,
            }),
        },
    },
    MuiPaginationItem: {
        styleOverrides: {
            root: ({ theme }) => ({
                '&.Mui-selected': {
                    color: '#fff',
                    backgroundColor: (theme.vars || theme).palette.grey[900],
                },
                ...theme.applyStyles('dark', {
                    '&.Mui-selected': {
                        color: '#000',
                        backgroundColor: (theme.vars || theme).palette.grey[50],
                    },
                }),
            }),
        },
    },
    MuiTabs: {
        styleOverrides: {
            root: {
                minHeight: 'fit-content',
            },
            indicator: ({ theme }) => ({
                backgroundColor: (theme.vars || theme).palette.grey[800],
                ...theme.applyStyles('dark', {
                    backgroundColor: (theme.vars || theme).palette.grey[200],
                }),
            }),
        },
    },
    MuiTab: {
        styleOverrides: {
            root: ({ theme }) => ({
                padding: '6px 8px',
                marginBottom: 8,
                textTransform: 'none',
                minWidth: 'fit-content',
                minHeight: 'fit-content',
                color: (theme.vars || theme).palette.text.secondary,
                borderRadius: (theme.vars || theme).shape.borderRadius,
                border: '1px solid transparent',
                '&:hover': {
                    color: (theme.vars || theme).palette.text.primary,
                    backgroundColor: gray[100],
                    borderColor: gray[200],
                },
                [`&.${tabClasses.selected}`]: {
                    color: gray[900],
                },
                ...theme.applyStyles('dark', {
                    '&:hover': {
                        backgroundColor: gray[800],
                        borderColor: gray[700],
                    },
                    [`&.${tabClasses.selected}`]: {
                        color: '#fff',
                    },
                }),
            }),
        },
    },
};
