const axios = require('axios');

const ApiError = require('../../exceptions/api-error');

const getUserBySsnDb = async (params) => {
    try {
        const { ssn } = params;

        const { data } = await axios.get(
            `http://localhost:8000/persons?PNum=${ssn}`
        );

        if (data.length === 0) {
            throw ApiError.BadRequest('Տվյալներով անձ չի գտնվել');
        }

        const personData = data[0];
        const { AVVDocuments, AVVAddresses, ...restInfo } = personData;
        const addresses = AVVAddresses.AVVAddress;
        const documents = AVVDocuments.Document;

        const person = { addresses, documents, ...restInfo };

        return person;
    } catch (error) {
        throw ApiError.BadRequest('Ինչ֊որ բան այնպես չէ', [error]);
    }
};

module.exports = {
    getUserBySsnDb,
};
