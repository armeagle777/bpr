const express = require("express");

const { getPersonBySsn } = require("./controller");
const { getQkagInfoBySsn } = require("./controller");

const personsRoute = express.Router();

personsRoute.get(
  "/:ssn/bpr",
  (req, res, next) => {
    console.log("in bpr route");
    next();
  },
  getPersonBySsn
);
personsRoute.post(
  "/:ssn/qkag",
  (req, res, next) => {
    console.log("in qkag route");
    next();
  },
  getQkagInfoBySsn
);

module.exports = personsRoute;
