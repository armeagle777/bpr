import { useQuery } from '@tanstack/react-query';

import { getCompanyByHvhh, getCompanyForPersonByHvhh } from '../api/personsApi';

const useFetchBusiness = (tax_id) => {
    const { isFetching, isError, error, data } = useQuery(
        ['business', tax_id],
        () => getCompanyForPersonByHvhh(tax_id),
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

export default useFetchBusiness;
