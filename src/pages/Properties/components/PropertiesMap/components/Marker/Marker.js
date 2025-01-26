import { Box, Typography } from "@mui/material";
import React, { useMemo } from "react";
import { numberWithCommas } from "../../../../../../shared/helpers";
import "./Marker.css";

export function Marker({ onClick, data, onGroupClick }) {
  const building_sq_ft = useMemo(
    () => numberWithCommas(data.building_sq_ft),
    [data]
  );
  if (data.clustered && data.count > 1) {
    return (
      <Typography
        onClick={() => onGroupClick(data)}
        p={1}
        variant="p"
        sx={{ background: "#585a60", borderRadius: "20%" }}
        color="white"
      >
        {data.count}
      </Typography>
    );
  }
  return (
    <Box
      onClick={onClick}
      className="map-marker-container"
      display="inline-flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box className="map-marker">
        <span className="map-marker-point" />
        <Typography ml={0.5} fontSize={12} fontStyle="italic" fontWeight="500">
          {data.estimated_display_value}
        </Typography>
      </Box>
      <Box className="map-marker-data-container" pt={0.5}>
        <Box className="map-marker-data">
          <Typography variant="body2">
            {data.estimated_display_value}
          </Typography>
          <Typography fontSize={12} variant="p">
            {data.bedrooms_count} bd, {data.bath_count} ba, {building_sq_ft} sq.
            ft
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
