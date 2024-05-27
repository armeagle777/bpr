import { useState, useEffect } from "react";
import { Flex } from "antd";

import { DataTable, FiltersRowSkeleton } from "../../statisticsComponents";
import { FilterRow } from "./FilterRow";
import {
  MOCK_COLUMNS,
  MOCK_DATA,
  MOCK_YEARS,
  MOCK_PERIODS,
} from "./ApastanTotal.constants";
import useFilterStatistics from "../../hooks/useFilterStatistics";

const ApastanTotal = () => {
  const [fakeData, setFakeData] = useState([]);
  const [fakeLoading, setFakeLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setFakeLoading(false);
      setFakeData(MOCK_DATA);
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
  } = useFilterStatistics();

  return (
    <Flex vertical>
      {fakeLoading ? (
        <FiltersRowSkeleton />
      ) : (
        <FilterRow
          years={MOCK_YEARS}
          periods={MOCK_PERIODS}
          onFilter={handleFilter}
          isDataLoading={isFetching}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
        />
      )}
      <DataTable
        isLoading={fakeLoading}
        modifiedData={fakeData}
        dropdownOptions={[]}
        controlledColumns={MOCK_COLUMNS}
      />
    </Flex>
  );
};

export default ApastanTotal;
