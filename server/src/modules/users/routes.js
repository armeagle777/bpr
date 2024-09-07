const router = require("express").Router();
// const { authMiddleware } = require("../../middlewares/authMiddleware");
const {
  login,
  logout,
  activate,
  getUsers,
  registration,
} = require("./controller");

// const {
//   loginUserSchema,
//   activateUserSchema,
//   registerUserSchema,
// } = require("./validations");
// const { validateSchema } = require("../../helpers/common");

router.get(
  "/active/:link",
  // validateSchema(activateUserSchema),
  activate
);
router.get(
  "/",
  // authMiddleware,
  getUsers
);

router.post(
  "/registration",
  // validateSchema(registerUserSchema),
  registration
);
router.post(
  "/login",
  // validateSchema(loginUserSchema),
  login
);
router.post("/logout", logout);

module.exports = router;
