import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const useFilterStatistics = () => {
  const query = useQuery();
  const history = useHistory();
  const [filters, setFilters] = useState({
    category: query.get("category") || "",
    sort: query.get("sort") || "asc",
  });

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.search) params.set("search", filters.search);
    if (filters.category) params.set("category", filters.category);
    if (filters.sort) params.set("sort", filters.sort);
    history.replace({ search: params.toString() });
  }, [filters, history]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return {};
};

export default useFilterStatistics;
