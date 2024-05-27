import { useEffect, useState } from "react";
import { Flex } from "antd";
import { FilterRow } from "./FilterRow";
import { DataTable, FiltersRowSkeleton } from "../../statisticsComponents";
import { MOCK_COLUMNS, MOCK_DATA } from "./constants";

const StatisticsCountryBordercross = () => {
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
      {isLoading ? <FiltersRowSkeleton /> : <FilterRow />}
      <DataTable
        isLoading={isLoading}
        modifiedData={fakeData}
        dropdownOptions={[]}
        controlledColumns={MOCK_COLUMNS}
      />
    </Flex>
  );
};

export default StatisticsCountryBordercross;
