import { useEffect, useState } from "react";
import { Flex } from "antd";

import { FilterRow } from "./FilterRow";
import { DataTable, FiltersRowSkeleton } from "../../statisticsComponents";
import { MOCK_COLUMNS } from "./constants";
import useFilterStatistics from "../../hooks/useFilterStatistics";
import {
  MOCK_MONTHS,
  MOCK_PERIODS,
  MOCK_YEARS,
  STATISTICS_TYPE_MAPS,
} from "../../utils/constants";

const StatisticsCountryBordercross = () => {
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
  } = useFilterStatistics({ statisticsType: "BORDERCROSS_COUNTRIES" });

  const exportExcelFilters = {
    ...filters,
    statisticsType: STATISTICS_TYPE_MAPS.B_CROSS_COUNTRIES,
  };

  return (
    <Flex vertical>
      {fakeLoading ? (
        <FiltersRowSkeleton />
      ) : (
        <FilterRow
          filters={filters}
          years={MOCK_YEARS}
          periods={MOCK_PERIODS}
          months={MOCK_MONTHS}
          onFilter={handleFilter}
          isDataLoading={isFetching}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
        />
      )}
      <DataTable
        filters={exportExcelFilters}
        isLoading={isFetching}
        modifiedData={data}
        controlledColumns={MOCK_COLUMNS}
      />
    </Flex>
  );
};

export default StatisticsCountryBordercross;
