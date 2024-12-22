import { Alert, Table } from "antd";
import Dialog from "@mui/material/Dialog";
import { Box, Grid, Typography, TextField } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Slide from "@mui/material/Slide";
import Toolbar from "@mui/material/Toolbar";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import PdfViewer from "../../components/pdfViewer/PdfViewer";

import PageTitle from "../../components/PageTitle/PageTitle";
import { useTexekanqData } from "../../hooks/useTexekanqData";
import React, { useState } from "react";
import CheckboxButton from "../../components/CheckboxButton/CheckboxButton";

const Reports = () => {
  const {
    isLoading,
    isError,
    error,
    data,
    columns,
    showDialog,
    setShowDialog,
    base64Data,
    isTypesLoading,
    isTypesError,
    typesError,
    types,
  } = useTexekanqData();

  const initialFilters = {
    search: "",
    types: [],
  };

  const [filters, setFilters] = useState(initialFilters);

  if (isError) return <Alert severity="error">{error}</Alert>;

  const filteredReports = data?.filter((report) => {
    const searchMatch = filters.search
      ? report.document_number.includes(filters.search) ||
        report.mul_number?.includes(filters.search) ||
        report.person_fname?.includes(filters.search) ||
        report.person_lname?.includes(filters.search) ||
        report.person_mname?.includes(filters.search) ||
        report.pnum?.includes(filters.search)
      : true;

    const typeMatch =
      filters.types.length > 0
        ? filters.types.includes(report.Texekanqtype.id)
        : true;

    return searchMatch && typeMatch;
  });

  const cancel = (e) => {
    console.log(":>");
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const handleTypeFilter = (typeId) => {
    if (!typeId) return;

    if (Array.isArray(typeId)) {
      return setFilters((filters) => ({
        ...filters,
        types: typeId,
      }));
    }
    const types = filters.types;

    const newTypes = types.includes(typeId)
      ? types.filter((direction) => direction !== typeId)
      : [...types, typeId];

    setFilters((filters) => ({ ...filters, types: newTypes }));
  };

  return (
    <Grid container spacing={1} sx={{ padding: "30px 10px" }}>
      <Grid item xs={2} sx={{ borderRight: "1px solid #999" }}>
        <Box
          sx={{
            padding: "10px 5px",
          }}
        >
          <Typography variant="h6" component="h6" align="center" mb={2}>
            Ֆիլտրեր
          </Typography>
          <TextField
            value={filters.search}
            id="filled-search"
            label="Որոնել"
            type="search"
            fullWidth
            sx={{ mb: 2 }}
            onChange={(e) =>
              setFilters((filters) => ({ ...filters, search: e.target.value }))
            }
          />
          <Typography variant="p" component="p">
            Ձևեր
          </Typography>
          <Grid container direction="column" spacing={1} sx={{ mt: "2px" }}>
            {types?.length &&
              types.map((type) => (
                <Grid item key={type.id}>
                  <CheckboxButton
                    text={type.name}
                    value={type.id}
                    onRoleFilter={handleTypeFilter}
                    checked={filters.types.includes(type.id)}
                  />
                </Grid>
              ))}
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={10}>
        {/* <Box> */}
        <PageTitle>Ստեղծված տեղեկանքներ</PageTitle>
        <Table
          bordered
          dataSource={filteredReports}
          columns={columns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
          isLoading={isLoading}
        />
        {/* </Box> */}
        {showDialog && (
          <Dialog
            fullScreen
            open={showDialog}
            onClose={() => setShowDialog(false)}
            TransitionComponent={Transition}
          >
            <AppBar sx={{ position: "relative" }}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={() => setShowDialog(false)}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
            <PdfViewer string={base64Data?.attachment} />
          </Dialog>
        )}
      </Grid>
    </Grid>
  );
};

export default Reports;
