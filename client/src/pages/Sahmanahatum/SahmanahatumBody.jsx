import { Stack } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import BordercrossTable from "../../components/BordercrossTable/BordercrossTable";

const SahmanahatumBody = ({ data }) => {
  if (!data) return null;
  const { crossingList, residencePermitList } = data;
  return (
    <Stack direction="column" spacing={2}>
      {!!crossingList?.length && (
        <BordercrossTable title="Սահմանահատումներ" data={data.crossingList} />
      )}
      {JSON.stringify(residencePermitList)}
    </Stack>
  );
};

export default SahmanahatumBody;
