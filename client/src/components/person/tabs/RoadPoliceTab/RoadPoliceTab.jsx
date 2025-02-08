import { Alert as MuiAlert, Stack } from "@mui/material";

import useFetchRoadpoliceData from "../../../../hooks/useFetchRoadpoliceData";
import ListScileton from "../../../../components/listSceleton/ListScileton";
import LicenseCard from "./LicenseCard/LicenseCard";
import VehicleCard from "./VehicleCard/VehicleCard";

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
      {license && <LicenseCard license={license} />}
      {vehicles?.map((vehicleInfo, index) => (
        <VehicleCard key={index} car={vehicleInfo} />
      ))}
    </Stack>
  );
};

export default RoadPoliceTab;
