import { useState, useEffect } from "react";
import { Flex } from "antd";

import { DataTable, FiltersRowSkeleton } from "../../statisticsComponents";
import { WpFilterRow } from "./WpFilterRow";
import { MOCK_COLUMNS, MOCK_DATA } from "./WorkPermitStats.constants";

const WorkPermitStats = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [fakeData, setFakeData] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      setFakeData(MOCK_DATA);
    }, 2000);
  }, []);

  return (
    <Flex vertical>
      {isLoading ? <FiltersRowSkeleton /> : <WpFilterRow />}
      <DataTable
        isLoading={isLoading}
        modifiedData={fakeData}
        dropdownOptions={[]}
        controlledColumns={MOCK_COLUMNS}
      />
    </Flex>
  );
};

export default WorkPermitStats;
