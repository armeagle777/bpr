import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Stack, Typography } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const rows = [
    {
        address: 'ԵՐԵՎԱՆ ԵՐԵՎԱՆ ԲԱՇԻՆՋԱՂՅԱՆ Փ. Շ 6, 26 (Փոստ։ 0078)',
        aim: 'Հասցեի փոփոխություն',
        registerBody: '012',
        registerDate: '14/12/2017',
        changeDate: null,
    },
    {
        address: 'ԵՐԱՆՅԱՆ ՏԻԳՐԱՆ ԱՇՈՏԻ',
        aim: 'Հասցեի փոփոխություն',
        registerBody: '012',
        registerDate: '28/12/2013',
        changeDate: '14/12/2017',
    },
];

const AddressTable = () => {
    return (
        <Stack spacing={1}>
            <Typography variant='body2' component='span'>
                Հասցեներ
            </Typography>
            <TableContainer component={Paper}>
                <Table
                    sx={{ minWidth: 700 }}
                    size='small'
                    aria-label='customized table'
                >
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>ՀԱՍՑԵ</StyledTableCell>
                            <StyledTableCell align='right'>
                                ՊԱՏՃԱՌԸ
                            </StyledTableCell>
                            <StyledTableCell align='right'>
                                ԳՐԱՆՑՈՂ
                            </StyledTableCell>
                            <StyledTableCell align='right'>
                                ԳՐԱՆՑՄԱՆ ա/թ
                            </StyledTableCell>
                            <StyledTableCell align='right'>
                                ՓՈՓՈԽՄԱՆ ա/թ
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow key={row.registerDate}>
                                <StyledTableCell component='th' scope='row'>
                                    {row.address}
                                </StyledTableCell>
                                <StyledTableCell align='right'>
                                    {row.aim}
                                </StyledTableCell>
                                <StyledTableCell align='right'>
                                    {row.registerBody}
                                </StyledTableCell>
                                <StyledTableCell align='right'>
                                    {row.registerDate || '- - -'}
                                </StyledTableCell>
                                <StyledTableCell align='right'>
                                    {row.changeDate || '- - -'}
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Stack>
    );
};

export default AddressTable;
