import { Flex } from "antd";

import { FiltersRowSkeleton } from "../../statisticsComponents";
import { FilterRow } from "./FilterRow";
import useStatisticsPeriodsData from "../../hooks/useStatisticsPeriodsData";

const AsylumReports = () => {
  const {
    data: years,
    isLoading: isYearsLoading,
    isFetching: isYearsFetching,
    isError: isYearsError,
    error: yearsError,
  } = useStatisticsPeriodsData({ statisticsType: "ASYLUM" });

  return (
    <Flex vertical>
      {isYearsFetching ? <FiltersRowSkeleton /> : <FilterRow years={years} />}
    </Flex>
  );
};

export default AsylumReports;
