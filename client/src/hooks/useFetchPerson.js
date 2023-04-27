import { useQuery } from "@tanstack/react-query";

import { getPersonBySsn } from "../api/personsApi";

const useFetchPerson = (personInfo, ssn) => {
  const {
    isLoading,
    isError,
    error,
    data: person,
  } = useQuery(["persons", ssn], () => getPersonBySsn(ssn), {
    keepPreviousData: false,
  });

  return {
    error,
    isError,
    isLoading,
    data: person,
  };
};

export default useFetchPerson;
