import { Alert, Table } from "antd";
import Dialog from "@mui/material/Dialog";
import { Box } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Slide from "@mui/material/Slide";
import Toolbar from "@mui/material/Toolbar";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import PdfViewer from "../../components/pdfViewer/PdfViewer";

import PageTitle from "../../components/PageTitle/PageTitle";
import { useTexekanqData } from "../../hooks/useTexekanqData";
import React from "react";

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
  } = useTexekanqData();

  if (isError) return <Alert severity="error">{error}</Alert>;

  const cancel = (e) => {
    console.log(":>");
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  return (
    <>
      <Box
        sx={{
          padding: "30px 10px",
        }}
      >
        <PageTitle>Ստեղծված տեղեկանքներ</PageTitle>
        <Table
          bordered
          dataSource={data}
          columns={columns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
          isLoading={isLoading}
        />
      </Box>
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
    </>
  );
};

export default Reports;
