import { useState, useEffect } from "react";
import { Flex } from "antd";

import { FilterRow } from "./FilterRow";
import { DataTable, FiltersRowSkeleton } from "../../statisticsComponents";
import { BORDERCROSS_TYPES, MOCK_COLUMNS } from "./constants";
import useFilterStatistics from "../../hooks/useFilterStatistics";
import {
  MOCK_MONTHS,
  MOCK_PERIODS,
  STATISTICS_TYPE_MAPS,
} from "../../utils/constants";
import useStatisticsPeriodsData from "../../hooks/useStatisticsPeriodsData";

const StatisticsTotalBordercross = () => {
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
  } = useFilterStatistics({ statisticsType: "BORDERCROSS_TOTAL" });

  const totals = data.reduce(
    (acc, item) => {
      acc.arm_in += +item.arm_in;
      acc.arm_out += +item.arm_out;
      acc.arm_net += +item.arm_net;
      acc.other_in += +item.other_in;
      acc.other_out += +item.other_out;
      acc.other_net += +item.other_net;
      acc.total_in += +item.total_in;
      acc.total_out += +item.total_out;
      acc.total_net += +item.total_net;
      return acc;
    },
    {
      key: "Ընդամենը",
      main_column: "Ընդամենը",
      arm_in: 0,
      arm_out: 0,
      arm_net: 0,
      other_in: 0,
      other_out: 0,
      other_net: 0,
      total_in: 0,
      total_out: 0,
      total_net: 0,
    }
  );
  const dataWithTotals = [totals, ...data];

  const exportExcelFilters = {
    ...filters,
    statisticsType: STATISTICS_TYPE_MAPS.B_CROSS_TOTAL,
  };

  return (
    <Flex vertical>
      {isYearsFetching ? (
        <FiltersRowSkeleton />
      ) : (
        <FilterRow
          filters={filters}
          years={years}
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
        filters={exportExcelFilters}
        modifiedData={dataWithTotals}
        isLoading={isFetching}
        controlledColumns={MOCK_COLUMNS}
      />
    </Flex>
  );
};

export default StatisticsTotalBordercross;
