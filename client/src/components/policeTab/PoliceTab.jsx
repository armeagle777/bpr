import { Stack, Alert as MuiAlert } from "@mui/material";

import useFetchPolice from "../../hooks/useFetchPolice";
import ListScileton from "../listSceleton/ListScileton";
import PoliceNotFound from "./PoliceNotFound";

const PoliceTab = ({ pnum }) => {
  const { data, isLoading, isError, error } = useFetchPolice(pnum);

  if (isLoading) {
    return <ListScileton />;
  }

  if (isError) {
    return <MuiAlert severity="error">{error.message}</MuiAlert>;
  }
  const {
    companies,
    id_info,
    address,
    nationality_country_id,
    full_name,
    identification_no,
  } = { ...data };
  return (
    <Stack spacing={2} flexDirection="column" sx={{ py: 3, px: 1 }}>
      {data?.length === 0 ? (
        <PoliceNotFound />
      ) : (
        companies.map((company) => <p>Test</p>)
      )}
    </Stack>
  );
};

export default PoliceTab;
