import LoadingButton from "@mui/lab/LoadingButton";
import { useTexekanqData } from "../../hooks/useTexekanqData";
import { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
} from "@mui/material";

const CityzenshipTexekanqGenerator = ({ disabled, data, fileName, user }) => {
  const { onCreateTexekanq, texekanqData, texekanqIsLoading } =
    useTexekanqData();
  const { PNum, documents } = data;
  const [mulNumber, setMulNumber] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [texekanqPassport, setTexekanqPassport] = useState(
    documents?.[documents?.length - 1]
  );

  const { firstName, lastName, pashton } = user;
  const userFullName = `${firstName} ${lastName}`;

  if (!pashton) {
    return null;
  }

  const validDocument = documents.find(
    (doc) => doc.Document_Status === "PRIMARY_VALID"
  );

  // const priorityOrder = [
  //   {
  //     Document_Status: "PRIMARY_VALID",
  //     Document_Type: "NON_BIOMETRIC_PASSPORT",
  //   },
  //   { Document_Status: "PRIMARY_VALID", Document_Type: "ID_CARD" },
  //   { Document_Status: "INVALID", Document_Type: "NON_BIOMETRIC_PASSPORT" },
  //   { Document_Status: "INVALID", Document_Type: "ID_CARD" },
  // ];

  // const texekanqPassport = priorityOrder.map((priority) =>
  //   documents.find(
  //     (doc) =>
  //       doc.Document_Status === priority.Document_Status &&
  //       doc.Document_Type === priority.Document_Type
  //   )
  // );

  const invalidDocument = documents.find(
    (doc) => doc.Document_Status === "INVALID"
  );
  const Person = validDocument?.Person || invalidDocument?.Person;
  const {
    Birth_Country,
    Birth_Date,
    Birth_Region,
    First_Name,
    Last_Name,
    Patronymic_Name,
  } = Person;

  const handleDocSelectChange = (e) => {
    if (!e.target.value) return;
    setTexekanqPassport(e.target.value);
  };

  const handleCreateTexekanq = () => {
    const texekanqOptions = {
      pnum: PNum,
      person_birth: Birth_Date,
      person_birth_place: Birth_Region || Birth_Country.CountryName,
      person_fname: First_Name,
      person_lname: Last_Name,
      person_mname: Patronymic_Name,
      TexekanqtypeId: 1,
      mul_number: mulNumber,
      passport_issue_date: texekanqPassport.PassportData.Passport_Issuance_Date,
      passport_series:
        texekanqPassport.Document_Type === "ID_CARD"
          ? undefined
          : texekanqPassport.Document_Number?.slice(0, 2),
      passport_number:
        texekanqPassport.Document_Type === "ID_CARD"
          ? texekanqPassport.Document_Number
          : texekanqPassport.Document_Number?.slice(2),
    };
    console.log("texekanqOptions", texekanqOptions);
    onCreateTexekanq(texekanqOptions);
    setDialogOpen(false);
  };

  documents.reverse();

  return (
    <>
      {!texekanqData && (
        <>
          <LoadingButton
            fullWidth
            color="primary"
            loading={texekanqIsLoading}
            variant="outlined"
            disabled={disabled}
            onClick={() => setDialogOpen(true)}
          >
            Քաղաքացիության տեղեկանք
          </LoadingButton>
          <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
            <DialogTitle>Մուտքագրել մալբրի համարը</DialogTitle>
            <DialogContent>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <TextField
                    autoFocus
                    margin="dense"
                    label="Մալբրի համակարգի N"
                    fullWidth
                    value={mulNumber}
                    onChange={(e) => setMulNumber(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Select
                    fullWidth
                    id="Փաստաթուղթ"
                    value={texekanqPassport}
                    placeholder="Փաստաթուղթ"
                    aria-label="Փաստաթուղթ"
                    label="Փաստաթուղթ"
                    onChange={handleDocSelectChange}
                    style={{ minWidth: 200 }}
                  >
                    {documents?.map((passport, index) => (
                      <MenuItem key={index} value={passport}>
                        {passport?.Document_Number}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDialogOpen(false)} color="secondary">
                Չեղարկել
              </Button>
              <Button
                onClick={handleCreateTexekanq}
                color="primary"
                disabled={!mulNumber}
              >
                Հաստատել
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}

      {texekanqData && (
        <a
          href={`data:application/pdf;base64,${texekanqData}`}
          download={fileName}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px", // For spacing between text and icon
            padding: "6px 16px", // Matches MUI button padding
            borderRadius: "4px", // Matches MUI's default button radius
            backgroundColor: "#d32f2f", // MUI error color
            color: "white",
            textDecoration: "none",
            fontSize: "0.875rem", // MUI button font size
            fontWeight: 500,
            lineHeight: 1.75,
            transition: "background-color 0.3s, color 0.3s",
            cursor: "pointer",
            border: "none",
            width: "100%",
          }}
        >
          Ներբեռնել քաղաքացիության տեղեկանքը
        </a>
      )}
    </>
  );
};

export default CityzenshipTexekanqGenerator;
