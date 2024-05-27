import axios from "axios";

const statisticsApi = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});

export const getAsylumStatistics = async (filterObj) => {
  const response = await statisticsApi.post(`/statistics/asylum`, filterObj);
  return response.data;
};
