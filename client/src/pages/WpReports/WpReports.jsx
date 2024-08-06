import { Flex } from "antd";

import { FiltersRowSkeleton } from "../../statisticsComponents";
import { FilterRow } from "./FilterRow";
import { useState } from "react";
import useStatisticsPeriodsData from "../../hooks/useStatisticsPeriodsData";

const WpReports = () => {
  const {
    data: years,
    isLoading: isYearsLoading,
    isFetching: isYearsFetching,
    isError: isYearsError,
    error: yearsError,
  } = useStatisticsPeriodsData({ statisticsType: "WP" });
  return (
    <Flex vertical>
      {isYearsFetching ? <FiltersRowSkeleton /> : <FilterRow years={years} />}
    </Flex>
  );
};

export default WpReports;
