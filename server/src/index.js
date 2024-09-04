const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
var CronJob = require("cron").CronJob;

dotenv.config();

const errorMiddleware = require("./middlewares/errorMiddleware");
const personsRoute = require("./modules/persons/routes");
const companiesRoute = require("./modules/companies/routes");
const sphereRoute = require("./modules/sphere/routes");
const statisticsRoute = require("./modules/statistics/routes");
const usersRouter = require("./modules/users/routes");
const tokenRouter = require("./modules/token/routes");
const { sphereSequelize } = require("./config/sphereDatabase");

const { cronUpdateSphere, cronUpdateSphereText } = require("./utils/common");
const { sphereCronConfig } = require("./utils/constants");
const { sahmanahatumSequelize } = require("./config/sahmanahatumDb");
const { wpSequelize } = require("./config/wpDatabase");

var job = new CronJob(
  sphereCronConfig,
  cronUpdateSphere,
  null,
  true,
  "Asia/Yerevan"
);

const updateSphereTextJob = new CronJob(
  "15 20 * * *",
  cronUpdateSphereText,
  null,
  true,
  "Asia/Yerevan"
);

const app = express();
app.use(
  cors({
    origin: true,
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.use("/api/users", usersRouter);
app.use("/api/token", tokenRouter);

app.use("/api/persons", personsRoute);
app.use("/api/petregistr", companiesRoute);
app.use("/api/sphere", sphereRoute);

//Statistics Endpoints
app.use("/api/statistics", statisticsRoute);

app.use(errorMiddleware);
const PORT = process.env.PORT || 9000;

app.listen(PORT, async () => {
  try {
    await sphereSequelize.sync({ alter: true });
    await sahmanahatumSequelize.sync({ alter: true });
    await wpSequelize.sync({ alter: true });
    console.log("Connections connected and synced successfully.");
    console.log("App is running on port ", PORT);
  } catch (err) {
    console.log("err::::::", err);
  }
});
