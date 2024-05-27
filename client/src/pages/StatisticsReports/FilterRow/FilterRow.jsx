import { Flex, Button } from "antd";
import { FaFilter, FaFileExcel } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";

import translations from "../../../utils/translations/am.json";
import { FilterMultySelect } from "../../../statisticsComponents";
import {
  MOCK_PERIODS_OPTIONS,
  MOCK_COUNTRIES_OPTIONS,
  MOCK_YEARS_OPTIONS,
} from "../constants";

const FilterRow = ({}) => {
  const { FILTER_ROW } = translations;
  return (
    <Flex style={{ width: "60%", gap: 10 }}>
      <FilterMultySelect
        placeholder={FILTER_ROW.MULTY_COUNTRIES_PLACEHOLDER}
        options={MOCK_COUNTRIES_OPTIONS}
      />
      <FilterMultySelect
        placeholder={FILTER_ROW.MULTY_YEARS_PLACEHOLDER}
        options={MOCK_YEARS_OPTIONS}
      />
      <FilterMultySelect
        placeholder={FILTER_ROW.MULTY_PERIODS_PLACEHOLDER}
        options={MOCK_PERIODS_OPTIONS}
      />
      <Button type="primary" icon={<FaFileExcel />}>
        {FILTER_ROW.EXPORT_BTN_TITLE}
      </Button>
      <Button type="default" icon={<GrPowerReset />}>
        {FILTER_ROW.RESET_BTN_TITLE}
      </Button>
    </Flex>
  );
};

export default FilterRow;
