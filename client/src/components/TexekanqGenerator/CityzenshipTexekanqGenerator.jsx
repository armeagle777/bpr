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
} from "@mui/material";

const CityzenshipTexekanqGenerator = ({ disabled, data, fileName, user }) => {
  const { onCreateTexekanq, texekanqData, texekanqIsLoading } =
    useTexekanqData();

  const [mulNumber, setMulNumber] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const { firstName, lastName, pashton } = user;
  const userFullName = `${firstName} ${lastName}`;

  if (!pashton) {
    return null;
  }

  const handleCreateTexekanq = () => {
    onCreateTexekanq({
      pnum: PNum,
      person_birth: Birth_Date,
      person_birth_place: Birth_Region || Birth_Country.CountryName,
      person_fname: First_Name,
      person_lname: Last_Name,
      person_mname: Patronymic_Name,
      TexekanqtypeId: 1,
      mul_number: mulNumber,
    });
    setDialogOpen(false);
  };

  const { PNum, documents } = data;
  const validDocument = documents.find(
    (doc) => doc.Document_Status === "PRIMARY_VALID"
  );

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
              <TextField
                autoFocus
                margin="dense"
                label="Մալբրի համակարգի N"
                fullWidth
                value={mulNumber}
                onChange={(e) => setMulNumber(e.target.value)}
              />
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
