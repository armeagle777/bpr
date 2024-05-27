import { Table } from "antd";

import { TableButtonRow } from "..";

const RowDataTable = ({ isLoading, modifiedData, controlledColumns }) => {
  return (
    <>
      <TableButtonRow />
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
