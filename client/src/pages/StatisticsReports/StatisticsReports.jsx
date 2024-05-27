import { useState } from "react";
import { Flex } from "antd";

import { FiltersRowSkeleton } from "../../statisticsComponents";
import { FilterRow } from "./FilterRow";

const StatisticsReports = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [fakeData, setFakeData] = useState([]);

  return (
    <Flex vertical>
      {isLoading ? <FiltersRowSkeleton /> : <FilterRow />}
      <p>Here will be the tables from photo "Ընդհանուր հաշվետվություններ"</p>
    </Flex>
  );
};

export default StatisticsReports;
