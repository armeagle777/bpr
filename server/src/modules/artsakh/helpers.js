export const getDisplacementCasesQuery = (pnum) => `SELECT C.case_id,
                                        CT.case_type_name
                                        FROM tb_case C 
                                        LEFT JOIN case_types CT ON CT.id = C.case_type_id
                                        LEFT JOIN tb_case_person CP ON CP.case_id = C.case_id
                                        LEFT JOIN tb_person P ON P.personal_id = CP.personal_id
                                        WHERE P.pnum = ${pnum}`;

export const getDisplacementCertsQuery = (pnum) => `SELECT * 
                                        FROM jkk_certificates C
                                        WHERE C.pnum = ${pnum}`;
