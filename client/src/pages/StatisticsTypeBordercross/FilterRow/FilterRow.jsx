import { Flex, Button } from "antd";
import { FaFilter } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";

import { FilterMultySelect } from "../../../statisticsComponents";
import translations from "../../../utils/translations/am.json";
import {
  MOCK_YEARS_OPTIONS,
  MOCK_PERIODS_OPTIONS,
  MOCK_TYPES_OPTIONS,
  MOCK_POINTS_OPTIONS,
} from "../constants";

const FilterRow = ({ pointsValue }) => {
  const { FILTER_ROW } = translations;
  return (
    <Flex style={{ width: "60%", gap: 10 }}>
      <FilterMultySelect
        placeholder={FILTER_ROW.MULTY_YEARS_PLACEHOLDER}
        options={MOCK_YEARS_OPTIONS}
      />
      <FilterMultySelect
        placeholder={FILTER_ROW.MULTY_PERIODS_PLACEHOLDER}
        options={MOCK_PERIODS_OPTIONS}
      />
      <FilterMultySelect
        placeholder={FILTER_ROW.MULTY_TYPES_PLACEHOLDER}
        options={MOCK_TYPES_OPTIONS}
      />
      <FilterMultySelect
        placeholder={FILTER_ROW.MULTY_POINTS_PLACEHOLDER}
        options={MOCK_POINTS_OPTIONS}
        value={pointsValue}
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
