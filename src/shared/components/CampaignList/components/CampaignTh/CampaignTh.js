import React, { useContext } from "react";
import { SortingContext } from "../../CampaignList";

export function CampaignTh({ children, name, style }) {
  const { handleSort, orderType, orderColumn } = useContext(SortingContext);

  return (
    <th
      style={{ cursor: "pointer", ...style }}
      onClick={() => handleSort(name, orderType)}
    >
      {children}
    </th>
  );
}
