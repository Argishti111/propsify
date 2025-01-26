import { Grid, Typography } from "@mui/material";
import React from "react";
import Unchecked from "../../static/icons/icon-progress-unchecked.svg";
import Checked from "../../static/icons/icon-progress-checked-light.svg";
import Check from "../../static/icons/icon-progress-check-light.svg";

export function CheckItem({ checked, children, disabled, ...rest }) {
  return (
    <Grid display="flex" flexDirection="column" alignItems="center" {...rest}>
      {/* <Checked height={24} /> */}
      {disabled ? (
        <img alt="" src={Unchecked} height={24} />
      ) : checked ? (
        <img alt="" src={Checked} height={24} />
      ) : (
        <img alt="" src={Check} height={24} />
      )}
      <Typography
        textAlign="center"
        marginLeft={-0.5}
        marginTop={0.5}
        color="#BEB082"
        fontSize="0.938rem"
        variant="p"
      >
        {children}
      </Typography>
    </Grid>
  );
}
