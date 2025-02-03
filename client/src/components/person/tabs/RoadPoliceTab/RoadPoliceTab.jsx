import { Alert as MuiAlert } from "@mui/material";

import useFetchRoadpoliceData from "../../../../hooks/useFetchRoadpoliceData";
import ListScileton from "../../../../components/listSceleton/ListScileton";
import LicenseCard from "./LicenseCard/LicenseCard";

const RoadPoliceTab = ({ pnum }) => {
  const { data, isLoading, isError, error } = useFetchRoadpoliceData(pnum);
  console.log("RoadPoliceTab data", data);
  if (isLoading) {
    return <ListScileton />;
  }

  if (isError) {
    return <MuiAlert severity="error">{error.message}</MuiAlert>;
  }
  return <div>{data?.license && <LicenseCard />}</div>;
};

export default RoadPoliceTab;
