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

const statByYearQuery = `select
YEAR(asylum_general_stats.period) as period_year,
count(if(asylum_general_stats.TABLE_NAME = 'table_1', asylum_general_stats.count_parametr, null)) as asylum_seeker,
count(if(asylum_general_stats.TABLE_NAME = 'table_2' and asylum_general_stats.count_parametr = 3, asylum_general_stats.count_parametr, null)) as positive_decisions,
count(if(asylum_general_stats.TABLE_NAME = 'table_2' and asylum_general_stats.count_parametr = 4, asylum_general_stats.count_parametr, null)) as negative_decisions,
count(if(asylum_general_stats.TABLE_NAME = 'table_2' and asylum_general_stats.count_parametr = 5, asylum_general_stats.count_parametr, null)) as cease_decisions,
count(if(asylum_general_stats.TABLE_NAME = 'table_2' and asylum_general_stats.count_parametr in (11,12), asylum_general_stats.count_parametr, null)) as terminate_decisions
from (
SELECT a.case_id, b.personal_id as count_parametr, a.mul_date as period, 'table_1' as TABLE_NAME FROM tb_case a inner join tb_person b on a.case_id = b.case_id
UNION
SELECT c.case_id, c.decision_type as count_parametr, date(c.decison_date) as period, 'table_2' as TABLE_NAME from tb_decisions c where c.decision_status = 5 AND c.actual=1 ) as asylum_general_stats
GROUP BY YEAR(asylum_general_stats.period)`;

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

const decTypeTableNameMap = {
  1: "refugees",
  2: "denied_refugees",
  3: "asylum_closed",
  4: "terminate",
};

module.exports = {
  statisticsBaseQuery,
  statisticsSequelize,
  decTypeTableNameMap,
  statByYearQuery,
};