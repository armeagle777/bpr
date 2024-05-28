const express = require("express");

const { getAsylumTotal } = require("./controller");

const statisticsRoute = express.Router();

statisticsRoute.post("/asylum/total", getAsylumTotal);

module.exports = statisticsRoute;
