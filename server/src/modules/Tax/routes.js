const taxRoute = require("express").Router();

const { authMiddleware } = require("../../middlewares/authMiddleware");
const { rolesMiddleware } = require("../../middlewares/rolesMiddleware");
const { permissionsMap } = require("../../utils/constants");
const {
  getCompanyObligations,
} = require("./controller");

const {
  ADMIN,
  TAX,
  TAX_COMPANY_OBLIGATIONS,
} = permissionsMap;

taxRoute.get(
  "/company/:tin/obligations",
  authMiddleware,
  rolesMiddleware([ADMIN.uid, TAX_COMPANY_OBLIGATIONS.uid, TAX.uid]),
  getCompanyObligations
);


module.exports = taxRoute;
