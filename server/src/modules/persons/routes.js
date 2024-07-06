const express = require("express");

const {
  getPersonBySsn,
  getSearchedPersons,
  getQkagInfoBySsn,
  getTaxBySsn,
  getCompanyByHvhh,
  downloadBprInfo,
  getPoliceByPnum,
} = require("./controller");

const personsRoute = express.Router();

personsRoute.get("/:ssn/bpr", getPersonBySsn);
personsRoute.post("/download", downloadBprInfo);
personsRoute.post("/bpr", getSearchedPersons);
personsRoute.get("/:ssn/tax", getTaxBySsn);
personsRoute.get("/:pnum/police", getPoliceByPnum);
personsRoute.post("/:ssn/qkag", getQkagInfoBySsn);
personsRoute.get("/:hvhh/petregistr", getCompanyByHvhh);

module.exports = personsRoute;
