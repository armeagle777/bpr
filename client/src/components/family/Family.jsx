import { Box } from '@mui/material';
import QkagDocument from '../qkagDocument/QkagDocument';
import { useEffect, useState } from 'react';
import ListScileton from '../listSceleton/ListScileton';

const Family = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading((prev) => false);
        }, 2000);
    });

    return (
        <Box>
            {loading ? (
                <ListScileton />
            ) : (
                <>
                    <QkagDocument type='marriage' />
                    <QkagDocument type='birth' />
                    <QkagDocument type='devorce' />
                </>
            )}
        </Box>
    );
};

export default Family;
