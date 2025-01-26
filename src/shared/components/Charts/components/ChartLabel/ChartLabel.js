import { Typography } from "@mui/material";
import React from "react";
import "./ChartLabel.css";

export function ChartLabel({ value, color }) {
  return (
    <Typography
      position="relative"
      data-color={color}
      className="chart-dataset-label"
      variant="p"
      fontSize="0.875rem"
      style={{ "--label-point-color": color }}
    >
      {value}
    </Typography>
  );
}
