import { useQuery } from '@tanstack/react-query';

import { getCompanyByHvhh } from '../api/personsApi';

const useFetchCompany = (tax_id) => {
    console.log('Fetching in useFetchCompany');
    const { isFetching, isError, error, data } = useQuery(
        ['company', tax_id],
        () => getCompanyByHvhh(tax_id),
        {
            keepPreviousData: true,
        }
    );

    return {
        error,
        isError,
        isFetching,
        data,
    };
};

export default useFetchCompany;
