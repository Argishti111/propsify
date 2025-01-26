import { Grid, Typography } from "@mui/material";
import React, { useMemo } from "react";
import { Modal } from "../../../../shared/components";
import { TrackItem, TrackItemDivider } from "./components";

const statuses = [
  { id: 2, name: "In production" },
  { id: 3, name: "Mailed" },
  { id: 4, name: "In transit" },
  { id: 5, name: "Processed for delivery" },
];

export function OrderTracking({ selectedItem, open, onClose }) {
  const filteredStatuses = useMemo(() => {
    if (!selectedItem.status) {
      return statuses;
    }
    if (selectedItem.status === "Received") {
      return statuses;
    }
    for (let status of statuses) {
      if (status.name === selectedItem.status) {
        break;
      }
      status.checked = true;
    }
    return statuses;
  }, [selectedItem]);

  return (
    <Modal open={open} onClose={onClose} title="Track order">
      <Grid overflow="auto" paddingX={5}>
        <Typography
          paddingTop={3}
          paddingBottom={2}
          textAlign="center"
          variant="h5"
          fontStyle="italic"
        >
          {selectedItem.name}
        </Typography>
        <Typography textAlign="center" width={368} variant="body1">
          Your letter will be "In transit" after receiving its first USPS scan
          event.
        </Typography>
        <Grid
          display="flex"
          flexDirection="column"
          alignItems="center"
          marginTop={1}
          marginBottom={2}
        >
          <TrackItem title="Received" checked />
          {filteredStatuses.map((status) => (
            <React.Fragment key={status.id}>
              <TrackItemDivider />
              <TrackItem checked={status.checked} title={status.name} />
            </React.Fragment>
          ))}
        </Grid>
      </Grid>
    </Modal>
  );
}
