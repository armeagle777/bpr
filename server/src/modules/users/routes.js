const router = require("express").Router();
const { authMiddleware } = require("../../middlewares/authMiddleware");
const { rolesMiddleware } = require("../../middlewares/rolesMiddleware");
const { permissionsMap } = require("../../utils/constants");
const {
  login,
  logout,
  activate,
  getUsers,
  updateUser,
  checkEmail,
  registration,
  getUsersLight,
  toggleUserActive,
} = require("./controller");
const { BPR, ADMIN, TAX, ZAQS, POLICE, PETREGISTER } = permissionsMap;

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
router.get("/", rolesMiddleware([ADMIN.uid]), getUsers);
router.get("/light", authMiddleware, getUsersLight);

router.post(
  "/check/email",
  // authMiddleware,
  rolesMiddleware([ADMIN.uid]),
  checkEmail
);

router.post(
  "/registration",
  rolesMiddleware([ADMIN.uid]),
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

router.put(
  "/active/:id",
  rolesMiddleware([ADMIN.uid]),
  // validateSchema(loginUserSchema),
  toggleUserActive
);

router.post("/logout", authMiddleware, logout);

module.exports = router;
