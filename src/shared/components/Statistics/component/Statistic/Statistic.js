import { Grid, Typography, LinearProgress } from "@mui/material";
import React from "react";

export function Statistic({ label, value }) {
  return (
    <Grid
      container
      alignContent="center"
      justifyContent="center"
      className="statistic"
    >
      <Grid item xs={4}>
        <Typography fontSize={12} className="statistics-label">
          {label}
        </Typography>
      </Grid>
      <Grid alignSelf="center" item xs={5}>
        <LinearProgress
          color="info"
          variant="determinate"
          value={value}
          valueBuffer={100}
        />
      </Grid>
      <Grid item xs={2}>
        <Typography fontSize={12} variant="p" className="statistics-value">
          {value}
        </Typography>
      </Grid>
    </Grid>
  );
}
