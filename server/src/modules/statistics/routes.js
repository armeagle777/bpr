const express = require("express");

const { getCompanyByHvhh } = require("./controller");

const statisticsRoute = express.Router();

statisticsRoute.get("/asylum", getCompanyByHvhh);

module.exports = statisticsRoute;
