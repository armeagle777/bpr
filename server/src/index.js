const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const errorMiddleware = require('./middlewares/errorMiddleware');
const personsRoute = require('./modules/persons/routes');

const app = express();
app.use(cors({ origin: 'http://localhost:5173', optionsSuccessStatus: 200 }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/persons', personsRoute);

app.use(errorMiddleware);
const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
    console.log('App is running on port ', PORT);
});
