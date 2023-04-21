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
import { v4 } from 'uuid';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 12,
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

const FinanceTable = ({ sallery, company }) => {
    return (
        <Stack spacing={1} sx={{ mb: 3 }}>
            <Typography variant='body2' component='span'>
                {company}
            </Typography>
            <TableContainer component={Paper}>
                <Table
                    sx={{ minWidth: 700 }}
                    size='small'
                    aria-label='customized table'
                >
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Ուղղություն</StyledTableCell>
                            {sallery.dates.map((date) => (
                                <StyledTableCell
                                    align='right'
                                    key={v4()}
                                    sx={{ fontSize: '10px' }}
                                >
                                    {date}
                                </StyledTableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <StyledTableRow>
                            <StyledTableCell component='th' scope='row'>
                                Աշխ․ հավասարեցված վճարներ
                            </StyledTableCell>
                            {sallery.sallery.map((sallery) => (
                                <StyledTableCell align='right' key={v4()}>
                                    {sallery.toLocaleString()}
                                </StyledTableCell>
                            ))}
                        </StyledTableRow>
                        <StyledTableRow>
                            <StyledTableCell component='th' scope='row'>
                                Եկամտային հարկ
                            </StyledTableCell>
                            {sallery.incomeTax.map((tax) => (
                                <StyledTableCell align='right' key={v4()}>
                                    {tax.toLocaleString()}
                                </StyledTableCell>
                            ))}
                        </StyledTableRow>
                        <StyledTableRow>
                            <StyledTableCell component='th' scope='row'>
                                Քաղ. պայմ
                            </StyledTableCell>
                            {sallery.civilContract.map((contractFee) => (
                                <StyledTableCell align='right' key={v4()}>
                                    {contractFee.toLocaleString()}
                                </StyledTableCell>
                            ))}
                        </StyledTableRow>
                        <StyledTableRow>
                            <StyledTableCell component='th' scope='row'>
                                Հաշվարկված սոց․ վճարներ
                            </StyledTableCell>
                            {sallery.calculatedSocialFee.map((socialFee) => (
                                <StyledTableCell align='right' key={v4()}>
                                    {socialFee.toLocaleString()}
                                </StyledTableCell>
                            ))}
                        </StyledTableRow>
                        <StyledTableRow>
                            <StyledTableCell component='th' scope='row'>
                                Վճարված սոցվճարներ
                            </StyledTableCell>
                            {sallery.paiedSocialFee.map((socialFee) => (
                                <StyledTableCell align='right' key={v4()}>
                                    {socialFee.toLocaleString()}
                                </StyledTableCell>
                            ))}
                        </StyledTableRow>
                        <StyledTableRow>
                            <StyledTableCell component='th' scope='row'>
                                Աշխատաժամեր
                            </StyledTableCell>
                            {sallery.workedHours.map((hour) => (
                                <StyledTableCell align='right' key={v4()}>
                                    {hour}
                                </StyledTableCell>
                            ))}
                        </StyledTableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Stack>
    );
};

export default FinanceTable;
