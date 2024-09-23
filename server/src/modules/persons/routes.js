const express = require("express");
const { authMiddleware } = require("../../middlewares/authMiddleware");
const { rolesMiddleware } = require("../../middlewares/rolesMiddleware");

const {
  getPersonBySsn,
  getSearchedPersons,
  getQkagInfoBySsn,
  getTaxBySsn,
  getCompanyByHvhh,
  downloadBprInfo,
  getPoliceByPnum,
} = require("./controller");
const { permissionsMap } = require("../../utils/constants");
const { BPR, ADMIN, TAX, ZAQS, POLICE, PETREGISTER } = permissionsMap;

const personsRoute = express.Router();

personsRoute.get(
  "/:ssn/bpr",
  rolesMiddleware([BPR.uid, ADMIN.uid]),
  getPersonBySsn
);
personsRoute.post("/download", authMiddleware, downloadBprInfo);
personsRoute.post(
  "/bpr",
  rolesMiddleware([BPR.uid, ADMIN.uid]),
  getSearchedPersons
);
personsRoute.get(
  "/:ssn/tax",
  rolesMiddleware([TAX.uid, ADMIN.uid]),
  getTaxBySsn
);
personsRoute.get(
  "/:pnum/police",
  rolesMiddleware([POLICE.uid, ADMIN.uid]),
  getPoliceByPnum
);
personsRoute.post(
  "/:ssn/qkag",
  rolesMiddleware([ZAQS.uid, ADMIN.uid]),
  getQkagInfoBySsn
);
personsRoute.get(
  "/:hvhh/petregistr",
  rolesMiddleware([PETREGISTER.uid, ADMIN.uid]),
  getCompanyByHvhh
);

module.exports = personsRoute;
