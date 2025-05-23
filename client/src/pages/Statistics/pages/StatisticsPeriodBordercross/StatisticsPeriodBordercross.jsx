import { useState, useEffect } from "react";
import { Flex } from "antd";

import { FilterRow } from "./FilterRow";
import {
  DataTable,
  FiltersRowSkeleton,
} from "../../../../statisticsComponents";
import { MOCK_COLUMNS } from "./constants";
import useFilterStatistics from "../../../../hooks/useFilterStatistics";
import {
  MOCK_PERIODS,
  MOCK_MONTHS,
  STATISTICS_TYPE_MAPS,
} from "../../../../utils/constants";
import useStatisticsPeriodsData from "../../../../hooks/useStatisticsPeriodsData";
import { addTotals } from "../../../../utils/helperFunctions";

const StatisticsPeriodBordercross = () => {
  const {
    data: years,
    isLoading: isYearsLoading,
    isFetching: isYearsFetching,
    isError: isYearsError,
    error: yearsError,
  } = useStatisticsPeriodsData({ statisticsType: "BORDERCROSS" });

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
  } = useFilterStatistics({ statisticsType: "BORDERCROSS_PERIODS" });

  const exportExcelFilters = {
    ...filters,
    statisticsType: STATISTICS_TYPE_MAPS.B_CROSS_PERIOD,
  };
  const dataWithTotals = addTotals(data);
  return (
    <Flex vertical>
      {isYearsFetching ? (
        <FiltersRowSkeleton />
      ) : (
        <FilterRow
          filters={filters}
          years={years}
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
        modifiedData={dataWithTotals}
        controlledColumns={MOCK_COLUMNS}
      />
    </Flex>
  );
};

export default StatisticsPeriodBordercross;
