import { Stack, Alert as MuiAlert } from "@mui/material";

import ListScileton from "../listSceleton/ListScileton";
import NotFound from "./NotFound";
import useFetchArtsakh from "../../hooks/useFetchArtsakh";

const DisplacementsTab = ({ pnum }) => {
  const { data, isLoading, isError, error } = useFetchArtsakh(pnum);
  console.log("data::::::>>>>> ", data);

  if (isLoading) {
    return <ListScileton />;
  }

  if (isError) {
    return <MuiAlert severity="error">{error.message}</MuiAlert>;
  }

  return (
    <Stack spacing={2} flexDirection="column" sx={{ py: 3, px: 1 }}>
      {data?.length === 0 ? (
        <NotFound />
      ) : (
        <MuiAlert variant="outlined" severity="info">
          {data}
        </MuiAlert>
      )}
    </Stack>
  );
};

export default DisplacementsTab;
