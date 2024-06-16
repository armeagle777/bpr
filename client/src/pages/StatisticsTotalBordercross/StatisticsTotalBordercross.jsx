import { useState, useEffect } from "react";
import { Flex } from "antd";

import { FilterRow } from "./FilterRow";
import { DataTable, FiltersRowSkeleton } from "../../statisticsComponents";
import { BORDERCROSS_TYPES, MOCK_COLUMNS } from "./constants";
import useFilterStatistics from "../../hooks/useFilterStatistics";
import { MOCK_MONTHS, MOCK_PERIODS, MOCK_YEARS } from "../../utils/constants";

const StatisticsTotalBordercross = () => {
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
    filters,
    handleFilter,
    isInitialLoading,
    handleFilterChange,
    handleResetFilters,
  } = useFilterStatistics({ statisticsType: "BORDERCROSS_TOTAL" });

  return (
    <Flex vertical>
      {fakeLoading ? (
        <FiltersRowSkeleton />
      ) : (
        <FilterRow
          filters={filters}
          years={MOCK_YEARS}
          types={BORDERCROSS_TYPES}
          periods={MOCK_PERIODS}
          months={MOCK_MONTHS}
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

export default StatisticsTotalBordercross;
