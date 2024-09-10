const router = require("express").Router();
const { authMiddleware } = require("../../middlewares/authMiddleware");
const { createLike } = require("./controller");

// const {
//   loginUserSchema,
//   activateUserSchema,
//   registerUserSchema,
// } = require("./validations");
// const { validateSchema } = require("../../helpers/common");

router.post(
  "/like/:uid",
  authMiddleware,
  // validateSchema(registerUserSchema),
  createLike
);

module.exports = router;
