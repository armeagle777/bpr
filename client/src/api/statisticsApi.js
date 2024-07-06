import axios from "axios";
import { DOWNLOAD_FILE_TYPES, FILE_MIME_TYPES } from "../utils/constants";

const statisticsApi = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});

export const getStatisticsData = async (filterObj, url) => {
  const response = await statisticsApi.post(`/statistics${url}`, filterObj);
  return response.data;
};

export const getStatisticsFile = async (filters, fileType) => {
  const mimeType =
    fileType === DOWNLOAD_FILE_TYPES.PDF
      ? FILE_MIME_TYPES.PDF
      : FILE_MIME_TYPES.EXCEL;

  const fileUrl = `/statistics/export/${fileType}`;

  const config = {
    responseType: "blob",
  };

  const { data } = await statisticsApi.post(fileUrl, { filters }, config);

  const blob = new Blob([data], {
    type: mimeType,
  });

  return blob;
};
