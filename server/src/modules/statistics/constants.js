const { Sequelize } = require("sequelize");

const host = process.env.DATABASE_HOST;
const DB = process.env.STATISTICS_DATABASE_NAME;
const username = process.env.DATABASE_USERNAME;
const password = process.env.DATABASE_PASSWORD;

const statisticsSequelize = new Sequelize(DB, username, password, {
  host: host,
  dialect: "mysql",
  // logging: (...msg) => console.log(msg),
});

const statisticsBaseQuery = `SELECT
EAEU_STAT.country_arm,
count(EAEU_STAT.personal_id) AS TOTAL_APPLICATIONS,
count(if(EAEU_STAT.sex = 1, EAEU_STAT.personal_id, null)) AS TOTAL_MALE,
count(if(EAEU_STAT.sex = 2, EAEU_STAT.personal_id, null)) AS TOTAL_FEMALE,
count(if(EAEU_STAT.sex = 1 AND EAEU_STAT.age >= 0 AND EAEU_STAT.age <= 13, EAEU_STAT.personal_id, null)) AS MALE_0_13,
count(if(EAEU_STAT.sex = 2 AND EAEU_STAT.age >= 0 AND EAEU_STAT.age <= 13, EAEU_STAT.personal_id, null)) AS FEMALE_0_13,
count(if(EAEU_STAT.age >= 0 AND EAEU_STAT.age <= 13, EAEU_STAT.personal_id, null)) AS TOTAL_0_13,
count(if(EAEU_STAT.sex = 1 AND EAEU_STAT.age >= 14 AND EAEU_STAT.age <= 17, EAEU_STAT.personal_id, null)) AS MALE_14_17,
count(if(EAEU_STAT.sex = 2 AND EAEU_STAT.age >= 14 AND EAEU_STAT.age <= 17, EAEU_STAT.personal_id, null)) AS FEMALE_14_17,
count(if(EAEU_STAT.age >= 14 AND EAEU_STAT.age <= 17, EAEU_STAT.personal_id, null)) AS TOTAL_14_17,
count(if(EAEU_STAT.sex = 1 AND EAEU_STAT.age >= 18 AND EAEU_STAT.age <= 34, EAEU_STAT.personal_id, null)) AS MALE_18_34,
count(if(EAEU_STAT.sex = 2 AND EAEU_STAT.age >= 18 AND EAEU_STAT.age <= 34, EAEU_STAT.personal_id, null)) AS FEMALE_18_34,
count(if(EAEU_STAT.age >= 18 AND EAEU_STAT.age <= 34, EAEU_STAT.personal_id, null)) AS TOTAL_18_34,
count(if(EAEU_STAT.sex = 1 AND EAEU_STAT.age >= 35 AND EAEU_STAT.age <= 64, EAEU_STAT.personal_id, null)) AS MALE_35_64,
count(if(EAEU_STAT.sex = 2 AND EAEU_STAT.age >= 35 AND EAEU_STAT.age <= 64, EAEU_STAT.personal_id, null)) AS FEMALE_35_64,
count(if(EAEU_STAT.age >= 35 AND EAEU_STAT.age <= 64, EAEU_STAT.personal_id, null)) AS TOTAL_35_64,    
count(if(EAEU_STAT.sex = 1 AND EAEU_STAT.age >= 2020, EAEU_STAT.personal_id, null)) AS MALE_UNKNOWN,
count(if(EAEU_STAT.sex = 2 AND EAEU_STAT.age >= 2020, EAEU_STAT.personal_id, null)) AS FEMALE_UNKNOWN,
count(if(EAEU_STAT.age >= 2020, EAEU_STAT.personal_id, null)) AS TOTAL_UNKNOWN,
count(if(EAEU_STAT.sex = 1 AND EAEU_STAT.age >= 65, EAEU_STAT.personal_id, null)) AS MALE_65_PLUS,
count(if(EAEU_STAT.sex = 2 AND EAEU_STAT.age >= 65, EAEU_STAT.personal_id, null)) AS FEMALE_65_PLUS,
count(if(EAEU_STAT.age >= 65, EAEU_STAT.personal_id, null)) AS TOTAL_65_PLUS`;

module.exports = { statisticsBaseQuery, statisticsSequelize };
