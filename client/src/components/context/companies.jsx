import { createContext, useContext, useState } from 'react';
import useFetchCompany from '../../hooks/useFetchCompany';

const CompaniesContext = createContext(null);

export const CompaniesProvider = ({ children }) => {
    const [taxIdInputValue, setTaxIdInputValue] = useState('');
    const [companySearchParams, setCompanySearchParams] = useState(null);

    const { data, isLoading, isFetching, isError, error } =
        useFetchCompany(companySearchParams);

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
