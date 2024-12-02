import { PDFDownloadLink } from "@react-pdf/renderer";
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
import { message } from "antd";

const TexekanqGenerator = ({
  Icon,
  data,
  variant,
  fileName,
  buttonText,
  iconButton,
  PDFTemplate,
  user,
}) => {
  const { onCreateTexekanq, texekanqData, texekanqIsLoading } =
    useTexekanqData();
  const [mulNumber, setMulNumber] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const { firstName, lastName, pashton } = user;
  const userFullName = `${firstName} ${lastName}`;

  if (!pashton) {
    return message.error("Օգտատիրոջ պաշտոնը բացակայում է");
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
    setDialogOpen(false); // Close dialog after submission
  };

  const { PNum, documents } = data;
  const validDocument = documents.find(
    (doc) => doc.Document_Status === "PRIMARY_VALID"
  );

  const invalidDocument = documents.find(
    (doc) => doc.Document_Status !== "PRIMARY_VALID"
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
            color="primary"
            loading={texekanqIsLoading}
            variant="outlined"
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
                Cancel
              </Button>
              <Button
                onClick={handleCreateTexekanq}
                color="primary"
                disabled={!mulNumber}
              >
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}

      {texekanqData && (
        <PDFDownloadLink
          document={
            <PDFTemplate data={texekanqData} userFullName={userFullName} />
          }
          fileName={fileName}
        >
          {({ blob, url, loading, error }) => {
            return (
              <LoadingButton
                color="error"
                loading={loading}
                variant={variant}
                endIcon={<Icon />}
              >
                Պահպանել
              </LoadingButton>
            );
          }}
        </PDFDownloadLink>
      )}
    </>
  );
};

export default TexekanqGenerator;
