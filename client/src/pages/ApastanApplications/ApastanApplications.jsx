import { useState, useEffect } from "react";
import { Flex } from "antd";

import { DataTable, FiltersRowSkeleton } from "../../statisticsComponents";
import { FilterRow } from "./FilterRow";
import {
  MOCK_COLUMNS,
  MOCK_YEARS,
  MOCK_PERIODS,
} from "./ApastanApplications.constants";
import useFilterStatistics from "../../hooks/useFilterStatistics";

const ApastanApplications = () => {
  const [fakeLoading, setFakeLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setFakeLoading(false);
    }, 2000);
  }, []);

  const {
    data,
    error,
    isError,
    isLoading,
    isFetching,
    handleFilter,
    isInitialLoading,
    handleFilterChange,
    handleResetFilters,
  } = useFilterStatistics({ statisticsType: "APPLICATIONS" });

  return (
    <Flex vertical>
      {fakeLoading ? (
        <FiltersRowSkeleton />
      ) : (
        <FilterRow
          isDataLoading={isFetching}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          years={MOCK_YEARS}
          periods={MOCK_PERIODS}
          onFilter={handleFilter}
        />
      )}
      <DataTable
        isLoading={isFetching}
        modifiedData={data}
        controlledColumns={MOCK_COLUMNS}
      />
    </Flex>
  );
};

export default ApastanApplications;
