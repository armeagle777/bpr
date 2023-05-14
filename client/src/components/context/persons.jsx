import { createContext, useContext, useState } from 'react';
import useFetchPersons from '../../hooks/useFetchPersons';

import { perPageCount } from '../../utils/constants';

const PersonsContext = createContext(null);

export const PersonsProvider = ({ children }) => {
    const [searchParams, setSearchParams] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [searchString, setSearchString] = useState('');

    const {
        data: persons,
        isLoading,
        isInitialLoading,
        isError,
        error,
    } = useFetchPersons(searchParams);

    const changePage = (pg) => {
        setCurrentPage(pg);
    };

    const filteredPersons = persons?.filter(
        (pers, index) =>
            index >= (currentPage - 1) * perPageCount &&
            index <= currentPage * perPageCount - 1
    );

    return (
        <PersonsContext.Provider
            value={{
                searchString,
                setSearchString,
                persons: filteredPersons,
                isInitialLoading,
                setSearchParams,
                currentPage,
                changePage,
                totalCount: persons?.length,
                isError,
                error,
            }}
        >
            {children}
        </PersonsContext.Provider>
    );
};

export const usePersons = () => useContext(PersonsContext);
