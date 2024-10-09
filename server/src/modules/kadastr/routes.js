const express = require("express");

const { getPropertiesBySsn } = require("./controller");
const { rolesMiddleware } = require("../../middlewares/rolesMiddleware");
const { permissionsMap } = require("../../utils/constants");
const { ADMIN, KADASTR } = permissionsMap;

const kadastrRoutes = express.Router();

kadastrRoutes.get(
  "/:ssn/person",
  rolesMiddleware([ADMIN.uid, KADASTR.uid]),
  getPropertiesBySsn
);

module.exports = kadastrRoutes;
