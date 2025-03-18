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
  OutlinedInput,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { documentStatusesMap } from "../../utils/constants";
import { texekanqAllowedDocuments } from "./constants";

const CityzenshipTexekanqGenerator = ({ disabled, data, fileName, user }) => {
  const { onCreateTexekanq, texekanqData, texekanqIsLoading } =
    useTexekanqData();
  const { PNum, documents } = data;
  const allowedDocuments = documents
    .filter((doc) => texekanqAllowedDocuments.includes(doc.Document_Type))
    .map((doc) => {
      delete doc.Photo_ID;
      return doc;
    });
  const initialTexekanqPassports = allowedDocuments?.length
    ? [allowedDocuments[allowedDocuments.length - 1]]
    : [];
  const [mulNumber, setMulNumber] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [texekanqPassports, setTexekanqPassports] = useState(
    initialTexekanqPassports
  );
  const { firstName, lastName, pashton } = user;

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

  const handleDocSelectChange = (event) => {
    const {
      target: { value },
    } = event;
    if (!value) return;
    setTexekanqPassports(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
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
      passports: texekanqPassports,
    };
    onCreateTexekanq(texekanqOptions);
    setDialogOpen(false);
  };

  // documents.reverse();

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
                    multiple
                    id="Փաստաթուղթ"
                    value={texekanqPassports}
                    onChange={handleDocSelectChange}
                    placeholder="Փաստաթուղթ"
                    aria-label="Փաստաթուղթ"
                    label="Փաստաթուղթ"
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) =>
                      selected?.map((doc) => doc.Document_Number)?.join(", ")
                    }
                    style={{ minWidth: 200 }}
                  >
                    {allowedDocuments?.map((passport, index) => {
                      const {
                        Document_Number,
                        Document_Status,
                        Document_Type,
                        PassportData: {
                          Passport_Issuance_Date,
                          Passport_Validity_Date,
                          Passport_Validity_Date_FC,
                          Passport_Extension_Date,
                        } = {},
                      } = {
                        ...passport,
                      };
                      const optionText =
                        Document_Number +
                        " - " +
                        documentStatusesMap[Document_Status] +
                        " | " +
                        Passport_Issuance_Date +
                        " - " +
                        Passport_Validity_Date;
                      return (
                        <MenuItem
                          key={passport.Document_Number}
                          value={passport}
                        >
                          <Checkbox
                            checked={
                              !!texekanqPassports.find(
                                (doc) =>
                                  doc.Document_Number ===
                                  passport.Document_Number
                              )
                            }
                          />
                          <ListItemText primary={optionText} />
                        </MenuItem>
                      );
                    })}
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
                disabled={!mulNumber || !texekanqPassports.length}
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
