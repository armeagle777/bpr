import axios from "axios";

const statisticsApi = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});

export const getStatisticsData = async (filterObj, url) => {
  const response = await statisticsApi.post(`/statistics${url}`, filterObj);
  return response.data;
};

export const getStatisticsExcel = async ({ filterData, url }) => {
  const config = {
    responseType: "blob",
  };

  const { data } = await serverApi.post(url, { data: filterData }, config);

  const blob = new Blob([data], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  return blob;
};
