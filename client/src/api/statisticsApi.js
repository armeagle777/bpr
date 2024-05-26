import axios from "axios";

const statisticsApi = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});

export const getAsylumStatistics = async (filterObj) => {
  const response = await statisticsApi.get(`/statistics/${ssn}/bpr`);
  return response.data;
};
