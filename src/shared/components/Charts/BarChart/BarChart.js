import React from "react";
import { Typography, Box, Grid, Paper } from "@mui/material";
import "./BarChart.css";
import { Bar } from "react-chartjs-2";
import _ from "chart.js/auto";
import { externalTooltipHandler } from "./config";
import { useBarChartConfig } from "../../../hooks";
import { ChartLabel } from "../components";

export const BarChart = ({
  title,
  subtitle,
  data,
  y = { unitOfMeasurement: "" },
  stacked,
  datasetLabels = [],
}) => {
  const { options, datasets, labels, colors } = useBarChartConfig(
    data,
    externalTooltipHandler,
    y,
    stacked,
    undefined,
    undefined,
    undefined,
    datasetLabels
  );

  return (
    <Grid position="relative" pl={{ xs: 1.5, sm: 6.5 }}>
      <span>
        <Paper className="bar-chart-container" style={{ marginTop: 36 }}>
          <Box className="bar-chart-title" ml={{ xs: -3, sm: 0 }}>
            <Typography
              maxWidth={180}
              fontSize="0.875rem"
              fontWeight="400"
              variant="p"
            >
              {title}
            </Typography>
          </Box>

          <div className="bar-chart-container">
            <Bar
              height={320}
              options={options}
              data={{
                labels,
                datasets,
              }}
            />
          </div>
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
        <Box
          display="flex"
          mt={2}
          justifyContent="center"
          flexWrap="wrap"
          gap={4}
        >
          {datasetLabels.map((label, index) => (
            <ChartLabel key={label} value={label} color={colors[index]} />
          ))}
        </Box>
      </span>
    </Grid>
  );
};
