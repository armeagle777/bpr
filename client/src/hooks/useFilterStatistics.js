import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getAsylumStatistics } from "../api/statisticsApi";

const useQueryParams = () => {
  return new URLSearchParams(useLocation().search);
};

const useFilterStatistics = () => {
  const queryParams = useQueryParams();
  const navigate = useNavigate();

  const initialFilters = {
    year: queryParams.get("year") || "",
    period: queryParams.get("period") || "",
  };
  const [filters, setFilters] = useState(initialFilters);

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.year) params.set("year", filters.year);
    if (filters.period) params.set("period", filters.period);

    navigate({ search: params.toString() }, { replace: true });
  }, [filters, navigate]);

  const handleFilterChange = (e) => {
    const { name, value } = e;

    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const statisticsEndpoints = {
    TOTAL: "/total",
  };

  const {
    data = [],
    isLoading,
    isFetching,
    isInitialLoading,
    isError,
    error,
    refetch,
  } = useQuery(
    ["statistics-asylum", filters],
    () => getAsylumStatistics(filters, statisticsEndpoints.TOTAL),
    {
      keepPreviousData: false,
      enabled: false,
    }
  );

  const handleFilter = () => {
    refetch();
  };

  const handleResetFilters = () => {
    setFilters({ ...initialFilters });
  };

  return {
    data,
    error,
    isError,
    isLoading,
    isFetching,
    handleFilter,
    isInitialLoading,
    handleFilterChange,
    handleResetFilters,
  };
};

export default useFilterStatistics;
