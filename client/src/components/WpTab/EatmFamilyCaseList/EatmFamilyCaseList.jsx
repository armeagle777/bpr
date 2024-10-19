import { Stack } from "@mui/material";
import EatmFamilyClaimCard from "./EatmFamilyClaimCard";

const EatmFamilyCaseList = ({ data }) => {
  console.log("fam data", data);
  return (
    <Stack spacing={2} flexDirection="column" sx={{ py: 3, px: 1 }}>
      {data?.map((claim, index) => {
        return <EatmFamilyClaimCard key={index} claim={claim} />;
      })}
    </Stack>
  );
};

export default EatmFamilyCaseList;
