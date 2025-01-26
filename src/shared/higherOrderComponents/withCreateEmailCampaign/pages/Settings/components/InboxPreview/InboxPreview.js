import { Grid, Typography } from "@mui/material";
import React from "react";
import { Table } from "../../../../../../components";
import { InboxPreviewExample, InboxPreviewItem } from "./components";
import "./InboxPreview.css";

export function InboxPreview({ legend, senderDisplayName, subject }) {
  return (
    <Grid
      maxWidth={400}
      position="relative"
      zIndex={-1}
      height={265}
      mt={{ lg: 20, md: 20, sm: 24, xs: 6 }}
      className="inbox-preview-container"
    >
      <Typography className="inbox-preview-legend" variant="h6">
        {legend}
      </Typography>
      <Table>
        <tbody style={{ overflow: "hidden" }}>
          <InboxPreviewItem />
          <InboxPreviewExample
            senderDisplayName={senderDisplayName}
            subject={subject}
          />
          <InboxPreviewItem />
          <InboxPreviewItem />
          <InboxPreviewItem />
        </tbody>
      </Table>
    </Grid>
  );
}
