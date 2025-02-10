import { Alert as MuiAlert } from "@mui/material";
import BordercrossTable from "../BordercrossTable/BordercrossTable";

import useFetchBordercrossData from "../../hooks/useFetchBordercrossData";
import ListScileton from "../listSceleton/ListScileton";

const BordercrossTab = ({ documents }) => {
  const armPassport = documents.find(
    (doc) =>
      doc.Document_Status === "PRIMARY_VALID" &&
      doc.Document_Type === "NON_BIOMETRIC_PASSPORT"
  );
  console.log("document>>>>>", armPassport);
  const { data, isLoading, isError, error } = useFetchBordercrossData({
    passportNumber: armPassport.Document_Number,
    citizenship:
      armPassport.Person?.Citizenship?.Citizenship[0]?.CountryShortName,
  });

  console.log("BordercrossTab data", data);
  if (isLoading) {
    return <ListScileton />;
  }

  if (isError) {
    return <MuiAlert severity="error">{error.message}</MuiAlert>;
  }
  const { crossingList, residencePermitList } = data;
  return (
    <div>
      {crossingList && (
        <BordercrossTable data={crossingList} title="Սահմանահատումներ" />
      )}
    </div>
  );
};

export default BordercrossTab;
