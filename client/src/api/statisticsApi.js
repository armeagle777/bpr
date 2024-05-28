import axios from "axios";

const statisticsApi = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});

export const getAsylumStatistics = async (filterObj, url) => {
  const response = await statisticsApi.post(
    `/statistics/asylum${url}`,
    filterObj
  );
  return response.data;
};
