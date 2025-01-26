import React from "react";
import { Typography, Box, Grid, Paper } from "@mui/material";
import "./Chart.css";
import { Line } from "react-chartjs-2";
import _ from "chart.js/auto";
import { externalTooltipHandler } from "./config";
import { useChartConfig } from "../../../hooks";

export const Chart = ({ title, data, y = {} }) => {
  const { options, datasets, labels } = useChartConfig(
    data,
    externalTooltipHandler,
    y
  );

  return (
    <Grid position="relative" pl={{ xs: 1.5, sm: 6.5 }}>
      <span>
        <Paper className="chart-container" style={{ marginTop: 36 }}>
          <Box className="chart-title" ml={{ xs: -3, sm: 0 }}>
            <Typography fontSize={15} fontWeight="500" variant="p">
              {title}
            </Typography>
          </Box>

          <div className="chart-container">
            <Line
              height={2000}
              options={options}
              data={{
                labels,
                datasets,
              }}
            />
          </div>
        </Paper>
      </span>
    </Grid>
  );
};
