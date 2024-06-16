const { statisticsBaseQuery, periodsMap } = require("./constants");

const formatAsylumQuery = ({ table_name, year, month, period }) => {
  let quarter_where_condition = ` YEAR(d.decison_date) = ${year} AND`;
  let applications_quarter_where_condition = ` YEAR(cs.mul_date) = ${year}  `;

  if (period == periodsMap.H1) {
    quarter_where_condition += ` QUARTER(d.decison_date) IN (1,2) AND `;
    applications_quarter_where_condition += ` AND QUARTER(cs.mul_date) IN (1,2) `;
  } else if (period == periodsMap.H2) {
    quarter_where_condition += ` QUARTER(d.decison_date) IN (3,4)  AND `;
    applications_quarter_where_condition += ` AND QUARTER(cs.mul_date) IN (3,4)  `;
  } else if (period == periodsMap.Q1) {
    quarter_where_condition += ` QUARTER(d.decison_date) =1  AND `;
    applications_quarter_where_condition += ` AND QUARTER(cs.mul_date) =1  `;
  } else if (period == periodsMap.Q2) {
    quarter_where_condition += ` QUARTER(d.decison_date) =2  AND `;
    applications_quarter_where_condition += ` AND QUARTER(cs.mul_date) =2  `;
  } else if (period == periodsMap.Q3) {
    quarter_where_condition += ` QUARTER(d.decison_date) =3  AND `;
    applications_quarter_where_condition += ` AND QUARTER(cs.mul_date) =3  `;
  } else if (period == periodsMap.Q4) {
    quarter_where_condition += ` QUARTER(d.decison_date) =4  AND `;
    applications_quarter_where_condition += ` AND QUARTER(cs.mul_date) =4  `;
  } else if (period == periodsMap["9MONTHLY"]) {
    quarter_where_condition += ` QUARTER(d.decison_date) IN(1,2,3)  AND `;
    applications_quarter_where_condition += ` AND QUARTER(cs.mul_date) IN(1,2,3) `;
  } else if (period == periodsMap.MONTHLY && month) {
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
          SELECT    
          a.personal_id,    
          c.country_arm,    
          YEAR(d.decison_date) - a.b_year AS age,    
          a.sex 
            FROM tb_person a 
            INNER JOIN tb_decisions d ON d.case_id = a.case_id 
            INNER JOIN tb_country c ON    a.citizenship = c.country_id 
            WHERE ${quarter_where_condition}  
              a.person_status = 2 
              AND d.decision_type=3 
              AND d.decision_status=5 
              AND d.actual=1) EAEU_STAT    
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
  if (period == periodsMap.H1) {
    periodWhereCondition += ` AND QUARTER(asylum_general_stats.period) IN (1,2) `;
  } else if (period == periodsMap.H2) {
    periodWhereCondition += ` AND QUARTER(asylum_general_stats.period) IN (3,4)  `;
  } else if (period == periodsMap.Q1) {
    periodWhereCondition += ` AND QUARTER(asylum_general_stats.period) =1 `;
  } else if (period == periodsMap.Q2) {
    periodWhereCondition += ` AND QUARTER(asylum_general_stats.period) =2 `;
  } else if (period == periodsMap.Q3) {
    periodWhereCondition += ` AND QUARTER(asylum_general_stats.period) =3  `;
  } else if (period == periodsMap.Q4) {
    periodWhereCondition += ` AND QUARTER(asylum_general_stats.period) =4  `;
  } else if (period == periodsMap["9MONTHLY"]) {
    periodWhereCondition += ` AND QUARTER(asylum_general_stats.period) IN(1,2,3) `;
  }
  const whereCondition = month
    ? ` YEAR(asylum_general_stats.period) = '${year}' and MONTH(asylum_general_stats.period) = ${month} `
    : ` YEAR(asylum_general_stats.period) = '${year}'  ${periodWhereCondition} `;

  const query = `SELECT
  asylum_general_stats.country_id as 'key',
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
  group by asylum_general_stats.country_id, asylum_general_stats.country_arm`;

  return query;
};

const formatTotalBorderCrossQuery = ({ year, month, period, borderCross }) => {
  borderCross === "type" ? "" : "";
  const mainColumnNames = { type: "cross_type", point: "cross_point" };
  const periodConditions = {
    h1: "  AND month IN (1,2,3,4,5,6)",
    h2: "  AND month IN (7,8,9,10,11,12)",
    annual: "",
    q1: "  AND month IN (1,2,3)",
    q2: "  AND month IN (4,5,6)",
    q3: "  AND month IN (7,8,9)",
    q4: "  AND month IN (10,11,12)",
    "9monthly": "  AND month IN (1,2,3,4,5,6,7,8,9)",
    monthly: ` AND month = ${month}`,
  };

  const baseQuery = `SELECT 
        ${mainColumnNames[borderCross]} AS main_column, 
          SUM(CASE WHEN country = 'ARMENIA' THEN in_count ELSE 0 END) AS arm_in,
          SUM(CASE WHEN country = 'ARMENIA' THEN out_count ELSE 0 END) AS arm_out,
          SUM(CASE WHEN country = 'ARMENIA' THEN in_count ELSE 0 END) - SUM(CASE WHEN country = 'ARMENIA' THEN out_count ELSE 0 END) AS arm_net,
          SUM(CASE WHEN country <> 'ARMENIA' THEN in_count ELSE 0 END) AS other_in,
          SUM(CASE WHEN country <> 'ARMENIA' THEN out_count ELSE 0 END) AS other_out,
          SUM(CASE WHEN country <> 'ARMENIA' THEN in_count ELSE 0 END) - SUM(CASE WHEN country <> 'ARMENIA' THEN out_count ELSE 0 END) AS other_net,
          SUM(in_count) AS total_in,
          SUM(out_count) AS total_out,
          SUM(in_count) - SUM(out_count) AS total_net
      FROM crosses 
      WHERE 
          year = ${year} 
          ${periodConditions[period]}
      GROUP BY 
          ${mainColumnNames[borderCross]};`;

  return baseQuery;
};

const formatCountryBorderCrossQuery = ({ year, month, period }) => {
  const periodConditions = {
    h1: "  AND month IN (1,2,3,4,5,6)",
    h2: "  AND month IN (7,8,9,10,11,12)",
    annual: "",
    q1: "  AND month IN (1,2,3)",
    q2: "  AND month IN (4,5,6)",
    q3: "  AND month IN (7,8,9)",
    q4: "  AND month IN (10,11,12)",
    "9monthly": "  AND month IN (1,2,3,4,5,6,7,8,9)",
    monthly: ` AND month = ${month}`,
  };

  const baseQuery = `SELECT 
        country, 
          SUM(CASE WHEN cross_type = 'AIR' THEN in_count ELSE 0 END) AS air_in,
          SUM(CASE WHEN cross_type = 'AIR' THEN out_count ELSE 0 END) AS air_out,
          SUM(CASE WHEN cross_type = 'AIR' THEN in_count ELSE 0 END) - SUM(CASE WHEN cross_type = 'AIR' THEN out_count ELSE 0 END) AS air_net,
          SUM(CASE WHEN cross_type = 'LAND' THEN in_count ELSE 0 END) AS land_in,
          SUM(CASE WHEN cross_type = 'LAND' THEN out_count ELSE 0 END) AS land_out,
          SUM(CASE WHEN cross_type = 'LAND' THEN in_count ELSE 0 END) - SUM(CASE WHEN cross_type = 'LAND' THEN out_count ELSE 0 END) AS land_net,
          SUM(CASE WHEN cross_type = 'RAILWAY' THEN in_count ELSE 0 END) AS railway_in,
          SUM(CASE WHEN cross_type = 'RAILWAY' THEN out_count ELSE 0 END) AS railway_out,
          SUM(CASE WHEN cross_type = 'RAILWAY' THEN in_count ELSE 0 END) - SUM(CASE WHEN cross_type = 'RAILWAY' THEN out_count ELSE 0 END) AS railway_net,
          SUM(in_count) AS total_in,
          SUM(out_count) AS total_out,
          SUM(in_count) - SUM(out_count) AS total_net
      FROM crosses 
      WHERE 
          year = ${year} 
          ${periodConditions[period]}
      GROUP BY 
          country;`;

  return baseQuery;
};

const formatPeriodBorderCrossQuery = ({ year, month, period }) => {
  switch (period) {
    case periodsMap.ANNUAL:
      return `SELECT 
            year AS main_column,
            SUM(CASE WHEN country = 'ARMENIA' THEN in_count ELSE 0 END) AS arm_in,
            SUM(CASE WHEN country = 'ARMENIA' THEN out_count ELSE 0 END) AS arm_out,
            SUM(CASE WHEN country = 'ARMENIA' THEN in_count ELSE 0 END) - SUM(CASE WHEN country = 'ARMENIA' THEN out_count ELSE 0 END) AS arm_net,
            SUM(CASE WHEN country <> 'ARMENIA' THEN in_count ELSE 0 END) AS other_in,
            SUM(CASE WHEN country <> 'ARMENIA' THEN out_count ELSE 0 END) AS other_out,
            SUM(CASE WHEN country <> 'ARMENIA' THEN in_count ELSE 0 END) - SUM(CASE WHEN country <> 'ARMENIA' THEN out_count ELSE 0 END) AS other_net,
            SUM(in_count) AS total_in,
            SUM(out_count) AS total_out,
            SUM(in_count) - SUM(out_count) AS total_net
        FROM 
            crosses
        WHERE 
            year IN (${year})
        GROUP BY 
            year
        ORDER BY 
            year DESC;`;
    case periodsMap.Q1:
      return quarterlyQueryBuilder(year, 1);
    case periodsMap.Q2:
      return quarterlyQueryBuilder(year, 2);
    case periodsMap.Q3:
      return quarterlyQueryBuilder(year, 3);
    case periodsMap.Q4:
      return quarterlyQueryBuilder(year, 4);
    case periodsMap.H1:
      return halfyearQueryBuilder(year, 1);
    case periodsMap.H2:
      return halfyearQueryBuilder(year, 2);
    case periodsMap.MONTHLY:
      return `SELECT 
          CONCAT(year, '-', LPAD(month, 2, '0')) AS main_column,
          SUM(CASE WHEN country = 'ARMENIA' THEN in_count ELSE 0 END) AS arm_in,
          SUM(CASE WHEN country = 'ARMENIA' THEN out_count ELSE 0 END) AS arm_out,
          SUM(CASE WHEN country = 'ARMENIA' THEN in_count ELSE 0 END) - SUM(CASE WHEN country = 'ARMENIA' THEN out_count ELSE 0 END) AS arm_net,
          SUM(CASE WHEN country <> 'ARMENIA' THEN in_count ELSE 0 END) AS other_in,
          SUM(CASE WHEN country <> 'ARMENIA' THEN out_count ELSE 0 END) AS other_out,
          SUM(CASE WHEN country <> 'ARMENIA' THEN in_count ELSE 0 END) - SUM(CASE WHEN country <> 'ARMENIA' THEN out_count ELSE 0 END) AS other_net,
          SUM(in_count) AS total_in,
          SUM(out_count) AS total_out,
          SUM(in_count) - SUM(out_count) AS total_net
      FROM 
          crosses
      WHERE 
          year IN (${year})
          AND month = ${month}
      GROUP BY 
          year, month
      ORDER BY 
          year DESC, month DESC;`;
    default:
      throw new Error("Invalid period specified");
  }
};

function quarterlyQueryBuilder(years, quarter) {
  return `SELECT 
  CONCAT(year, ' Q', ${quarter}) AS main_column,
  SUM(CASE WHEN country = 'ARMENIA' THEN in_count ELSE 0 END) AS arm_in,
  SUM(CASE WHEN country = 'ARMENIA' THEN out_count ELSE 0 END) AS arm_out,
  SUM(CASE WHEN country = 'ARMENIA' THEN in_count ELSE 0 END) - SUM(CASE WHEN country = 'ARMENIA' THEN out_count ELSE 0 END) AS arm_net,
  SUM(CASE WHEN country <> 'ARMENIA' THEN in_count ELSE 0 END) AS other_in,
  SUM(CASE WHEN country <> 'ARMENIA' THEN out_count ELSE 0 END) AS other_out,
  SUM(CASE WHEN country <> 'ARMENIA' THEN in_count ELSE 0 END) - SUM(CASE WHEN country <> 'ARMENIA' THEN out_count ELSE 0 END) AS other_net,
  SUM(in_count) AS total_in,
  SUM(out_count) AS total_out,
  SUM(in_count) - SUM(out_count) AS total_net
FROM 
  crosses
WHERE 
  year IN (${years})
  AND QUARTER(STR_TO_DATE(CONCAT(year, '-', LPAD(month, 2, '0'), '-01'), '%Y-%m-%d')) = ${quarter}
GROUP BY 
  year, QUARTER(STR_TO_DATE(CONCAT(year, '-', LPAD(month, 2, '0'), '-01'), '%Y-%m-%d'))
ORDER BY 
  year DESC, QUARTER(STR_TO_DATE(CONCAT(year, '-', LPAD(month, 2, '0'), '-01'), '%Y-%m-%d')) DESC;`;
}

function halfyearQueryBuilder(years, half) {
  const halfCondition =
    half === 1 ? " AND month BETWEEN 1 AND 6" : " AND month BETWEEN 7 AND 12";
  return `SELECT 
  CONCAT(year, ' H', IF(month BETWEEN 1 AND 6, 1, 2)) AS main_column,
  SUM(CASE WHEN country = 'ARMENIA' THEN in_count ELSE 0 END) AS arm_in,
  SUM(CASE WHEN country = 'ARMENIA' THEN out_count ELSE 0 END) AS arm_out,
  SUM(CASE WHEN country = 'ARMENIA' THEN in_count ELSE 0 END) - SUM(CASE WHEN country = 'ARMENIA' THEN out_count ELSE 0 END) AS arm_net,
  SUM(CASE WHEN country <> 'ARMENIA' THEN in_count ELSE 0 END) AS other_in,
  SUM(CASE WHEN country <> 'ARMENIA' THEN out_count ELSE 0 END) AS other_out,
  SUM(CASE WHEN country <> 'ARMENIA' THEN in_count ELSE 0 END) - SUM(CASE WHEN country <> 'ARMENIA' THEN out_count ELSE 0 END) AS other_net,
  SUM(in_count) AS total_in,
  SUM(out_count) AS total_out,
  SUM(in_count) - SUM(out_count) AS total_net
FROM 
  crosses
WHERE 
  year IN (${years}) ${halfCondition}
GROUP BY 
  year,IF(month BETWEEN 1 AND 6, 1, 2),CONCAT(year, ' H', IF(month BETWEEN 1 AND 6, 1, 2))
ORDER BY 
  year DESC, IF(month BETWEEN 1 AND 6, 1, 2) DESC;
`;
}

module.exports = {
  formatAsylumQuery,
  formatTotalAsylumQuery,
  formatTotalBorderCrossQuery,
  formatPeriodBorderCrossQuery,
  formatCountryBorderCrossQuery,
};
