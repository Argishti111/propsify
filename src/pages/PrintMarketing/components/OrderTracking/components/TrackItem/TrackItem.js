import { Grid, Typography } from "@mui/material";
import React from "react";
import Checked from "../../../../../../shared/static/icons/icon-progress-checked-light.svg";
import Check from "../../../../../../shared/static/icons/icon-progress-check-light.svg";

export function TrackItem({ title, checked }) {
  return (
    <Grid display="flex" flexDirection="column" alignItems="center">
      {/* <Checked height={24} /> */}
      {checked ? (
        <img alt="" src={Checked} height={24} />
      ) : (
        <img alt="" src={Check} height={24} />
      )}
      <Typography
        textAlign="center"
        marginLeft={-0.5}
        marginTop={0.5}
        color="#BEB082"
        variant="body1"
      >
        {title}
      </Typography>
    </Grid>
  );
}
