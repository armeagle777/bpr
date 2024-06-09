const { statisticsBaseQuery } = require("./constants");

const formatAsylumQuery = ({ table_name, year, month, period }) => {
  let quarter_where_condition = ` YEAR(d.decison_date) = ${year} AND`;
  let applications_quarter_where_condition = ` YEAR(cs.mul_date) = ${year}  `;
  if (period == "1") {
    quarter_where_condition += ` QUARTER(d.decison_date) IN (1,2) AND `;
    applications_quarter_where_condition += ` AND QUARTER(cs.mul_date) IN (1,2) `;
  } else if (period == "2") {
    quarter_where_condition += ` QUARTER(d.decison_date) IN (3,4)  AND `;
    applications_quarter_where_condition += ` AND QUARTER(cs.mul_date) IN (3,4)  `;
  } else if (period == "4") {
    quarter_where_condition += ` QUARTER(d.decison_date) =1  AND `;
    applications_quarter_where_condition += ` AND QUARTER(cs.mul_date) =1  `;
  } else if (period == "5") {
    quarter_where_condition += ` QUARTER(d.decison_date) =2  AND `;
    applications_quarter_where_condition += ` AND QUARTER(cs.mul_date) =2  `;
  } else if (period == "6") {
    quarter_where_condition += ` QUARTER(d.decison_date) =3  AND `;
    applications_quarter_where_condition += ` AND QUARTER(cs.mul_date) =3  `;
  } else if (period == "7") {
    quarter_where_condition += ` QUARTER(d.decison_date) =4  AND `;
    applications_quarter_where_condition += ` AND QUARTER(cs.mul_date) =4  `;
  } else if (period == "8") {
    quarter_where_condition += ` QUARTER(d.decison_date) IN(1,2,3)  AND `;
    applications_quarter_where_condition += ` AND QUARTER(cs.mul_date) IN(1,2,3) `;
  } else if (period == "9");
  {
    quarter_where_condition += ` MONTH(d.decison_date) = ${month}  AND `;
    applications_quarter_where_condition += ` AND MONTH(cs.mul_date) =${month} `;
  }

  const statisticsQueriesFrom = {
    applied_for_asylum: ` FROM (
          SELECT    a.personal_id,    c.country_arm,    YEAR(cs.mul_date) - a.b_year AS age,    a.sex FROM    tb_person a 
          INNER JOIN tb_case cs ON cs.case_id = a.case_id 
          INNER JOIN tb_country c ON    a.citizenship = c.country_id 
          WHERE ${applications_quarter_where_condition}  ) EAEU_STAT    
      group by EAEU_STAT.country_arm`,
    refugees: ` FROM (
          SELECT    a.personal_id,    c.country_arm,    YEAR(d.decison_date) - a.b_year AS age,    a.sex FROM    tb_person a 
          INNER JOIN tb_decisions d ON d.case_id = a.case_id 
          INNER JOIN tb_country c ON    a.citizenship = c.country_id 
          WHERE ${quarter_where_condition}  a.person_status = 2 AND d.decision_type=3 AND d.status=5 AND d.actual=1) EAEU_STAT    
      group by EAEU_STAT.country_arm`,
    refugees_withdrawn: ` FROM (
          SELECT    a.personal_id,    c.country_arm,    YEAR(d.decison_date) - a.b_year AS age,    a.sex FROM    tb_person a 
          INNER JOIN tb_decisions d ON d.case_id = a.case_id 
          INNER JOIN tb_country c ON    a.citizenship = c.country_id 
          WHERE ${quarter_where_condition}  d.decision_type IN(11,13) AND d.actual=1 ) EAEU_STAT    
      group by EAEU_STAT.country_arm`,
    terminate: ` FROM (
          SELECT    a.personal_id,    c.country_arm,    YEAR(d.decison_date) - a.b_year AS age,    a.sex FROM    tb_person a 
          INNER JOIN tb_decisions d ON d.case_id = a.case_id 
          INNER JOIN tb_country c ON    a.citizenship = c.country_id 
          WHERE ${quarter_where_condition}  d.decision_type IN(11,12) AND d.actual=1 ) EAEU_STAT    
      group by EAEU_STAT.country_arm`,
    denied_refugees: ` FROM (
          SELECT    a.personal_id,    c.country_arm,    YEAR(d.decison_date) - a.b_year AS age,    a.sex FROM    tb_person a 
          INNER JOIN tb_decisions d ON d.case_id = a.case_id 
          INNER JOIN tb_country c ON    a.citizenship = c.country_id 
          WHERE ${quarter_where_condition}  d.decision_type=4 AND d.actual=1) EAEU_STAT    
      group by EAEU_STAT.country_arm`,
    asylum_closed: ` FROM (
          SELECT    a.personal_id,    c.country_arm,    YEAR(d.decison_date) - a.b_year AS age,    a.sex FROM    tb_person a 
          INNER JOIN tb_decisions d ON d.case_id = a.case_id 
          INNER JOIN tb_country c ON    a.citizenship = c.country_id 
          WHERE ${quarter_where_condition}  d.decision_type=5 AND d.actual=1) EAEU_STAT    
      group by EAEU_STAT.country_arm`,
  };

  return statisticsBaseQuery + statisticsQueriesFrom[table_name];
};

const formatTotalAsylumQuery = ({ year, month, period }) => {
  let periodWhereCondition = "";
  if (period == "1") {
    periodWhereCondition += ` AND QUARTER(asylum_general_stats.period) IN (1,2) `;
  } else if (period == "2") {
    periodWhereCondition += ` AND QUARTER(asylum_general_stats.period) IN (3,4)  `;
  } else if (period == "4") {
    periodWhereCondition += ` AND QUARTER(asylum_general_stats.period) =1 `;
  } else if (period == "5") {
    periodWhereCondition += ` AND QUARTER(asylum_general_stats.period) =2 `;
  } else if (period == "6") {
    periodWhereCondition += ` AND QUARTER(asylum_general_stats.period) =3  `;
  } else if (period == "7") {
    periodWhereCondition += ` AND QUARTER(asylum_general_stats.period) =4  `;
  } else if (period == "8") {
    periodWhereCondition += ` AND QUARTER(asylum_general_stats.period) IN(1,2,3) `;
  }
  const whereCondition = month
    ? ` YEAR(asylum_general_stats.period) = '${year}' and MONTH(asylum_general_stats.period) = ${month} `
    : ` YEAR(asylum_general_stats.period) = '${year}'  ${periodWhereCondition} `;

  const query = `SELECT
  asylum_general_stats.country_arm,
  count(if(asylum_general_stats.TABLE_NAME = 'table_1', asylum_general_stats.count_parametr, null)) as asylum_seeker,
  count(if(asylum_general_stats.TABLE_NAME = 'table_2' and asylum_general_stats.count_parametr = 3, asylum_general_stats.count_parametr, null)) as positive_decisions,
  count(if(asylum_general_stats.TABLE_NAME = 'table_2' and asylum_general_stats.count_parametr = 4, asylum_general_stats.count_parametr, null)) as negative_decisions,
  count(if(asylum_general_stats.TABLE_NAME = 'table_2' and asylum_general_stats.count_parametr = 5, asylum_general_stats.count_parametr, null)) as cease_decisions,
  count(if(asylum_general_stats.TABLE_NAME = 'table_2' and asylum_general_stats.count_parametr in (11,12), asylum_general_stats.count_parametr, null)) as terminate_decisions
  FROM
  (SELECT a.case_id, b.personal_id as count_parametr, a.mul_date as period, d.country_id, d.country_arm, d.country_eng, 'table_1' as TABLE_NAME FROM tb_case a inner join tb_person b on a.case_id = b.case_id  inner join tb_country d on b.citizenship = d.country_id
  UNION
  SELECT c.case_id, c.decision_type as count_parametr, date(c.decison_date) as period, g.country_id, g.country_arm, g.country_eng, 'table_2' as TABLE_NAME from tb_decisions c
  inner join tb_case e on c.case_id = e.case_id inner join tb_person f on e.case_id = f.case_id inner join tb_country g on f.citizenship = g.country_id  where c.decision_status = 5) asylum_general_stats
  where ${whereCondition}
  group by (asylum_general_stats.country_id)`;

  return query;
};

module.exports = { formatAsylumQuery, formatTotalAsylumQuery };
