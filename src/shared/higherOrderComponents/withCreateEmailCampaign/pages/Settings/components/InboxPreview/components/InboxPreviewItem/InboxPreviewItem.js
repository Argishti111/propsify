import { LabelOutlined, StarOutline } from "@mui/icons-material";
import React from "react";
import "./InboxPreviewItem.css";

export function InboxPreviewItem() {
  return (
    <tr style={{ padding: "4px 8px" }} className="inbox-preview-item">
      <td style={{ width: 16, fontSize: 16 }}>
        <StarOutline sx={{ mt: 0.5 }} fontSize="inherit" htmlColor="#ECD9CC" />
      </td>
      <td style={{ width: 16, fontSize: 16 }}>
        <LabelOutlined
          sx={{ mt: 0.5 }}
          fontSize="inherit"
          htmlColor="#ECD9CC"
        />
      </td>
      <td>
        <div className="line" style={{ maxWidth: 64, marginLeft: 4 }}></div>
      </td>
      <td>
        <div className="line" style={{ maxWidth: 80 }}></div>
      </td>
      <td>
        <div className="line" style={{ maxWidth: 110 }}></div>
      </td>
    </tr>
  );
}
