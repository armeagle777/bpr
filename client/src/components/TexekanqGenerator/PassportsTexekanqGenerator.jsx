import LoadingButton from "@mui/lab/LoadingButton";
import { useTexekanqData } from "../../hooks/useTexekanqData";
import { bprDocumentTypes } from "../../utils/constants";

const PassportsTexekanqGenerator = ({ data, fileName, user }) => {
  const { onCreateTexekanq, texekanqData, texekanqIsLoading } =
    useTexekanqData();

  const { pashton } = user;

  if (!pashton) {
    return null;
  }

  const { PNum, documents } = data;
  const validDocument = documents.find(
    (doc) => doc.Document_Status === "PRIMARY_VALID"
  );

  const documentsWithType = documents.map((doc) => ({
    ...doc,
    Document_Type: bprDocumentTypes[doc.Document_Type]
      ? bprDocumentTypes[doc.Document_Type].toUpperCase()
      : doc.Document_Type,
  }));
  const validDocuments = documentsWithType.filter(
    (doc) => doc.Document_Status === "PRIMARY_VALID"
  );
  const invalidDocuments = documentsWithType.filter(
    (doc) => doc.Document_Status === "INVALID"
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

  const handleCreateTexekanq = () => {
    onCreateTexekanq({
      pnum: PNum,
      person_birth: Birth_Date,
      person_birth_place: Birth_Region || Birth_Country.CountryName,
      person_fname: First_Name,
      person_lname: Last_Name,
      person_mname: Patronymic_Name,
      TexekanqtypeId: 3,
      mul_number: null,
      validDocuments,
      invalidDocuments,
    });
  };

  return (
    <>
      {!texekanqData && (
        <>
          <LoadingButton
            fullWidth
            color="primary"
            loading={texekanqIsLoading}
            variant="outlined"
            onClick={handleCreateTexekanq}
          >
            Անձնագրերի տեղեկանք
          </LoadingButton>
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
          Ներբեռնել անձնագրերի տեղեկանքը
        </a>
      )}
    </>
  );
};

export default PassportsTexekanqGenerator;
