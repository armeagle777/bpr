import { Table } from "antd";

import { TableButtonRow } from "..";

const RowDataTable = ({
  isLoading,
  modifiedData,
  controlledColumns,
  filters,
}) => {
  return (
    <>
      <TableButtonRow filters={filters} />
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
