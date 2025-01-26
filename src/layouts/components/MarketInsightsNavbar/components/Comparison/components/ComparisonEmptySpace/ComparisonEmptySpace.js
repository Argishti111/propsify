import { Typography } from "@mui/material";
import React from "react";

export function ComparisonEmptySpace({ items = [] }) {
  return (
    <tr>
      <td style={{ width: "30%", height: 200 }}></td>
      {items.map((_, index) => (
        <td key={index}></td>
      ))}
    </tr>
  );
}
