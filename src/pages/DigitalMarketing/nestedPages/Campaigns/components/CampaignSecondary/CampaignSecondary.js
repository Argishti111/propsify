import React from "react";

export function CampaignSecondary({ item }) {
  return (
    <tr id={`${item.id}secondary`} style={{ paddingLeft: 16 }}>
      <td>{item.impressions}</td>
      <td>{item.clicks}</td>
      <td>{item.ctr}</td>
      <td>{item.averageCpc}</td>
      <td>{item.cost}</td>
    </tr>
  );
}
