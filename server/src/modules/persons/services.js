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

const getDocumentsBySsn = async (params) => {
    const qkagUrl = process.env.QKAG_URL;
    const { ssn } = params;

    const { data } = await axios.get(`${qkagUrl}?PNum=${ssn}`);

    if (data.length === 0) {
        throw ApiError.NotFound('ՔԿԱԳ տվյալներ չեն գտնվել');
    }

    const { result } = data[0];
    const documentsData = Object.values(result);

    return documentsData;
};

module.exports = {
    getPersonBySsnDb,
    getDocumentsBySsn,
};
