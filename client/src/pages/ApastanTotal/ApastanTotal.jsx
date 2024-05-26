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

const ApastanTotal = () => {
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
      {isLoading ? (
        <FiltersRowSkeleton />
      ) : (
        <FilterRow
          years={MOCK_YEARS}
          periods={MOCK_PERIODS}
          selectedYears={[2022]}
          seletedPeriods={[1]}
          onFilterCompanies={() => console.log("create this func")}
          isCompaniesLoading={isLoading}
        />
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

export default ApastanTotal;
