import { Box, Typography } from "@mui/material";
import React from "react";

export function RecipientListPreview({ recipients }) {
  return (
    <Box>
      <Typography
        mb={2}
        variant="subtitle2"
        fontFamily="MinervaModern-Regular"
        fontWeight="450"
      >
        CUSTOMER LIST PREVIEW
      </Typography>
      <table
        style={{ margin: 0, minWidth: "auto", width: "100%" }}
        cellSpacing="0"
        cellPadding="0"
        className="propsify-table"
      >
        <thead
        // style={{ position: "sticky", position: "-webkit-sticky", top: 0 }}
        >
          <tr>
            <th style={{ paddingLeft: 32 }}>First name</th>
            <th>Last name</th>
            <th style={{ width: 200, paddingRight: 16 }}>Email Address</th>
          </tr>
        </thead>
        <tbody className="tbody-2n">
          {recipients?.map((recipient) => (
            <tr key={recipient.email}>
              <td className="place-text" style={{ paddingLeft: 32 }}>
                {recipient.firstName}
              </td>
              <td className="place-text">{recipient.lastName}</td>
              <td
                style={{ width: 200, paddingRight: 16 }}
                className="place-text"
              >
                {recipient.email}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
}
