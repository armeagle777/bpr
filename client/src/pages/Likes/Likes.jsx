import { Alert, Table } from "antd";
import { Box } from "@mui/material";
import useLikesData from "../../hooks/useLikesData";

const Likes = () => {
  const { isLoading, isError, error, data, columns, cancel } = useLikesData();

  if (isError) return <Alert severity="error">{error}</Alert>;

  return (
    <Box
      sx={{
        padding: "30px 10px",
      }}
    >
      <Table
        bordered
        dataSource={data}
        columns={columns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Box>
  );
};

export default Likes;
