const express = require('express');

const { getCompaniesBySsn } = require('./controller');

const companiesRoute = express.Router();

companiesRoute.get('/:ssn/person', getCompaniesBySsn);

module.exports = companiesRoute;
