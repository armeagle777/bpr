import { Flex, Button } from "antd";
import { FaFilter, FaFileExcel } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import { useQuery } from "@tanstack/react-query";

import translations from "../../../utils/translations/am.json";
import { FilterMultySelect } from "../../../statisticsComponents";
import { MOCK_COUNTRIES_OPTIONS } from "../constants";
import { MOCK_PERIODS, MOCK_YEARS } from "../../../utils/constants";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { DOWNLOAD_FILE_TYPES } from "../../../utils/constants";
import { getStatisticsFile } from "../../../api/statisticsApi";

function generateFileName() {
  const timestamp = new Date().toISOString().replace(/[:.-]/g, "");
  const location = useLocation();
  const pathname = location.pathname;
  const segments = pathname.split("/");
  const lastSegment =
    segments[segments.length - 1] || segments[segments.length - 2];
  return `${lastSegment}_${timestamp}`;
}

const FilterRow = ({}) => {
  const { FILTER_ROW } = translations;

  const fileName = generateFileName();
  const fakeFilters = {};

  const {
    data: fileData,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useQuery(
    [DOWNLOAD_FILE_TYPES.PDF, fakeFilters],
    () => getStatisticsFile(fakeFilters, DOWNLOAD_FILE_TYPES.PDF),
    {
      keepPreviousData: false,
      enabled: false,
      refetchOnWindowFocus: false,
    }
  );

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
          link.download = `${fileName}.pdf`;
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
    <Flex style={{ width: "60%", gap: 10 }}>
      <FilterMultySelect
        placeholder={FILTER_ROW.MULTY_COUNTRIES_PLACEHOLDER}
        options={MOCK_COUNTRIES_OPTIONS}
      />
      <FilterMultySelect
        placeholder={FILTER_ROW.MULTY_YEARS_PLACEHOLDER}
        options={MOCK_YEARS}
      />
      <FilterMultySelect
        placeholder={FILTER_ROW.MULTY_PERIODS_PLACEHOLDER}
        options={MOCK_PERIODS}
      />
      <Button type="primary" icon={<FaFileExcel />} onClick={handleExportExcel}>
        {FILTER_ROW.EXPORT_BTN_TITLE}
      </Button>
      <Button type="default" icon={<GrPowerReset />}>
        {FILTER_ROW.RESET_BTN_TITLE}
      </Button>
    </Flex>
  );
};

export default FilterRow;
