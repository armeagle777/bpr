import { Flex } from "antd";

import { FilterSelect } from "../../statisticsComponents";
import translations from "../../utils/translations/am.json";

const WpFilterRow = ({
  years,
  periods,
  cliamTypes,
  reportTypes,
  countriesParams,
  companiesParams,
  onFilterCountries,
  onFilterCompanies,
  isCountriesLoading,
  isCompaniesLoading,
}) => {
  const { WP_FILTER_ROW } = translations;
  return (
    <Flex style={{ width: "60%", gap: 10 }}>
      <FilterSelect
        options={reportTypes}
        onChange={onFilterCountries}
        isLoading={isCountriesLoading}
        selectedValues={countriesParams}
        placeholder={WP_FILTER_ROW.TYPE_PLACEHOLDER}
      />
      <FilterSelect
        options={years}
        onChange={onFilterCompanies}
        isLoading={isCompaniesLoading}
        selectedValues={companiesParams}
        placeholder={WP_FILTER_ROW.YEARS_PLACEHOLDER}
      />
      <FilterSelect
        options={periods}
        onChange={onFilterCompanies}
        isLoading={isCompaniesLoading}
        selectedValues={companiesParams}
        placeholder={WP_FILTER_ROW.PERIODS_PLACEHOLDER}
      />
      <FilterSelect
        options={cliamTypes}
        onChange={onFilterCompanies}
        isLoading={isCompaniesLoading}
        selectedValues={companiesParams}
        placeholder={WP_FILTER_ROW.CLAIM_TYPES_PLACEHOLDER}
      />
    </Flex>
  );
};

export default WpFilterRow;
