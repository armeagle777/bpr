import { useQuery } from '@tanstack/react-query';

import { getCompanyByHvhh } from '../api/personsApi';

const useFetchCompany = (tax_id) => {
    const { isLoading, isError, error, data } = useQuery(
        ['company', tax_id],
        () => getCompanyByHvhh(tax_id),
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

export default useFetchCompany;
