import { createContext, useContext, useState } from 'react';
import useFetchPersons from '../../hooks/useFetchPersons';

const PersonsContext = createContext(null);

export const PersonsProvider = ({ children }) => {
    const [filters, setFilters] = useState({});

    const {
        data: persons,
        isLoading,
        isInitialLoading,
        isError,
        error,
    } = useFetchPersons(filters);

    return (
        <PersonsContext.Provider
            value={{ persons, isInitialLoading, setFilters }}
        >
            {children}
        </PersonsContext.Provider>
    );
};

export const usePersons = () => useContext(PersonsContext);
