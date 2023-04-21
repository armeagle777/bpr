import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Stack, Typography } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';

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
        fullName: 'ԵՐԱՆՅԱՆ ՏԻԳՐԱՆ ԱՇՈՏԻ',
        docType: 'ID քարտ',
        docNumber: '010558633',
        issueDate: '27/08/2018',
        issueBy: '012',
        validDate: '27/08/2028',
        isValid: true,
    },
    {
        fullName: 'ԵՐԱՆՅԱՆ ՏԻԳՐԱՆ ԱՇՈՏԻ',
        docType: 'Անձնագիր',
        docNumber: 'AF0257843',
        issueDate: '22/03/2001',
        issueBy: '008',
        validDate: '22/03/2016',
        isValid: false,
    },
];

const PassportTable = () => {
    return (
        <Stack spacing={1} sx={{ mb: 2 }}>
            <Typography variant='body2' component='span'>
                Փաստաթղթեր
            </Typography>
            <TableContainer component={Paper}>
                <Table
                    sx={{ minWidth: 700 }}
                    size='small'
                    aria-label='customized table'
                >
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align='left'>...</StyledTableCell>
                            <StyledTableCell>ԱԱՀ</StyledTableCell>
                            <StyledTableCell align='right'>
                                ՏԵՍԱԿ
                            </StyledTableCell>
                            <StyledTableCell align='right'>
                                ՓԱՍՏԱԹՂԹԻ N
                            </StyledTableCell>
                            <StyledTableCell align='right'>
                                ՏՐՎԵԼ Է
                            </StyledTableCell>
                            <StyledTableCell align='right'>
                                ԿՈՂՄԻՑ
                            </StyledTableCell>
                            <StyledTableCell align='right'>
                                ՎԱՎԵՐ Է
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow key={row.docNumber}>
                                <StyledTableCell align='right'>
                                    <Tooltip
                                        title={
                                            row.isValid ? 'Վավեր' : 'Անվավեր'
                                        }
                                        placement='left'
                                    >
                                        <Box
                                            component='div'
                                            sx={{
                                                width: '15px',
                                                height: '15px',
                                                bgcolor: row.isValid
                                                    ? 'green'
                                                    : 'red',
                                            }}
                                        />
                                    </Tooltip>
                                </StyledTableCell>
                                <StyledTableCell component='th' scope='row'>
                                    {row.fullName}
                                </StyledTableCell>
                                <StyledTableCell align='right'>
                                    {row.docType}
                                </StyledTableCell>
                                <StyledTableCell align='right'>
                                    {row.docNumber}
                                </StyledTableCell>
                                <StyledTableCell align='right'>
                                    {row.issueDate}
                                </StyledTableCell>
                                <StyledTableCell align='right'>
                                    {row.issueBy}
                                </StyledTableCell>
                                <StyledTableCell align='right'>
                                    {row.validDate}
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Stack>
    );
};

export default PassportTable;
