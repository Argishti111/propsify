import React from "react";
import { Typography, Box, Grid, Paper } from "@mui/material";
import "./DoughnutChart.css";
import { Doughnut } from "react-chartjs-2";
import _ from "chart.js/auto";
import { externalTooltipHandler } from "./config";
import { useDoughnutChartConfig } from "../../../hooks";
import { ChartLabel } from "../components";

export const DoughnutChart = ({
  title,
  subtitle,
  data,
  datasetLabels = [],
  y = { unitOfMeasurement: "" },
}) => {
  const { options, datasets, labels, colors } = useDoughnutChartConfig(
    data,
    externalTooltipHandler,
    y
  );
  if (!datasetLabels.length) {
    datasetLabels = labels;
  }
  return (
    <Grid
      display="flex"
      justifyContent="center"
      position="relative"
      pl={{ xs: 0, sm: 6.5 }}
    >
      <span>
        <Paper
          className="doughnut-chart-container"
          style={{ background: "transparent", marginTop: 36 }}
        >
          {!!title && (
            <Box
              className="doughnut-chart-title"
              ml={{ md: -16, xs: -8, sm: -8 }}
            >
              <Typography
                maxWidth={180}
                fontSize="0.875rem"
                fontWeight="400"
                variant="p"
              >
                {title}
              </Typography>
            </Box>
          )}

          <div className="doughnut-chart-container">
            <Doughnut
              options={options}
              width={300}
              height={300}
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
