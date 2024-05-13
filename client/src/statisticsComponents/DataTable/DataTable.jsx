import { Table } from "antd";

import { TableButtonRow } from "..";

const RowDataTable = ({
  isLoading,
  modifiedData,
  dropdownOptions,
  controlledColumns,
}) => {
  return (
    <>
      <TableButtonRow dropdownOptions={dropdownOptions} />
      <Table
        pagination={false}
        loading={isLoading}
        dataSource={modifiedData}
        columns={controlledColumns}
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

export default RowDataTable;
