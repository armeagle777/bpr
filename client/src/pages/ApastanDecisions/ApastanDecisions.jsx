import { useState, useEffect } from "react";
import { Flex } from "antd";

import { DataTable, FiltersRowSkeleton } from "../../statisticsComponents";
import { FilterRow } from "./FilterRow";
import { MOCK_COLUMNS, MOCK_DEC_TYPES } from "./ApastanDecisions.constants";
import useFilterStatistics from "../../hooks/useFilterStatistics";
import {
  MOCK_MONTHS,
  MOCK_PERIODS,
  MOCK_YEARS,
  STATISTICS_TYPE_MAPS,
} from "../../utils/constants";

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
    filters,
    isLoading,
    isFetching,
    handleFilter,
    isInitialLoading,
    handleFilterChange,
    handleResetFilters,
  } = useFilterStatistics({ statisticsType: "ASYLUM_DECISIONS" });

  const exportExcelFilters = {
    ...filters,
    statisticsType: STATISTICS_TYPE_MAPS.ASYLUM_DECISIONS,
  };

  return (
    <Flex vertical>
      {fakeLoading ? (
        <FiltersRowSkeleton />
      ) : (
        <FilterRow
          filters={filters}
          years={MOCK_YEARS}
          months={MOCK_MONTHS}
          periods={MOCK_PERIODS}
          onFilter={handleFilter}
          decTypes={MOCK_DEC_TYPES}
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

export default ApastanDecisions;
