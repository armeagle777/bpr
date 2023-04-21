import { Box } from '@mui/material';
import { v4 } from 'uuid';
import { useState, useEffect } from 'react';

import FinanceTable from '../financeTable/FinanceTable';
import TableScileton from '../tableScileton/TableScileton';

const Finances = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading((prev) => false);
        }, 2000);
    });

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

    return (
        <Box sx={{ mt: 3 }}>
            {loading ? (
                <TableScileton />
            ) : (
                employers.map((employer) => (
                    <FinanceTable
                        sallery={employer}
                        company='«ՀԵՔՍԱԿՏ» ՍՊԸ'
                        key={v4()}
                    />
                ))
            )}
        </Box>
    );
};

export default Finances;
