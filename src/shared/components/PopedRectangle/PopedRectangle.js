import { Grid } from "@mui/material";
import React from "react";
import "./PopedRectangle.css";

export function PopedRectangle({ children, ...rest }) {
  return (
    <Grid className="poped-rectangle" {...rest}>
      {children}
    </Grid>
  );
}
