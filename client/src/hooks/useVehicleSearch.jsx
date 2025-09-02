import { useEffect, useState } from "react";

import { useSearchParams } from "react-router-dom";
import useFetchVehicles from "./useFetchVehicles";

const SEARCH_BASES = {
  PLATE_NUMBER: "number",
  SSN: "psn",
  VIN_CODE: "vin",
  CERTIFICATE_NUMBER: "cert_num",
};

export const useVehicleSearch = () => {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");
  const search_base = searchParams.get("search_base");
  const [searchBase, setSearchBase] = useState(search_base || "PLATE_NUMBER");

  const [certNumberInput, setCertNumberInput] = useState("");
  const [certificatesSearchParams, setCertificatesSearchParams] = useState({});

  useEffect(() => {
    if (q) {
      handleSubmitSearch(q, SEARCH_BASES[searchBase]);
    }
  }, [q]);

  const { data, isLoading, isFetching, isError, error } = useFetchVehicles(
    certificatesSearchParams
  );

  function handleSubmitSearch(q, searchBase) {
    if (!q && !certNumberInput) return;

    setCertificatesSearchParams({ q: q ?? certNumberInput, searchBase });
  }

  const handleBaseChange = (event, newBase) => {
    if (SEARCH_BASES[newBase]) {
      setSearchBase(newBase);
    }
  };

  return {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    certNumberInput,
    setCertNumberInput,
    handleSubmitSearch,
    SEARCH_BASES,
    searchBase,
    handleBaseChange,
  };
};

export default useVehicleSearch;
