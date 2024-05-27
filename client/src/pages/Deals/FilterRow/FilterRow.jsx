import { Flex, Button } from "antd";
import { FaFilter } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";

import translations from "../../../utils/translations/am.json";
import { FilterSelect } from "../../../statisticsComponents";

const FilterRow = ({
  years,
  periods,
  cliamTypes,
  reportTypes,
  countriesParams,
  companiesParams,
  onFilterCountries,
  onFilterCompanies,
}) => {
  const { FILTER_ROW } = translations;

  return (
    <Flex style={{ width: "60%", gap: 10 }}>
      <FilterSelect
        options={reportTypes}
        onChange={onFilterCountries}
        selectedValues={countriesParams}
        placeholder={FILTER_ROW.TYPE_PLACEHOLDER}
      />
      <FilterSelect
        options={years}
        onChange={onFilterCompanies}
        selectedValues={companiesParams}
        placeholder={FILTER_ROW.YEARS_PLACEHOLDER}
      />
      <FilterSelect
        options={periods}
        onChange={onFilterCompanies}
        selectedValues={companiesParams}
        placeholder={FILTER_ROW.PERIODS_PLACEHOLDER}
      />
      <FilterSelect
        options={cliamTypes}
        onChange={onFilterCompanies}
        selectedValues={companiesParams}
        placeholder={FILTER_ROW.CLAIM_TYPES_PLACEHOLDER}
      />
      <Button type="primary" icon={<FaFilter />}>
        {FILTER_ROW.FILTER_BTN_TITLE}
      </Button>
      <Button type="default" icon={<GrPowerReset />}>
        {FILTER_ROW.RESET_BTN_TITLE}
      </Button>
    </Flex>
  );
};

export default FilterRow;
