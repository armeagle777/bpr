import { useQuery } from '@tanstack/react-query';

import { getQkagDocsBySsn } from '../api/personsApi';

const useFetchQkag = (ssn) => {
    const { isLoading, isError, error, data } = useQuery(
        ['qkag-documents', ssn],
        () => getQkagDocsBySsn(ssn),
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

export default useFetchQkag;
