import { useEffect, useState } from "react";
import { Flex } from "antd";

import { FilterRow } from "./FilterRow";
import { DataTable, FiltersRowSkeleton } from "../../statisticsComponents";
import { MOCK_COLUMNS } from "./constants";
import useFilterStatistics from "../../hooks/useFilterStatistics";
import {
  MOCK_MONTHS,
  MOCK_PERIODS,
  STATISTICS_TYPE_MAPS,
} from "../../utils/constants";
import useStatisticsPeriodsData from "../../hooks/useStatisticsPeriodsData";

const StatisticsCountryBordercross = () => {
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
  } = useFilterStatistics({ statisticsType: "BORDERCROSS_COUNTRIES" });

  const totals = data.reduce(
    (acc, item) => {
      acc.air_in += +item.air_in;
      acc.air_out += +item.air_out;
      acc.air_net += +item.air_net;
      acc.land_in += +item.land_in;
      acc.land_out += +item.land_out;
      acc.land_net += +item.land_net;
      acc.railway_in += +item.railway_in;
      acc.railway_out += +item.railway_out;
      acc.railway_net += +item.railway_net;
      return acc;
    },
    {
      country: "Ընդամենը",
      air_in: 0,
      air_out: 0,
      air_net: 0,
      land_in: 0,
      land_out: 0,
      land_net: 0,
      railway_in: 0,
      railway_out: 0,
      railway_net: 0,
    }
  );
  const dataWithTotals = [totals, ...data];
  const exportExcelFilters = {
    ...filters,
    statisticsType: STATISTICS_TYPE_MAPS.B_CROSS_COUNTRIES,
  };

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

export default StatisticsCountryBordercross;
