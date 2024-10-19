const router = require("express").Router();
const { rolesMiddleware } = require("../../middlewares/rolesMiddleware");
const { permissionsMap } = require("../../utils/constants");
const { getWpData } = require("./controller");

const { ADMIN, WP } = permissionsMap;

router.get("/:pnum", rolesMiddleware([ADMIN.uid, WP.uid]), getWpData);

module.exports = router;
