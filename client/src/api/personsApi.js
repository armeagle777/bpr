import axios from "axios";

const baseUrl =
  localStorage.getItem("serverSwitch") === "true"
    ? import.meta.env.VITE_SERVER_URL
    : import.meta.env.VITE_SERVER_OUT_URL;

const personsApi = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

personsApi.interceptors.request.use((config) => {
  config.headers.authorization = `Bearer ${localStorage.getItem("_auth")}`;
  return config;
});

// personsApi.interceptors.response.use(
//   (config) => config,
//   async (error) => {
//     const originalRequest = error.config;
//     if (
//       error.response.status === 401 &&
//       error.config &&
//       !originalRequest._isRetry
//     ) {
//       try {
//         const response = await axios.get(
//           `${process.env.REACT_APP_API_URL}/token/refresh`,
//           { withCredentials: true }
//         );
//         localStorage.setItem("token", response.data.accessToken);
//         return personsApi.request(originalRequest);
//       } catch (error) {
//         console.log("error:::::: User Not authorized");
//       }
//     }
//     throw error;
//   }
// );

// Auth endpoints
export const login = async (credentials) => {
  const response = await personsApi.post("/users/login", credentials);
  return response.data;
};

export const logOut = async () => {
  const response = await personsApi.post("/users/logout");
  return response.data;
};

export const getUsers = async () => {
  const response = await personsApi.get("/users");
  return response.data;
};

export const getRoles = async () => {
  const response = await personsApi.get("/roles");
  return response.data;
};

export const getPermissions = async () => {
  const response = await personsApi.get("/permissions");
  return response.data;
};

export const getLightUsers = async () => {
  const response = await personsApi.get("/users/light");
  return response.data;
};

export const createUser = async (data) => {
  const response = await personsApi.post(`/users/registration`, data);
  return response.data;
};

export const createRole = async (data) => {
  const response = await personsApi.post(`/roles`, data);
  return response.data;
};

export const updateUser = async ({ id, data }) => {
  const response = await personsApi.put(`/users/${id}`, data);
  return response.data;
};

export const updateRole = async ({ id, data }) => {
  const response = await personsApi.put(`/roles/${id}`, data);
  return response.data;
};

export const toggleUserActive = async ({ id, data }) => {
  const response = await personsApi.put(`/users/active/${id}`, data);
  return response.data;
};

export const checkEmail = async (email) => {
  const response = await personsApi.post(`/users/check/email`, { email });
  return response.data;
};

export const getLikes = async () => {
  const response = await personsApi.get(`/likes`);
  return response.data;
};

export const getShares = async () => {
  const response = await personsApi.get(`/shares`);
  return response.data;
};

export const shareInfo = async (data) => {
  const response = await personsApi.post(`/shares/share`, data);
  return response.data;
};

export const toggleLike = async ({ uid, text }) => {
  const response = await personsApi.post(`/likes/like/${uid}`, { text });
  return response.data;
};

// export const getAdvertisements = async (pageNumber) => {
//     const response = await personsApi.get(
//         `/advertisements?_limit=10&_page=${pageNumber}`
//     );
//     const totalCount = response.headers['x-total-count'];
//     return { data: response.data, totalCount };
// };

export const getSpheres = async (url) => {
  const response = await personsApi.get("/sphere");
  return response.data;
};

export const getFileBySsn = async (url, personInfo) => {
  const response = await personsApi.post(url, {
    data: personInfo,
    responseType: "blob",
  });
  return response.data;
};

export const getPersonBySsn = async (ssn) => {
  const response = await personsApi.get(`/persons/${ssn}/bpr`);
  return response.data;
};

export const getSearchedPersons = async (searchOptions) => {
  const response = await personsApi.post(`/persons/bpr`, searchOptions);
  return response.data;
};

export const getQkagDocsBySsn = async (ssn, firstName, lastName) => {
  const response = await personsApi.post(`/persons/${ssn}/qkag`, {
    firstName,
    lastName,
  });
  return response.data;
};

export const getTaxBySsn = async (ssn) => {
  const response = await personsApi.get(`/persons/${ssn}/tax`);
  return response.data;
};

export const getCompanyByHvhh = async (tax_id) => {
  const response = await personsApi.get(`/persons/${tax_id}/petregistr`);
  return response.data;
};

export const getCompanyForPersonByHvhh = async (tax_id) => {
  const response = await personsApi.get(`/persons/${tax_id}/petregistr`);
  return response.data;
};

export const getCompaniesBySsn = async (ssn) => {
  const response = await personsApi.get(`/petregistr/${ssn}/person`);
  return response.data;
};

export const getPoliceByPnum = async (pnum) => {
  const response = await personsApi.get(`/persons/${pnum}/police`);
  return response.data;
};

export const getFile = async ({ filterData }) => {
  const config = {
    responseType: "blob",
  };

  const { data } = await personsApi.post(
    "/export/excel",
    { data: filterData },
    config
  );

  const blob = new Blob([data], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  return blob;
};

// export const addAdvertisement = async (advertisement) => {
//     return await personsApi.post('/advertisements', advertisement);
// };

// export const updateAdvertisement = async (advertisement) => {
//     return await personsApi.patch(
//         `/advertisements/${advertisement.id}`,
//         advertisement
//     );
// };

// export const deleteAdvertisement = async ({ id }) => {
//     return await personsApi.delete(`/advertisements/${id}`, id);
// };

export default personsApi;
