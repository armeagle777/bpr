import axios from 'axios';

const personsApi = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
});

// export const getAdvertisements = async (pageNumber) => {
//     const response = await personsApi.get(
//         `/advertisements?_limit=10&_page=${pageNumber}`
//     );
//     const totalCount = response.headers['x-total-count'];
//     return { data: response.data, totalCount };
// };

export const getFileBySsn = async (ssn) => {
    const response = await personsApi.get(`/persons/download/${ssn}`, {
        responseType: 'blob',
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
