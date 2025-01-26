import { Grid, Typography } from "@mui/material";
import React from "react";
import "./CardContainer.css";

export function CardContainer({ children, className = "", legend, ...rest }) {
  return (
    <Grid
      {...rest}
      component="section"
      className={`card-container ${className}`}
    >
      <Typography className="card-container-legend" variant="h6">
        {legend}
      </Typography>
      {children}
    </Grid>
  );
}
