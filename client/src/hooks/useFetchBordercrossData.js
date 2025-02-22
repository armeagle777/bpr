import { useQueries, useQuery } from "@tanstack/react-query";

import { getBordercrossDataBySsn } from "../api/personsApi";

const useFetchBordercrossData = (documents) => {
  const queries = useQueries({
    queries: documents.map((doc) => ({
      queryKey: ["bordercross-data", doc.Document_Number],
      queryFn: () =>
        getBordercrossDataBySsn({
          passportNumber: doc.Document_Number,
          citizenship:
            doc.Person?.Citizenship?.Citizenship[0]?.CountryShortName,
        }),
      enabled: !!doc.Document_Number, // Prevents unnecessary calls if no passport number
      keepPreviousData: true,
    })),
  });

  const isLoading = queries.some((query) => query.isLoading);
  const isError = queries.some((query) => query.isError);
  const error = queries?.find((q) => q.error);
  const mergedDatas = queries
    ?.filter((query) => query.data)
    ?.map((query) => query.data)
    ?.reduce((acc, obj) => {
      Object.entries(obj).forEach(([key, value]) => {
        acc[key] = acc[key] ? [...acc[key], ...value] : [...value];
      });
      return acc;
    }, {});
  console.log("mergedDatas", mergedDatas);
  return {
    isError,
    error,
    isLoading,
    data: mergedDatas,
  };
};

export default useFetchBordercrossData;
