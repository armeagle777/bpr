import { useState, useEffect } from "react";
import { Flex } from "antd";

import { DataTable } from "../../statisticsComponents";

import { MOCK_COLUMNS, MOCK_DATA } from "./ApastanYears.constants";

const ApastanYears = () => {
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
      <DataTable
        isLoading={isLoading}
        modifiedData={fakeData}
        dropdownOptions={[]}
        controlledColumns={MOCK_COLUMNS}
      />
    </Flex>
  );
};

export default ApastanYears;
