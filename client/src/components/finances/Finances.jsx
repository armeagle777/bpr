import { Box } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { v4 } from 'uuid';

import useFetchTax from '../../hooks/useFetchTax';
import TableScileton from '../tableScileton/TableScileton';
import FinanceTable from './FinanceTable';
import TaxNotFound from './TaxNotFound';

const Finances = ({ ssn }) => {
    const { data: taxInfo, isLoading, isError, error } = useFetchTax(ssn);

    console.log('taxInfo:::::: ', taxInfo);

    const employers = [
        {
            dates: [
                '2022-11',
                '2022-12',
                '2023-01',
                '2023-02',
                '2023-04',
                '2023-05',
                '2023-06',
                '2023-07',
                '2023-08',
                '2023-09',
                '2023-10',
                '2023-11',
            ],
            sallery: [
                12538, 275839, 275839, 231836, 12538, 275839, 275839, 231836,
                12538, 275839, 275839, 231836,
            ],
            incomeTax: [
                2632, 57926, 55167, 55167, 2632, 57926, 55167, 55167, 2632,
                57926, 55167, 55167,
            ],
            civilContract: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            calculatedSocialFee: [
                564, 12412, 13791, 13791, 564, 12412, 13791, 13791, 564, 12412,
                13791, 13791,
            ],
            paiedSocialFee: [564, 0, 0, 0, 564, 0, 0, 0, 564, 0, 0, 0],
            workedHours: [8, 175, 158, 104, 8, 175, 158, 104, 8, 175, 158, 104],
        },
        {
            dates: ['2022-11', '2022-12', '2023-01', '2023-02'],
            sallery: [12538, 275839, 275839, 231836],
            incomeTax: [2632, 57926, 55167, 55167],
            civilContract: [0, 0, 0, 0],
            calculatedSocialFee: [564, 12412, 13791, 13791],
            paiedSocialFee: [564, 0, 0, 0],
            workedHours: [8, 175, 158, 104],
        },
    ];

    if (isLoading) {
        return <TableScileton />;
    }

    if (isError) {
        return error.request.status === 404 ? (
            <TaxNotFound />
        ) : (
            <MuiAlert severity='error'>{error.message}</MuiAlert>
        );
    }

    return (
        <Box sx={{ mt: 3 }}>
            {employers.map((employer) => (
                <FinanceTable
                    sallery={employer}
                    company='«ՀԵՔՍԱԿՏ» ՍՊԸ'
                    key={v4()}
                />
            ))}
        </Box>
    );
};

export default Finances;
