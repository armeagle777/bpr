import DataTable from "../../components/DataTable/DataTable";
import {
  MOCK_COLUMNS,
  MOCK_PERIODS,
  MOCK_REPORT_TYPES,
  MOCK_YEARS,
  MOCK_CLAIM_TYPES,
  MOCK_DATA,
} from "./WorkPermit.constants";

const WorkPermitStats = () => {
  return (
    <DataTable
      years={MOCK_YEARS}
      reportTypes={MOCK_REPORT_TYPES}
      periods={MOCK_PERIODS}
      cliamTypes={MOCK_CLAIM_TYPES}
      isLoading={false}
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
  );
};

export default WorkPermitStats;
