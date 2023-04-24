import { useQuery } from '@tanstack/react-query';

import { getPersonBySsn } from '../api/personsApi';

const useFetchPerson = (personInfo, ssn) => {
    if (personInfo) {
        return {
            data: personInfo,
            isLoading: false,
            isError: false,
            error: null,
        };
    }

    const {
        isLoading,
        isError,
        error,
        data: person,
    } = useQuery(['persons', ssn], () => getPersonBySsn(ssn), {
        keepPreviousData: true,
    });

    return {
        error,
        isError,
        isLoading,
        data: person,
    };
};

export default useFetchPerson;
