const axios = require('axios');

const ApiError = require('../../exceptions/api-error');

const getPersonBySsnDb = async (params) => {
    const bprUrl = process.env.BPR_URL;
    const { ssn } = params;

    const { data } = await axios.get(`${bprUrl}?PNum=${ssn}`);

    if (data.length === 0) {
        throw ApiError.NotFound('Տվյալներով անձ չի գտնվել');
    }

    const personData = data[0];
    const { AVVDocuments, AVVAddresses, ...restInfo } = personData;
    const addresses = AVVAddresses.AVVAddress;
    const documents = AVVDocuments.Document;

    const person = { addresses, documents, ...restInfo };

    return person;
};

const getDocumentsBySsnDb = async (ssn, firstName, lastName) => {
    const qkagUrl = process.env.QKAG_URL;

    const { data } = await axios.get(`${qkagUrl}?PNum=${ssn}`);

    if (data.length === 0) {
        return [];
    }

    const { result } = data[0];
    const documentsData = Object.values(result);

    return documentsData;
};

const getTaxBySsnDb = async (ssn) => {
    const taxUrl = process.env.TAX_URL;

    const { data } = await axios.get(`${taxUrl}`, { ssn });

    if (!data[0].taxPayersInfo) {
        return [];
    }

    const {
        taxPayersInfo: { taxPayerInfo },
    } = data[0];

    return taxPayerInfo;
};

module.exports = {
    getPersonBySsnDb,
    getDocumentsBySsnDb,
    getTaxBySsnDb,
};
