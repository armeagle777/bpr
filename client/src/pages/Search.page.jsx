import { useState } from 'react';

import SearchBody from '../components/search/SearchBody';
import SearchPageSkileton from '../components/searchPageSkileton/SearchPageSkileton';

import { Stack } from '@mui/material';
import SearchInput from '../components/search/SearchInput';
import useFetchPersons from '../hooks/useFetchPersons';
import { createSearchParamsObject } from '../utils/helperFunctions';

const Search = () => {
    const [searchString, setSearchString] = useState('');
    const [filters, setFilters] = useState({});

    const { data, isLoading, isInitialLoading, isError, error } =
        useFetchPersons(filters);

    const handleClearButton = () => {
        setFilters({});
        setSearchString('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimedString = searchString.trim();
        const searchParamsObj = createSearchParamsObject(trimedString);

        setFilters(searchParamsObj);
    };

    console.log('filters:::::: ', filters);

    return (
        <>
            {/* <SearchHeader /> */}
            <Stack
                sx={{
                    width: '100%',
                    alignItems: 'center',
                    pt: 2,
                }}
            >
                <SearchInput
                    searchString={searchString}
                    setSearchString={setSearchString}
                    handleSubmit={handleSubmit}
                    handleClearButton={handleClearButton}
                />
            </Stack>
            {isInitialLoading ? (
                <SearchPageSkileton />
            ) : data ? (
                <SearchBody persons={data} />
            ) : (
                ''
            )}
        </>
    );
};

export default Search;
