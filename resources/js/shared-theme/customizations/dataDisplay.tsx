import { alpha, type Components } from '@mui/material/styles';
import { buttonBaseClasses } from '@mui/material/ButtonBase';
import { chipClasses } from '@mui/material/Chip';
import { iconButtonClasses } from '@mui/material/IconButton';
import { listItemIconClasses } from '@mui/material/ListItemIcon';
import { svgIconClasses } from '@mui/material/SvgIcon';
import { typographyClasses } from '@mui/material/Typography';
import { gray, green, red } from '../themePrimitives';

export const dataDisplayCustomizations: Components = {
    MuiList: {
        styleOverrides: {
            root: {
                padding: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: 0,
            },
        },
    },
    MuiListItem: {
        styleOverrides: {
            root: ({ theme }) => ({
                [`& .${listItemIconClasses.root}, & .${svgIconClasses.root}`]: {
                    minWidth: 0,
                    width: '1rem',
                    height: '1rem',
                    color: (theme.vars || theme).palette.text.secondary,
                },
                [`& .${typographyClasses.root}`]: {
                    fontWeight: 500,
                },
                [`& .${buttonBaseClasses.root}`]: {
                    display: 'flex',
                    gap: 8,
                    padding: '2px 8px',
                    borderRadius: (theme.vars || theme).shape.borderRadius,
                    opacity: 0.7,
                    '&.Mui-selected': {
                        opacity: 1,
                        backgroundColor: alpha(
                            theme.palette.action.selected,
                            0.3,
                        ),
                        [`& .${svgIconClasses.root}`]: {
                            color: (theme.vars || theme).palette.text.primary,
                        },
                    },
                },
            }),
        },
    },
    MuiListSubheader: {
        styleOverrides: {
            root: ({ theme }) => ({
                backgroundColor: 'transparent',
                padding: '4px 8px',
                fontSize: theme.typography.caption.fontSize,
                fontWeight: 500,
                lineHeight: theme.typography.caption.lineHeight,
            }),
        },
    },
    MuiChip: {
        defaultProps: {
            size: 'small',
        },
        styleOverrides: {
            root: ({ theme }) => ({
                border: '1px solid',
                borderRadius: 999,
                [`& .${chipClasses.label}`]: {
                    fontWeight: 600,
                },
                variants: [
                    {
                        props: { color: 'default' },
                        style: {
                            borderColor: gray[200],
                            backgroundColor: gray[100],
                            color: gray[500],
                            ...theme.applyStyles('dark', {
                                borderColor: gray[700],
                                backgroundColor: gray[800],
                                color: gray[300],
                            }),
                        },
                    },
                    {
                        props: { color: 'success' },
                        style: {
                            borderColor: green[200],
                            backgroundColor: green[50],
                            color: green[500],
                            ...theme.applyStyles('dark', {
                                borderColor: green[800],
                                backgroundColor: green[900],
                                color: green[300],
                            }),
                        },
                    },
                    {
                        props: { color: 'error' },
                        style: {
                            borderColor: red[100],
                            backgroundColor: red[50],
                            color: red[500],
                            ...theme.applyStyles('dark', {
                                borderColor: red[800],
                                backgroundColor: red[900],
                                color: red[300],
                            }),
                        },
                    },
                ],
            }),
        },
    },
    MuiTablePagination: {
        styleOverrides: {
            actions: {
                display: 'flex',
                gap: 8,
                marginRight: 6,
                [`& .${iconButtonClasses.root}`]: {
                    minWidth: 0,
                    width: 36,
                    height: 36,
                },
            },
        },
    },
};
