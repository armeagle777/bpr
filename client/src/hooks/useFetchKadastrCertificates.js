import { useQuery } from "@tanstack/react-query";

import { getKadastrCertByNumber } from "../api/personsApi";

const useFetchKadastrCertificates = ({ q, searchBase }) => {
  console.log("q", q);
  console.log("searchBase", searchBase);
  const { isFetching, isLoading, isError, error, data } = useQuery(
    ["kadastr-certificates", q, searchBase],
    () => getKadastrCertByNumber(q, searchBase),
    {
      keepPreviousData: true,
      enabled: !!q,
    }
  );

  return {
    error,
    isError,
    isFetching,
    isLoading,
    data,
  };
};

export default useFetchKadastrCertificates;
