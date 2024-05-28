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

$quarter_where_condition = " YEAR(d.decison_date) = $year AND";
$applications_quarter_where_condition = " YEAR(cs.mul_date) = $year  ";
if ($period == "1") {
  $quarter_where_condition += " QUARTER(d.decison_date) IN (1,2) AND ";
  $applications_quarter_where_condition +=
    " AND QUARTER(cs.mul_date) IN (1,2) ";
}
elseif($period == "2");
{
  $quarter_where_condition += " QUARTER(d.decison_date) IN (3,4)  AND ";
  $applications_quarter_where_condition +=
    " AND QUARTER(cs.mul_date) IN (3,4)  ";
}
elseif($period == "4");
{
  $quarter_where_condition += " QUARTER(d.decison_date) =1  AND ";
  $applications_quarter_where_condition += " AND QUARTER(cs.mul_date) =1  ";
}
elseif($period == "5");
{
  $quarter_where_condition += " QUARTER(d.decison_date) =2  AND ";
  $applications_quarter_where_condition += " AND QUARTER(cs.mul_date) =2  ";
}
elseif($period == "6");
{
  $quarter_where_condition += " QUARTER(d.decison_date) =3  AND ";
  $applications_quarter_where_condition += " AND QUARTER(cs.mul_date) =3  ";
}
elseif($period == "7");
{
  $quarter_where_condition += " QUARTER(d.decison_date) =4  AND ";
  $applications_quarter_where_condition += " AND QUARTER(cs.mul_date) =4  ";
}
elseif($period == "8");
{
  $quarter_where_condition += " QUARTER(d.decison_date) IN(1,2,3)  AND ";
  $applications_quarter_where_condition +=
    " AND QUARTER(cs.mul_date) IN(1,2,3) ";
}
elseif($period == "9");
{
  $quarter_where_condition += " MONTH(d.decison_date) = $month  AND ";
  $applications_quarter_where_condition += " AND MONTH(cs.mul_date) =$month ";
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
        WHERE ${quarter_where_condition}  a.person_status = 2 AND d.decision_type=3 AND d.actual=1) EAEU_STAT    
    group by EAEU_STAT.country_arm`,
  refugees_withdrawn: ` FROM (
        SELECT    a.personal_id,    c.country_arm,    YEAR(d.decison_date) - a.b_year AS age,    a.sex FROM    tb_person a 
        INNER JOIN tb_decisions d ON d.case_id = a.case_id 
        INNER JOIN tb_country c ON    a.citizenship = c.country_id 
        WHERE ${quarter_where_condition}  d.decision_type IN(11,13) AND d.actual=1 ) EAEU_STAT    
    group by EAEU_STAT.country_arm`,
  refugee_ceased: ` FROM (
        SELECT    a.personal_id,    c.country_arm,    YEAR(d.decison_date) - a.b_year AS age,    a.sex FROM    tb_person a 
        INNER JOIN tb_decisions d ON d.case_id = a.case_id 
        INNER JOIN tb_country c ON    a.citizenship = c.country_id 
        WHERE ${quarter_where_condition}  d.decision_type IN(12,13) AND d.actual=1 ) EAEU_STAT    
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
