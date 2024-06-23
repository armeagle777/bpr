import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { Button } from "antd";
import { useQuery } from "@tanstack/react-query";
import { FaDownload } from "react-icons/fa6";

import { getStatisticsExcel } from "../../api/statisticsApi";

const ExportExcelButton = ({ filters }) => {
  const {
    data: fileData,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useQuery(["excel", filters], () => getStatisticsExcel(filters), {
    keepPreviousData: false,
    enabled: false,
    refetchOnWindowFocus: false,
  });

  if (isError) {
    toast.error("Something went wrong", {
      progress: undefined,
    });
  }

  useEffect(() => {
    const downloadExcelFile = async () => {
      if (fileData) {
        try {
          const blob = await fileData;
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = "exported_data.xlsx";
          link.click();
          window.URL.revokeObjectURL(link.href);
        } catch (error) {
          console.error("Error exporting Excel from React:", error.message);
        }
      }
    };

    downloadExcelFile();
  }, [fileData]);

  const handleExportExcel = async () => {
    refetch();
  };

  return (
    <Button
      type="link"
      disabled={isFetching}
      loading={isFetching}
      icon={<FaDownload />}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        outline: 0,
        border: 0,
        color: "purple",
        fontWeight: "bold",
        textAlign: "center",
      }}
      onClick={handleExportExcel}
    >
      EXPORT
    </Button>
  );
};

export default ExportExcelButton;
