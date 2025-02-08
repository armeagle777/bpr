import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import { Stack, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";

import TableBody from "./TableBody";
import TableHead from "./TableHead";

const BordercrossTable = ({ title = "", data }) => {
  // Generate columns dynamically
  const columns =
    Object.keys(data[0])?.map((key) => ({
      field: key,
      headerName: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize first letter
      width: 180,
      valueGetter: (params) => {
        if (key.includes("date") || key.includes("datetime")) {
          return new Date(params.row[key]).toLocaleString();
        }
        return params.row[key];
      },
    })) || [];

  // Generate rows dynamically
  const rows =
    data?.map((item, index) => ({
      id: index + 1, // MUI DataGrid requires an 'id' field
      ...item,
    })) || [];

  return (
    <Stack spacing={1} sx={{ mb: 2 }}>
      <Typography variant="body2" component="span">
        {title}
      </Typography>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 700 }}
          size="small"
          aria-label="customized table"
        >
          <TableHead columns={columns} />
          <TableBody rows={rows} />
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default BordercrossTable;
