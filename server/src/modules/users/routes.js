const router = require("express").Router();
// const { authMiddleware } = require("../../middlewares/authMiddleware");
const {
  login,
  logout,
  activate,
  getUsers,
  updateUser,
  checkEmail,
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
  "/check/email",
  // authMiddleware,
  checkEmail
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

router.put(
  "/:id",
  // validateSchema(loginUserSchema),
  updateUser
);
router.post("/logout", logout);

module.exports = router;
