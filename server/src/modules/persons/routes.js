const express = require('express');

const {
    getPersonBySsn,
    getQkagInfoBySsn,
    getTaxBySsn,
    getCompanyByHvhh,
} = require('./controller');

const personsRoute = express.Router();

personsRoute.get('/:ssn/bpr', getPersonBySsn);
personsRoute.get('/:ssn/tax', getTaxBySsn);
personsRoute.post('/:ssn/qkag', getQkagInfoBySsn);
personsRoute.post('/:hvhh/petregistr', getCompanyByHvhh);

module.exports = personsRoute;
