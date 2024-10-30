const getWpQuery = (pnum) => `SELECT
                    a.ssn,
                    b.id AS employee_id,
                    c.id AS claim_id,
                    c.created_at,
                    c.status,
                    c.type as claim_type,
                    log.created_at as decision_date,
                    log.action,
                    log.type,
                    d.serial_number,
                    d.issue_date,
                    d.expire_date,
                    d.printed_at,
                    d.transferred_at,
                    d.created_at,
                    e.type as vacancy_type,
                    e.company_id,
                    h.tin,
                    h.name,
                    h.email as company_email,
                    h.telephone as company_tel,
                    e.position_code_id,
                    g.name_am,
                    a.email as user_email,
                    a.telephone as user_tel,
                    image.path as photo_path
                FROM
                    users a
                        INNER JOIN
                    employees b ON a.id = b.user_id
                        INNER JOIN
                    claims c ON b.id = c.employee_id
                left join
                (select * from ms_logs f where f.id = (SELECT MAX(t4.id) from ms_logs t4 where f.claim_id = t4.claim_id) and f.type = 6) as log on log.claim_id = c.id
                left join
                ms_cards d on d.claim_id = c.id
                inner join
                vacancies e on c.vacancy_id = e.id
                INNER join
                position_codes g on e.position_code_id = g.id
                inner join
                companies h on e.company_id = h.id
                left join (select path, claim_id from claim_files p where p.active = 1 and p.type = 'photo') as image on image.claim_id = c.id
                WHERE
                    a.ssn =${pnum} 
                    and c.status != 'pending_foreigner'`;

const getEatmQuery = (pnum) => `SELECT
                        a.id as user_id,
                        a.ssn,
                        a.first_name_am ,
                        a.last_name_am,
                        a.patronymic_am,
                        a.first_name_en,
                        a.last_name_en,
                        a.patronymic_en,
                        b.id AS eaeu_employee_id,
                        c.id AS claim_id,
                        c.created_at,
                        c.status,
                        c.type as claim_type,
                        b.actual_address as filled_in_address,
                        b.agreement_start_date,
                        b.agreement_end_date,
                        b.passport_number,
                        b.passport_issued,
                        b.passport_valid,
                        log.created_at as decision_date,
                        log.action,
                        log.type,
                        d.serial_number,
                        d.issue_date,
                        d.expire_date,
                        d.printed_at,
                        d.transferred_at,
                        d.created_at,
                        a.email as user_email,
                        a.telephone as user_tel,
                        image.path as photo_path
                    FROM
                        users a
                    INNER JOIN eaeu_employees b ON a.id = b.user_id
                    INNER JOIN claims c ON b.id = c.eaeu_employee_id
                    LEFT JOIN (select * from ms_logs f where f.id = (SELECT MAX(t4.id) from ms_logs t4 where f.claim_id = t4.claim_id) and f.type = 6) as log on log.claim_id = c.id
                    LEFT JOIN ms_cards d on d.claim_id = c.id
                    LEFT JOIN (select path, claim_id from claim_files p where p.active = 1 and p.type = 'photo') as image on image.claim_id = c.id
                    WHERE
                        a.ssn='${pnum}' `;

const getEatmFamilyMemberQuery = (pnum) => `SELECT
                        a.user_id as applicant_user_id,
                        a.ssn as family_member_ssn,
                        a.id as eaeu_employee_family_member_id,
                        a.first_name_am as family_member_first_name_am,
                        a.last_name_am as family_member_last_name_am,
                        a.patronymic_am as family_member_patronymic_am,
                        a.first_name_en as family_member_first_name_en,
                        a.last_name_en as family_member_last_name_en,
                        a.patronymic_en as family_member_patronymic_en,
                        a.passport_number as family_member_passport,
                        a.passport_issued as family_member_passport_issued,
                        a.passport_valid as family_member_passport_valid,
                        a.email as family_member_email,
                        a.telephone as family_member_tel,
                        a.gender_id,
                        a.family_member_id,
                        concat(a.birthday_day, '.', a.birthday_month, '.', a.birthday_year) as family_member_bday,
                        d.name_am as family_member_citizenship,
                        d.alpha_3 as family_member_citizenship_alpha_3,
                        b.id as claim_id,
                        b.created_at as claim_date,
                        b.status as claim_status,
                        b.type as claim_type,
                        log.created_at as decision_date,
                        log.action,
                        log.type,
                        e.serial_number as family_member_card,
                        e.issue_date as family_member_card_issue_date,
                        e.expire_date as family_member_card_expire_date,
                        c.ssn as applicant_ssn,
                        c.first_name_am as applicant_first_name_am,
                        c.last_name_am as applicant_last_name_am,
                        c.first_name_en as applicant_first_name_en,
                        c.last_name_en as applicant_last_name_em,
                        image.path as photo_path
                        from eaeu_employee_family_members a
                        inner join claims b on a.id = b.eaeu_employee_family_member_id
                        inner join users c on a.user_id = c.id
                        inner join countries d on a.citizenship_id = d.id
                        left join
                        (select * from ms_logs f where f.id = (SELECT MAX(t4.id) from ms_logs t4 where f.claim_id = t4.claim_id) and f.type = 6) as log on log.claim_id = b.id
                        left join
                        ms_cards e on b.id = e.claim_id
                        left join (select path, claim_id from claim_files p where p.active = 1 and p.type = 'photo') as image on image.claim_id = b.id
                        WHERE a.ssn=${pnum}`;

const extractData = (row) => {
  const cards = [];
  const data = row?.map((row) => {
    const {
      serial_number,
      issue_date,
      expire_date,
      printed_at,
      card_status,
      transferred_at,
      ...rowData
    } = row;
    if (serial_number) {
      cards.push({
        serial_number,
        issue_date,
        expire_date,
        printed_at,
        card_status,
        transferred_at,
      });
    }
    return rowData;
  });

  return { cards, data: data ?? null };
};

module.exports = {
  getWpQuery,
  getEatmQuery,
  getEatmFamilyMemberQuery,
  extractData,
};
