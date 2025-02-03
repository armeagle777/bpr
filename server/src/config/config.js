require("dotenv").config(); // Import dotenv to load env variables

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || "mysql",
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || "mysql",
  },
  production: {
    username: "root",
    password: "12Compose#",
    database: "bpr_new",
    host: "192.168.1.23",
    dialect: process.env.DB_DIALECT || "mysql",
  },
};
