import { Box, Typography } from "@mui/material";
import React from "react";
import { Info } from "../../../../../../../shared/components";

export function ComparisonItem({ item }) {
  return (
    <tr>
      <td style={{ width: "30%" }}>
        <Box display="flex" alignItems="flex-start">
          <Typography variant="body2" fontWeight="400">
            {item?.name}
          </Typography>
          <Info
            value={item?.description}
            defaultPosition="right"
            style={{ margin: "0 10px" }}
          />
        </Box>
      </td>
      {item?.values.map((value, index) => (
        <td key={index} align="center">
          <Typography variant="body2" fontWeight="400">
            {value}
          </Typography>
        </td>
      ))}
    </tr>
  );
}
