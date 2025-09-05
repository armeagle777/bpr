import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import useFetchBusiness from "./useFetchBusiness";

const useCompaniesData = () => {
  const [taxIdInputValue, setTaxIdInputValue] = useState("");
  const [companySearchParams, setCompanySearchParams] = useState(null);
  const { taxId } = useParams();

  useEffect(() => {
    if (taxId) {
      handleSubmitSearch(taxId);
    }
  }, [taxId]);

  const { data, isLoading, isFetching, isError, error } =
    useFetchBusiness(companySearchParams);

  function handleSubmitSearch(taxId) {
    if (!taxId && !taxIdInputValue) return;

    setCompanySearchParams(taxId ? taxId : taxIdInputValue);
  }

  return {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    taxIdInputValue,
    setTaxIdInputValue,
    handleSubmitSearch,
  };
};

export default useCompaniesData;
