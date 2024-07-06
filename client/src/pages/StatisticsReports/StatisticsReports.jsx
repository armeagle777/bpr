import { Flex } from "antd";

import { FiltersRowSkeleton } from "../../statisticsComponents";
import { FilterRow } from "./FilterRow";
import { useState } from "react";

const StatisticsReports = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Flex vertical>
      {isLoading ? <FiltersRowSkeleton /> : <FilterRow />}
      <p>Here will be the tables from photo "Ընդհանուր հաշվետվություններ"</p>
    </Flex>
  );
};

export default StatisticsReports;
