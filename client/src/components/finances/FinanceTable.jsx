import { Skeleton, Stack, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import MuiTableRow from '@mui/material/TableRow';

import { formatedData } from '../../utils/helperFunctions';
import StyledTableRow from './StyledTableRow';
import useFetchCompany from '../../hooks/useFetchCompany';

const FinanceTable = ({ employer }) => {
    const {
        taxpayerid,
        personInfoPeriods: { personInfoPeriod: periods },
    } = employer;

    const TableData = formatedData(periods);

    const {
        data: companyData,
        isLoading,
        isError,
        error,
    } = useFetchCompany(taxpayerid);
    console.log('companyData:::::: ', companyData);

    const companyName = isLoading ? (
        <Skeleton />
    ) : isError ? (
        taxpayerid
    ) : (
        `${companyData?.name_am || ''} ${
            companyData?.company_type || ''
        } | ${taxpayerid}`
    );

    return (
        <Stack spacing={1} sx={{ mb: 3 }}>
            <Typography variant='body2' component='span'>
                {companyName}
            </Typography>
            <TableContainer component={Paper}>
                <Table
                    sx={{ minWidth: 700 }}
                    size='small'
                    aria-label='sallery table'
                >
                    <TableHead>
                        <MuiTableRow>{TableData.titles}</MuiTableRow>
                    </TableHead>
                    <TableBody>
                        <StyledTableRow>
                            {TableData.salaryEquivPayments}
                        </StyledTableRow>
                        <StyledTableRow>{TableData.incomeTax}</StyledTableRow>
                        <StyledTableRow>
                            {TableData.civilLowContractPayments}
                        </StyledTableRow>
                        <StyledTableRow>
                            {TableData.socialpayments}
                        </StyledTableRow>
                        <StyledTableRow>
                            {TableData.socialpaymentspaid}
                        </StyledTableRow>
                        <StyledTableRow>
                            {TableData.workinghours}
                        </StyledTableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Stack>
    );
};

export default FinanceTable;
