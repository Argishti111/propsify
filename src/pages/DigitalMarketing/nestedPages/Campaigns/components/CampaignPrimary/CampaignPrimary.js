import { Box, Switch } from "@mui/material";
import React, { useEffect, useState } from "react";
import { MoreOptions } from "../../../../../../shared/components";

export function CampaignPrimary({
  item,
  onEdit,
  onDelete,
  onClone,
  onChangeStatus,
}) {
  const [paused, setPaused] = useState(item.status === "Paused");
  useEffect(() => {
    setPaused(item.status === "Paused");
  }, [item.status]);

  return (
    <tr
      id={`${item.id}primary`}
      style={{
        paddingLeft: 16,
        paddingRight: 5,
      }}
    >
      <td>Google Ads</td>
      <td style={{ paddingRight: 5 }}>{item.name}</td>
      <td style={{ marginLeft: 2 }}>{item.advertisingChannelType}</td>
      <td>{item.status}</td>
      <td style={{ width: 80 }}>
        <Box display="flex">
          <Switch
            checked={item.status !== "Removed" && !paused}
            disabled={item.status === "Removed"}
            size="small"
            onChange={(e) => {
              e.target.value = paused;
              onChangeStatus(item);
            }}
          />
          <MoreOptions style={{ paddingRight: 8, paddingLeft: 8 }}>
            <span
              onClick={(e) => {
                onClone(item);
              }}
            >
              Clone
            </span>
            <span
              onClick={(e) => {
                onEdit(item);
              }}
            >
              Edit
            </span>
            <span
              onClick={(e) => {
                onDelete(item);
              }}
            >
              Delete
            </span>
          </MoreOptions>
        </Box>
      </td>
    </tr>
  );
}
