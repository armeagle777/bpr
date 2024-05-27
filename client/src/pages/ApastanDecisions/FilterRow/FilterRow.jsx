import { Flex, Button } from "antd";
import { FaFilter } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";

import { FilterSelect } from "../../../statisticsComponents";
import translations from "../../../utils/translations/am.json";

const FilterRow = ({
  years,
  decTypes,
  periods,
  selectedYears,
  selectedDecTypes,
  seletedPeriods,
  onFilterCompanies,
  onFilterDecTypes,
  isCompaniesLoading,
}) => {
  const { FILTER_ROW } = translations;
  return (
    <Flex style={{ width: "60%", gap: 10 }}>
      <FilterSelect
        options={decTypes}
        onChange={onFilterDecTypes}
        isLoading={isCompaniesLoading}
        selectedValues={selectedDecTypes}
        placeholder={FILTER_ROW.MULTY_DECTYPES_PLACEHOLDER}
      />
      <FilterSelect
        options={years}
        onChange={onFilterCompanies}
        isLoading={isCompaniesLoading}
        selectedValues={selectedYears}
        placeholder={FILTER_ROW.YEARS_PLACEHOLDER}
      />
      <FilterSelect
        options={periods}
        onChange={onFilterCompanies}
        isLoading={isCompaniesLoading}
        selectedValues={seletedPeriods}
        placeholder={FILTER_ROW.PERIODS_PLACEHOLDER}
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
