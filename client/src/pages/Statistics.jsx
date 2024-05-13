import Grid from "@mui/material/Grid";
import { Outlet } from "react-router-dom";
import { StaticsHeader } from "../statisticsComponents";

const Statistics = () => {
  return (
    <Grid container spacing={2} style={{ padding: 20 }}>
      <StaticsHeader />
      <Grid item xs={12} md={12} lg={12}>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default Statistics;
