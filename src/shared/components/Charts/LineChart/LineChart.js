import React from "react";
import { Typography, Box, Grid, Paper } from "@mui/material";
import "./LineChart.css";
import { Line } from "react-chartjs-2";
import _ from "chart.js/auto";
import { externalTooltipHandler } from "./config";
import { useLineChartConfig } from "../../../hooks";

const datasetStyle = {
  borderWidth: 2,
  pointRadius: 3,
};
export const LineChart = ({
  title,
  subtitle,
  data,
  y = { unitOfMeasurement: "" },
}) => {
  const { options, datasets, labels } = useLineChartConfig(
    data,
    externalTooltipHandler,
    y,
    datasetStyle
  );

  return (
    <Grid position="relative" pl={{ xs: 1.5, sm: 6.5 }}>
      <span>
        <Paper className="line-chart-container" style={{ marginTop: 36 }}>
          <Box className="line-chart-title" ml={{ xs: -3, sm: 0 }}>
            <Typography fontSize="0.875rem" fontWeight="400" variant="p">
              {title}
            </Typography>
          </Box>

          <div className="line-chart-container">
            <Line
              height={320}
              options={options}
              data={{
                labels,
                datasets,
              }}
            />
          </div>
          <Typography variant="p" fontSize="0.875rem" textAlign="center">
            Month
          </Typography>
        </Paper>
        <Typography
          mt={2}
          display="block"
          variant="p"
          fontSize="0.875rem"
          textAlign="center"
        >
          {subtitle}
        </Typography>
      </span>
    </Grid>
  );
};
