import { Box } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

import useFetchTax from '../../hooks/useFetchTax';
import TableScileton from '../tableScileton/TableScileton';
import FinanceTable from './FinanceTable';
import TaxNotFound from './TaxNotFound';

const Finances = ({ ssn }) => {
    const { data: taxInfo, isLoading, isError, error } = useFetchTax(ssn);

    if (isLoading) {
        return <TableScileton />;
    }

    if (isError) {
        <MuiAlert severity='error'>{error.message}</MuiAlert>;
    }

    return (
        <Box sx={{ mt: 3 }}>
            {!taxInfo.length ? (
                <TaxNotFound />
            ) : (
                taxInfo.map((employer) => (
                    <FinanceTable
                        key={employer.taxpayerid}
                        employer={employer}
                    />
                ))
            )}
        </Box>
    );
};

export default Finances;
