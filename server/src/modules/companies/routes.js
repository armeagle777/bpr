const express = require("express");

const { getCompaniesBySsn } = require("./controller");
const { rolesMiddleware } = require("../../middlewares/rolesMiddleware");
const { permissionsMap } = require("../../utils/constants");
const { BPR, ADMIN, TAX, ZAQS, POLICE, PETREGISTER } = permissionsMap;

const companiesRoute = express.Router();

companiesRoute.get(
  "/:ssn/person",
  rolesMiddleware([ADMIN.uid, PETREGISTER.uid]),
  getCompaniesBySsn
);

module.exports = companiesRoute;
