const router = require("express").Router();
const { authMiddleware } = require("../../middlewares/authMiddleware");
const { rolesMiddleware } = require("../../middlewares/rolesMiddleware");
const { permissionsMap } = require("../../utils/constants");
const { createTexekanq, getTexekanqs, getFileBase64 } = require("./controller");

// const {
//   loginUserSchema,
//   activateUserSchema,
//   registerUserSchema,
// } = require("./validations");
// const { validateSchema } = require("../../helpers/common");
const { ADMIN, CITIZENSHIP_REPORT } = permissionsMap;

router.post(
  "/",
  authMiddleware,
  rolesMiddleware([ADMIN.uid, CITIZENSHIP_REPORT.uid]),
  // validateSchema(registerUserSchema),
  createTexekanq
);

router.get(
  "/",
  authMiddleware,
  rolesMiddleware([ADMIN.uid, CITIZENSHIP_REPORT.uid]),
  // validateSchema(registerUserSchema),
  getTexekanqs
);

router.get(
  "/pdf/:fileName",
  // authMiddleware,
  // validateSchema(registerUserSchema),
  getFileBase64
);

module.exports = router;
