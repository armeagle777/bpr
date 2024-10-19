import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

const EatmFamilyClaimCard = ({ claim }) => {
  const navigate = useNavigate();
  const {
    applicant_user_id,
    family_member_ssn,
    eaeu_employee_family_member_id,
    family_member_first_name_am,
    family_member_last_name_am,
    family_member_patronymic_am,
    family_member_first_name_en,
    family_member_last_name_en,
    family_member_patronymic_en,
    family_member_passport,
    family_member_passport_issued,
    family_member_passport_valid,
    family_member_email,
    family_member_tel,
    gender_id,
    family_member_id,
    family_member_bday,
    family_member_citizenship,
    family_member_citizenship_alpha_3,
    claim_id,
    claim_date,
    claim_status,
    claim_type,
    ssn,
    decision_date,
    action,
    type,
    family_member_card,
    family_member_card_issue_date,
    family_member_card_expire_date,
    applicant_first_name_am,
    applicant_last_name_am,
    applicant_first_name_en,
    applicant_last_name_em,
  } = claim;
  const fullName = `${family_member_first_name_am} ${family_member_last_name_am}${
    family_member_patronymic_am ? ` ${family_member_patronymic_am}` : ""
  } | ${family_member_first_name_en} ${family_member_last_name_en}${
    family_member_patronymic_en ? ` ${family_member_patronymic_en}` : ""
  }`;
  const user = useAuthUser();

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography
          sx={{ fontSize: 14, fontWeight: "bold" }}
          color="text.secondary"
          gutterBottom
        >
          {fullName}
        </Typography>
        {/* {artsakhAddress && (
          <Typography variant="body2" color="text.secondary">
            <small>Տեղահանման հասցե:</small> {artsakhAddress}
          </Typography>
        )} */}
        {/* {armAddress && (
          <Typography variant="body2" color="text.secondary">
            <small>Բնակության հասցե:</small> <strong>{armAddress}</strong>
          </Typography>
        )} */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <small>Հասցեի տեսակը</small> : <strong>{}</strong>
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <small>Նշանակություն</small> : <strong>{}</strong>
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <small>Իրավունքների գրանցման ամսաթիվը </small> : <strong>{}</strong>
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <small>Մակերեսը </small> :{"  "}
          <strong>{}</strong>
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <small>Կարգավիճակ</small> :{" "}
          {/* <span
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: actual == 0 ? "red" : "green",
              display: "inline-block",
            }}
          ></span> */}
        </Typography>
        {/* <GoogleMap latitude={40.1792} longitude={44.4991} /> */}
      </CardContent>
      <CardActions>
        {/* <Button
          // onClick={() => navigate(`/register/${taxid}`)}
          size="small"
        >
          Ավելին
        </Button> */}
      </CardActions>
    </Card>
  );
};

export default EatmFamilyClaimCard;
