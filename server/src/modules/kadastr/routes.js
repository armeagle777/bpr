const express = require("express");

const {
  getPropertiesBySsn,
  getPropertyByCertificate,
} = require("./controller");
const { rolesMiddleware } = require("../../middlewares/rolesMiddleware");
const { permissionsMap } = require("../../utils/constants");
const { ADMIN, KADASTR, KADASTR_CERTIFICATE } = permissionsMap;

const kadastrRoutes = express.Router();

kadastrRoutes.get(
  "/:ssn/person",
  rolesMiddleware([ADMIN.uid, KADASTR.uid]),
  getPropertiesBySsn
);

kadastrRoutes.get(
  "/:certificateNumber/document",
  rolesMiddleware([ADMIN.uid, KADASTR_CERTIFICATE.uid]),
  getPropertyByCertificate
);

module.exports = kadastrRoutes;
