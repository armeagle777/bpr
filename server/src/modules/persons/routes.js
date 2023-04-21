const express = require('express');
const { getPersonBySsn } = require('./controller');

const personsRoute = express.Router();

personsRoute.get('/:ssn', getPersonBySsn);

module.exports = personsRoute;
