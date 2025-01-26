import React from "react";

export function ComparisonDivider({ data = [] }) {
  return (
    <tr style={{ borderBottom: "1px solid #dfd8c1" }}>
      <td style={{ width: "30%" }}></td>
      {data.map((_, index) => (
        <td key={index}></td>
      ))}
    </tr>
  );
}
