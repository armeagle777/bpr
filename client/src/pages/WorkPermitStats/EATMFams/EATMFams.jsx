import React from "react";
import { DataTable } from "../../../statisticsComponents";
import { MOCK_COLUMNS } from "../WorkPermitStats.constants";

const EATMFams = ({ isLoading, data }) => {
  return (
    <DataTable
      isLoading={isLoading}
      modifiedData={data}
      controlledColumns={MOCK_COLUMNS}
    />
  );
};

export default EATMFams;
