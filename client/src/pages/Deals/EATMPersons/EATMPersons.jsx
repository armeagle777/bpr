import React from "react";
import { DataTable } from "../../../statisticsComponents";
import {
  MOCK_COLUMNS,
  MOCK_DATA,
} from "../../WorkPermitStats/WorkPermitStats.constants";

const EATMPersons = ({ isLoading }) => {
  return (
    <DataTable
      isLoading={isLoading}
      modifiedData={MOCK_DATA}
      dropdownOptions={[]}
      controlledColumns={MOCK_COLUMNS}
    />
  );
};

export default EATMPersons;
