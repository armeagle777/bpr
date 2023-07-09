const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const fileUpload = require('express-fileupload');
var CronJob = require('cron').CronJob;

dotenv.config();

const errorMiddleware = require('./middlewares/errorMiddleware');
const personsRoute = require('./modules/persons/routes');
const companiesRoute = require('./modules/companies/routes');
const sphereRoute = require('./modules/sphere/routes');
const { sequelize } = require('./config/database');

const { cronUpdateSphere } = require('./utils/common');
const { sphereCronConfig } = require('./utils/constants');

var job = new CronJob(
    sphereCronConfig,
    cronUpdateSphere,
    null,
    true,
    'Asia/Yerevan'
);

const app = express();
app.use(cors({ origin: 'http://localhost:5173', optionsSuccessStatus: 200 }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    fileUpload({
        createParentPath: true,
    })
);

app.use('/api/persons', personsRoute);
app.use('/api/petregistr', companiesRoute);
app.use('/api/sphere', sphereRoute);

app.use(errorMiddleware);
const PORT = process.env.PORT || 9000;

app.listen(PORT, async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log('Connection connected and synced successfully.');
        console.log('App is running on port ', PORT);
    } catch (err) {
        console.log('err::::::', err);
    }
});
