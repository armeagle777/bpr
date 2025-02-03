import { Alert as MuiAlert } from "@mui/material";

import useFetchBordercrossData from "../../../../hooks/useFetchBordercrossData";
import ListScileton from "../../../../components/listSceleton/ListScileton";

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
  console.log("data", data);
  if (isLoading) {
    return <ListScileton />;
  }

  if (isError) {
    return <MuiAlert severity="error">{error.message}</MuiAlert>;
  }
  return <div>BordercrossTab</div>;
};

export default BordercrossTab;
