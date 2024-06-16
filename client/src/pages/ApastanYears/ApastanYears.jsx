import { Flex } from "antd";

import { DataTable } from "../../statisticsComponents";

import { MOCK_COLUMNS } from "./ApastanYears.constants";
import useFilterStatistics from "../../hooks/useFilterStatistics";
import { useEffect } from "react";

const ApastanYears = () => {
  const {
    data,
    error,
    isError,
    isLoading,
    isFetching,
    handleFilter,
    refetch,
    isInitialLoading,
    handleFilterChange,
    handleResetFilters,
  } = useFilterStatistics({ statisticsType: "ASYLUM_YEARS" });

  useEffect(() => {
    refetch();
  }, []);
  console.log("data:::::: ", data);
  const fakeData = [];
  return (
    <Flex vertical>
      <DataTable
        isLoading={isFetching}
        modifiedData={fakeData}
        controlledColumns={MOCK_COLUMNS}
      />
    </Flex>
  );
};

export default ApastanYears;
