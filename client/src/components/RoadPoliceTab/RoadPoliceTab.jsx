import { Grid, Alert as MuiAlert, Stack } from "@mui/material";

import useFetchRoadpoliceData from "../../hooks/useFetchRoadpoliceData";
import ListScileton from "../listSceleton/ListScileton";
import LicenseCard from "../LicenseCard/LicenseCard";
import VehicleCard from "../VehicleCard/VehicleCard";

const RoadPoliceTab = ({ pnum }) => {
  const { data, isLoading, isError, error } = useFetchRoadpoliceData(pnum);
  console.log("RoadPoliceTab data", data);
  if (isLoading) {
    return <ListScileton />;
  }

  if (isError) {
    return <MuiAlert severity="error">{error.message}</MuiAlert>;
  }

  const { license, vehicles } = data;
  return (
    <Stack direction="column" gap={4}>
      <Grid container>{license && <LicenseCard license={license} />}</Grid>
      <Grid container spacing={2}>
        {vehicles?.map((vehicleInfo, index) => (
          <VehicleCard key={index} car={vehicleInfo} />
        ))}
      </Grid>
    </Stack>
  );
};

export default RoadPoliceTab;
