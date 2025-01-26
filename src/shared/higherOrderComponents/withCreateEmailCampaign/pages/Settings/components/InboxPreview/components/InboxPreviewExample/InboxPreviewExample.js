import { LabelOutlined, StarOutline } from "@mui/icons-material";
import { Typography } from "@mui/material";
import React from "react";

export function InboxPreviewExample({ senderDisplayName, subject }) {
  return (
    <tr style={{ padding: "4px 8px" }}>
      <td style={{ width: 16, fontSize: 16 }}>
        <StarOutline sx={{ mt: 0.5 }} fontSize="inherit" htmlColor="#AFAFAF" />
      </td>
      <td style={{ width: 16, fontSize: 16 }}>
        <LabelOutlined
          sx={{ mt: 0.5 }}
          fontSize="inherit"
          htmlColor="#AFAFAF"
        />
      </td>
      <td style={{ paddingRight: 4 }}>
        <Typography
          style={{
            marginLeft: 4,
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
          fontWeight="400"
          color="#192231"
          fontSize="12px"
        >
          {senderDisplayName}
        </Typography>
      </td>
      <td>
        <Typography
          sx={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
          fontWeight="400"
          color="#192231"
          fontSize="12px"
        >
          {subject}
        </Typography>
      </td>
      <td>
        <Typography
          sx={{
            textOverflow: "ellipsis",
            overflowX: "hidden",
            width: 100,
          }}
          fontWeight="400"
          fontSize="9px"
          color="#AFAFAF"
        ></Typography>
      </td>
    </tr>
  );
}
