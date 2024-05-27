import { Flex, Button } from "antd";
import { FaFilter } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";

import { FilterSelect } from "../../../statisticsComponents";
import translations from "../../../utils/translations/am.json";

const FilterRow = ({
  years,
  periods,
  onFilter,
  onFilterChange,
  isDataLoading,
  onResetFilters,
}) => {
  const { FILTER_ROW } = translations;
  return (
    <Flex style={{ width: "60%", gap: 10 }}>
      <FilterSelect
        options={years}
        onChange={(e) => onFilterChange({ name: "year", value: e })}
        placeholder={FILTER_ROW.YEARS_PLACEHOLDER}
      />
      <FilterSelect
        options={periods}
        onChange={(e) => onFilterChange({ name: "period", value: e })}
        placeholder={FILTER_ROW.PERIODS_PLACEHOLDER}
      />
      <Button
        type="primary"
        icon={<FaFilter />}
        onClick={onFilter}
        loading={isDataLoading}
      >
        {FILTER_ROW.FILTER_BTN_TITLE}
      </Button>
      <Button type="default" icon={<GrPowerReset />} onClick={onResetFilters}>
        {FILTER_ROW.RESET_BTN_TITLE}
      </Button>
    </Flex>
  );
};

export default FilterRow;
