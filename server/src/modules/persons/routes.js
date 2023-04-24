const express = require('express');

const {
    getPersonBySsn,
    getQkagInfoBySsn,
    getTaxBySsn,
} = require('./controller');

const personsRoute = express.Router();

personsRoute.get('/:ssn/bpr', getPersonBySsn);
personsRoute.get('/:ssn/tax', getTaxBySsn);
personsRoute.post('/:ssn/qkag', getQkagInfoBySsn);

module.exports = personsRoute;
