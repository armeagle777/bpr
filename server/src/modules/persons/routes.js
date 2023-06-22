const express = require('express');

const {
    getPersonBySsn,
    getSearchedPersons,
    getQkagInfoBySsn,
    getTaxBySsn,
    getCompanyByHvhh,
    downloadBprInfo,
} = require('./controller');

const personsRoute = express.Router();

personsRoute.get('/:ssn/bpr', getPersonBySsn);
personsRoute.post('/download', downloadBprInfo);
personsRoute.post('/bpr', getSearchedPersons);
personsRoute.get('/:ssn/tax', getTaxBySsn);
personsRoute.post('/:ssn/qkag', getQkagInfoBySsn);
personsRoute.get('/:hvhh/petregistr', getCompanyByHvhh);

module.exports = personsRoute;
