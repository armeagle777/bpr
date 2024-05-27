import { useState, useEffect } from "react";
import { Flex } from "antd";

import { DataTable, FiltersRowSkeleton } from "../../statisticsComponents";
import { MOCK_COLUMNS, MOCK_DATA } from "./constants";
import { FilterRow } from "./FilterRow";

const StatisticsTypeBordercross = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [fakeData, setFakeData] = useState([]);
  const [pointsValue, setPointsValue] = useState(["Bavra"]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      setFakeData(MOCK_DATA);
    }, 2000);
  }, []);

  return (
    <Flex vertical>
      {isLoading ? (
        <FiltersRowSkeleton />
      ) : (
        <FilterRow pointsValue={pointsValue} />
      )}
      <DataTable
        isLoading={isLoading}
        modifiedData={fakeData}
        dropdownOptions={[]}
        controlledColumns={MOCK_COLUMNS}
      />
    </Flex>
  );
};

export default StatisticsTypeBordercross;
