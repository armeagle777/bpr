import { Table } from "antd";

import TableTitleRow from "./TableTitleRow";

const DataTable = ({
  years,
  reportTypes,
  periods,
  cliamTypes,
  isLoading,
  modifiedData,
  countriesParams,
  dropdownOptions,
  companiesParams,
  controlledColumns,
  isCompaniesLoading,
  isCountriesLoading,
  handleFilterCountries,
  handleFilterCompanies,
}) => {
  return (
    <>
      <TableTitleRow
        dropdownOptions={dropdownOptions}
        countriesParams={countriesParams}
        companiesParams={companiesParams}
        years={years}
        reportTypes={reportTypes}
        periods={periods}
        cliamTypes={cliamTypes}
        isCountriesLoading={isCountriesLoading}
        isCompaniesLoading={isCompaniesLoading}
        onFilterCountries={handleFilterCountries}
        onFilterCompanies={handleFilterCompanies}
      />

      <Table
        columns={controlledColumns}
        dataSource={modifiedData}
        loading={isLoading}
        // scroll={{
        //   x: 1000,
        // }}
        style={{
          marginTop: 8,
        }}
      />
    </>
  );
};

export default DataTable;
