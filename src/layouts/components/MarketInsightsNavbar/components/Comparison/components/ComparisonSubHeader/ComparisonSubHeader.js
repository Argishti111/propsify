import { Typography } from "@mui/material";
import React from "react";

export function ComparisonSubHeader({ title = "Overview", items }) {
  return (
    <tr>
      <td style={{ width: "30%", paddingTop: 30 }}>
        <Typography variant="h6" fontStyle="italic">
          {title}
        </Typography>
      </td>
      {items.map((_, index) => (
        <td key={index}></td>
      ))}
    </tr>
  );
}
