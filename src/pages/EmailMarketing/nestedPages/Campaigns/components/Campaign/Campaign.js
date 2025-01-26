import { Box, Switch } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import {
  getFormatedDateTime,
  toLocalDatetime,
} from "../../../../../../shared/helpers";
import "./Campaign.css";

import STATUS from "../../../../../../shared/static/emailCampaignStatuses.js";
import { EmailMarketingContext } from "../../../../EmailMarketing";

export function Campaign({ item, onStatusChange }) {
  const [paused, setPaused] = useState(item.status === STATUS.PAUSED);
  const { paused: allPaused } = useContext(EmailMarketingContext);
  useEffect(() => {
    setPaused(item.statusId === STATUS.PAUSED);
  }, [item.statusId]);

  const canceled = item.statusId === STATUS.CANCELED;
  const complete = item.statusId === STATUS.COMPLETED;
  const scheduled = item.statusId === STATUS.SCHEDULED;
  const pending = item.statusId === STATUS.PENDING;

  const statusChangeDisabled = scheduled || complete || canceled || pending;

  return (
    <tr id={`${item.id}primary`}>
      <td
        title={item.name}
        className="place-text"
        style={{ paddingLeft: 28, width: 160 }}
      >
        {item.name}
      </td>
      <td style={{ width: 158 }}>
        {getFormatedDateTime(toLocalDatetime(item.start))}
      </td>
      <td style={{ width: 90 }}>{item.status}</td>
      <td style={{ width: 60 }}>
        <Box display="flex">
          <Switch
            checked={!paused && !statusChangeDisabled}
            disabled={statusChangeDisabled || allPaused}
            size="small"
            onChange={(e) => {
              e.target.value = paused;
              onStatusChange(item);
            }}
          />
        </Box>
      </td>{" "}
      <td style={{ width: 124 }}>{item.recipients}</td>
      <td style={{ width: 94 }}>{item.opens}</td>
      <td style={{ width: 120 }}>{item.openRate}%</td>
      <td style={{ width: 80 }}>{item.clicks}</td>
      <td style={{ width: 80 }}>{item.ctr}%</td>
      <td style={{ width: 96 }}>{item.bounces}</td>
      <td style={{ width: 144 }}>{item.bounceRate}%</td>
      <td style={{ width: 96 }}>{item.complaints}</td>
      <td style={{ width: 144 }}>{item.complaintRate}%</td>
      <td style={{ width: 148 }}>{item.unsubscribes}</td>
      <td style={{ width: 156 }}>{item.unsubscribeRate}%</td>
      <td style={{ width: 86 }}>{item.sends}</td>
      <td style={{ width: 100 }}>{item.delivers}</td>
      <td style={{ width: 116 }}>{item.deliveryRate}%</td>
    </tr>
  );
}
