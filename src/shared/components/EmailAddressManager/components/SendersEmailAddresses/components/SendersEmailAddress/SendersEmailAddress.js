import { Box, Typography } from "@mui/material";
import React from "react";
import { NotVerifedEmailActions, VerifiedEmailActions } from "..";
import "./SendersEmailAddress.css";

export function SendersEmailAddress({ data, onDelete, onSendEmail }) {
  return (
    <li className="senders-email-address">
      <Box display="flex" justifyContent="space-between">
        <Typography variant="subtitle2">{data.emailAddress}</Typography>
        {data.isVerified ? (
          <VerifiedEmailActions data={data} onDelete={onDelete} />
        ) : (
          <NotVerifedEmailActions
            data={data}
            onDelete={onDelete}
            onSendEmail={onSendEmail}
          />
        )}
      </Box>
      <Box display="flex">
        {data.isVerified ? (
          <Typography variant="body2" color="#2AA45F">
            Verified
          </Typography>
        ) : (
          <Typography variant="body2" color="#E55656">
            Not verified
          </Typography>
        )}
        {/* <Typography variant="body2" color="#AFAFAF">
          &nbsp;on {data.datetime}
        </Typography> */}
      </Box>
    </li>
  );
}
