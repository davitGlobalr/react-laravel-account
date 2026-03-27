import SettingsIcon from '@mui/icons-material/Settings';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import type { Account } from '@/features/account-settings/types/settings';

type AccountListProps = {
    accounts: Account[];
    selectedAccountId: string | null;
    page: number;
    rowsPerPage: number;
    total: number;
    onPageChange: (page: number) => void;
    onSelect: (accountId: string) => void;
};

export const AccountList = ({
    accounts,
    selectedAccountId,
    page,
    rowsPerPage,
    total,
    onPageChange,
    onSelect,
}: AccountListProps) => {
    if (accounts.length === 0) {
        return (
            <Paper variant="outlined" sx={{ p: 3 }}>
                <Typography color="text.secondary">
                    No accounts.
                </Typography>
            </Paper>
        );
    }

    return (
        <Paper variant="outlined" sx={{ p: 2 }}>
            <Stack spacing={0.5}>
                <Typography variant="h6">Accounts</Typography>
            </Stack>

            <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="accounts table">
                    <TableHead>
                        <TableRow>
                            <TableCell width="20%">ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell align="right" width="20%">
                                Settings
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {accounts.map((account) => {
                            return (
                                <TableRow
                                    key={account.id}
                                    hover
                                    selected={selectedAccountId === account.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>{account.id}</TableCell>
                                    <TableCell>{account.name}</TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            color="primary"
                                            onClick={() => onSelect(account.id)}
                                        >
                                            <SettingsIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                component="div"
                count={total}
                onPageChange={(_event, nextPage) => onPageChange(nextPage + 1)}
                page={page - 1}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[10]}
            />
        </Paper>
    );
};
