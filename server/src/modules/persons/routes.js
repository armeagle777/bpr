const express = require("express");
const { authMiddleware } = require("../../middlewares/authMiddleware");

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

personsRoute.get("/:ssn/bpr", authMiddleware, getPersonBySsn);
personsRoute.post("/download", authMiddleware, downloadBprInfo);
personsRoute.post("/bpr", authMiddleware, getSearchedPersons);
personsRoute.get("/:ssn/tax", authMiddleware, getTaxBySsn);
personsRoute.get("/:pnum/police", authMiddleware, getPoliceByPnum);
personsRoute.post("/:ssn/qkag", authMiddleware, getQkagInfoBySsn);
personsRoute.get("/:hvhh/petregistr", authMiddleware, getCompanyByHvhh);

module.exports = personsRoute;
