import { InfoOutlined } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";
import React from "react";
import "./ErrorBox.css";

export function ErrorBox({ title, message, ...rest }) {
  if (!message) {
    return null;
  }
  return (
    <Grid {...rest} display="flex" className="error-box">
      <Grid marginTop={0.15} marginRight={1.8}>
        <InfoOutlined
          style={{ height: 22, width: 22 }}
          fontSize="large"
          htmlColor="#E55656"
        />
      </Grid>
      <Grid display="flex" flexDirection="column" alignItems="flex-start">
        <Typography
          variant="body1"
          textAlign="start"
          display="block"
          fontWeight="500"
          fontStyle="italic"
          color="#E55656"
        >
          {title}
        </Typography>
        <Typography
          variant="p"
          fontStyle="italic"
          fontWeight="500"
          color="#E55656"
          alignSelf="left"
        >
          {message}
        </Typography>
      </Grid>
    </Grid>
  );
}
