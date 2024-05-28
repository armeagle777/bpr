import { useState, useEffect } from "react";
import { Flex } from "antd";

import { DataTable, FiltersRowSkeleton } from "../../statisticsComponents";
import { FilterRow } from "./FilterRow";
import {
  MOCK_COLUMNS,
  MOCK_YEARS,
  MOCK_PERIODS,
  MOCK_DEC_TYPES,
} from "./ApastanDecisions.constants";
import useFilterStatistics from "../../hooks/useFilterStatistics";

const ApastanDecisions = () => {
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
  } = useFilterStatistics({ statisticsType: "DECISIONS" });

  return (
    <Flex vertical>
      {fakeLoading ? (
        <FiltersRowSkeleton />
      ) : (
        <FilterRow
          years={MOCK_YEARS}
          decTypes={MOCK_DEC_TYPES}
          periods={MOCK_PERIODS}
          onFilter={handleFilter}
          isDataLoading={isFetching}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
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

export default ApastanDecisions;
