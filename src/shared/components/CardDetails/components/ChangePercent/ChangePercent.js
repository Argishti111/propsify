import { Box, Typography } from "@mui/material";
import React from "react";

export function ChangePercent({ title, percent, measure, style }) {
  if (!percent) {
    return null;
  }
  return (
    <Box style={style} display="flex" className="w-100" alignItems="center">
      <Typography
        marginRight={1}
        fontStyle="italic"
        style={{ background: "transparent" }}
        className={percent >= 0 ? "card-percent-plus" : "card-percent-minus"}
        display="inline"
        variant="h5"
      >
        {percent > 0 ? "+" : ""}
        {percent}
        {measure}
      </Typography>
      <Typography
        whiteSpace="nowrap"
        fontWeight="500"
        color="#192231CC"
        fontStyle="italic"
        fontSize={15}
        variant="p"
      >
        {title}
      </Typography>
    </Box>
  );
}
