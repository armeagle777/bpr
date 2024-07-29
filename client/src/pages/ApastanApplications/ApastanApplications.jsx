import { useState, useEffect } from "react";
import { Flex } from "antd";

import { DataTable, FiltersRowSkeleton } from "../../statisticsComponents";
import { FilterRow } from "./FilterRow";
import { MOCK_COLUMNS } from "./ApastanApplications.constants";
import useFilterStatistics from "../../hooks/useFilterStatistics";
import {
  MOCK_MONTHS,
  MOCK_PERIODS,
  STATISTICS_TYPE_MAPS,
} from "../../utils/constants";
import useStatisticsPeriodsData from "../../hooks/useStatisticsPeriodsData";

const ApastanApplications = () => {
  const {
    data: years,
    isLoading: isYearsLoading,
    isFetching: isYearsFetching,
    isError: isYearsError,
    error: yearsError,
  } = useStatisticsPeriodsData({ statisticsType: "ASYLUM" });

  const {
    data,
    error,
    isError,
    filters,
    isLoading,
    isFetching,
    handleFilter,
    isInitialLoading,
    handleFilterChange,
    handleResetFilters,
  } = useFilterStatistics({ statisticsType: "ASYLUM_APPLICATIONS" });

  const exportExcelFilters = {
    ...filters,
    statisticsType: STATISTICS_TYPE_MAPS.ASYLUM_APPLICATIONS,
  };

  return (
    <Flex vertical>
      {isYearsFetching ? (
        <FiltersRowSkeleton />
      ) : (
        <FilterRow
          filters={filters}
          years={years}
          months={MOCK_MONTHS}
          periods={MOCK_PERIODS}
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

export default ApastanApplications;
