import { useQuery } from '@tanstack/react-query';

import { getTaxBySsn } from '../api/personsApi';

const useFetchTax = (ssn) => {
    const { isLoading, isError, error, data } = useQuery(
        ['tax', ssn],
        () => getTaxBySsn(ssn),
        {
            keepPreviousData: true,
        }
    );

    return {
        error,
        isError,
        isLoading,
        data,
    };
};

export default useFetchTax;
