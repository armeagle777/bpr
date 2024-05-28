const express = require("express");

const {
  getAsylumYears,
  getAsylumTotal,
  getAsylumDecisions,
  getAsylumApplications,
} = require("./controller");

const statisticsRoute = express.Router();

statisticsRoute.post("/asylum/total", getAsylumTotal);
statisticsRoute.post("/asylum/applications", getAsylumApplications);
statisticsRoute.post("/asylum/decisions", getAsylumDecisions);
statisticsRoute.post("/asylum/years", getAsylumYears);

module.exports = statisticsRoute;
