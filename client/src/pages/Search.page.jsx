import { useEffect, useState } from 'react';

import LinearProgress from '@mui/material/LinearProgress';

import SearchPageSkileton from '../components/searchPageSkileton/SearchPageSkileton';
import SearchBody from '../components/search/SearchBody';
import SearchHeader from '../components/search/SearchHeader';

import { fakeData } from '../utils/constants';

const Search = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading((prev) => false);
        }, 2000);
    });
    return (
        <>
            {loading && <LinearProgress />}
            <SearchHeader />
            {loading ? (
                <SearchPageSkileton />
            ) : (
                <SearchBody persons={fakeData} />
            )}
        </>
    );
};

export default Search;
