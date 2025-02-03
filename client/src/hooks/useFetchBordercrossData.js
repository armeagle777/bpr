import { useQuery } from "@tanstack/react-query";

import { getBordercrossDataBySsn } from "../api/personsApi";

const useFetchBordercrossData = (personData) => {
  const { isLoading, isError, error, data } = useQuery(
    ["bordercross-data", personData],
    () => getBordercrossDataBySsn(personData),
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

export default useFetchBordercrossData;
