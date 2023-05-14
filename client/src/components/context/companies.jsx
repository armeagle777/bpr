import { createContext, useContext, useState } from 'react';

import useFetchBusiness from '../../hooks/useFetchBusiness';

const CompaniesContext = createContext(null);

export const CompaniesProvider = ({ children }) => {
    const [taxIdInputValue, setTaxIdInputValue] = useState('');
    const [companySearchParams, setCompanySearchParams] = useState({});

    const { data, isLoading, isFetching, isError, error } =
        useFetchBusiness(companySearchParams);

    const handleSubmitSearch = () => {
        setCompanySearchParams(taxIdInputValue);
    };

    return (
        <CompaniesContext.Provider
            value={{
                data,
                isLoading,
                isFetching,
                isError,
                error,
                taxIdInputValue,
                setTaxIdInputValue,
                handleSubmitSearch,
            }}
        >
            {children}
        </CompaniesContext.Provider>
    );
};

export const useCompanies = () => useContext(CompaniesContext);
