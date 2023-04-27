import { useState } from 'react';

import SearchBody from '../components/search/SearchBody';
import SearchPageSkileton from '../components/searchPageSkileton/SearchPageSkileton';

import { Stack } from '@mui/material';
import SearchInput from '../components/search/SearchInput';

import { createSearchParamsObject } from '../utils/helperFunctions';
import { usePersons } from '../components/context/persons';

const Search = () => {
    const [searchString, setSearchString] = useState('');

    const { persons, isInitialLoading, setFilters } = usePersons();

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
            ) : persons ? (
                <SearchBody persons={persons} />
            ) : (
                ''
            )}
        </>
    );
};

export default Search;
