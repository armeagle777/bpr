import { useEffect, useState } from "react";

import useFetchKadastrCertificates from "./useFetchKadastrCertificates";
import { useSearchParams } from "react-router-dom";

const SEARCH_BASES = {
  CERT_NUMBER: "cert_number",
  SSN: "ssn",
  TAX_NUMBER: "tax_number",
  UNIT_ID: "unit_id",
  BLD_CODE: "bld_code",
  PARCEL_CODE: "parcel_code",
};

const useKadastreCerts = () => {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");
  const search_base = searchParams.get("search_base");

  const [searchBase, setSearchBase] = useState(search_base || "CERT_NUMBER");
  const [certNumberInput, setCertNumberInput] = useState("");
  const [certificatesSearchParams, setCertificatesSearchParams] = useState({});

  useEffect(() => {
    if (q) {
      handleSubmitSearch(q, SEARCH_BASES[searchBase]);
    }
  }, [q]);

  const { data, isLoading, isFetching, isError, error } =
    useFetchKadastrCertificates(certificatesSearchParams);

  const handleSubmitSearch = (q, searchBase) => {
    if (!q && !certNumberInput) return;

    setCertificatesSearchParams({ q: q ?? certNumberInput, searchBase });
  };

  const handleBaseChange = (event, newBase) => {
    if (SEARCH_BASES[newBase]) {
      setSearchBase(newBase);
    }
  };

  return {
    data,
    error,
    isError,
    isLoading,
    isFetching,
    SEARCH_BASES,
    searchBase,
    certNumberInput,
    setCertNumberInput,
    handleSubmitSearch,
    handleBaseChange,
  };
};

export default useKadastreCerts;
