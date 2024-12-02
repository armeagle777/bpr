const router = require("express").Router();
const { authMiddleware } = require("../../middlewares/authMiddleware");
const { createTexekanq } = require("./controller");

// const {
//   loginUserSchema,
//   activateUserSchema,
//   registerUserSchema,
// } = require("./validations");
// const { validateSchema } = require("../../helpers/common");

router.post(
  "/",
  authMiddleware,
  // validateSchema(registerUserSchema),
  createTexekanq
);

module.exports = router;
