import { useState } from "react";
import { Flex } from "antd";

import {
  DataTable,
  FiltersRowSkeleton,
  WpFilterRow,
} from "../../statisticsComponents";
import {
  MOCK_COLUMNS,
  MOCK_PERIODS,
  MOCK_REPORT_TYPES,
  MOCK_YEARS,
  MOCK_CLAIM_TYPES,
  MOCK_DATA,
} from "./WorkPermitStats.constants";

const WorkPermitStats = () => {
  const [isLoading, setIsLoading] = useState(true);

  return isLoading ? (
    <FiltersRowSkeleton />
  ) : (
    <Flex vertical>
      <WpFilterRow />
      <DataTable
        years={MOCK_YEARS}
        reportTypes={MOCK_REPORT_TYPES}
        periods={MOCK_PERIODS}
        cliamTypes={MOCK_CLAIM_TYPES}
        isLoading={isLoading}
        modifiedData={MOCK_DATA}
        countriesParams={[]}
        dropdownOptions={[]}
        companiesParams={[]}
        controlledColumns={MOCK_COLUMNS}
        handleFilterCountries={() => console.log("handleFilterCountries")}
        isCompaniesLoading={false}
        isCountriesLoading={false}
        handleFilterCompanies={() => console.log("handleFilterCompanies")}
      />
    </Flex>
  );
};

export default WorkPermitStats;
