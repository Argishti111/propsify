import React from "react";
import { Modal, ModalActions } from "../";
import { Box, Typography } from "@mui/material";

export function ChangeCampaignStatus({
  open,
  onClose,
  onChangeStatus,
  paused,
  pausingBody = "The campaign can be restarted at any time in the Digital Marketing dashboard",
  enablingBody = "The campaign can be paused at any time in the Digital Marketing dashboard",
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`${paused ? "Enable" : "Pause"} campaign`}
      titleChildren={<div />}
    >
      <Box
        px={{ md: 5, sm: 2, xs: 1 }}
        py={6}
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Typography
          textAlign="center"
          maxWidth={368}
          mb={3}
          fontStyle="italic"
          variant="h5"
        >
          Are you sure you'd like to {paused ? "enable" : "pause"} this
          campaign?
        </Typography>
        <Typography maxWidth={368} textAlign="center" variant="body1">
          {paused ? enablingBody : pausingBody}
          {/* {paused
            ? "Choosing “ENABLE” will publish the campaign so that it’s visible to potential clients."
            : "Choosing “PAUSE” will prevent potential clients from seeing this campaign."} */}
        </Typography>
      </Box>
      <ModalActions
        onFirstAction={onClose}
        onSecondAction={onChangeStatus}
        secondAction={paused ? "ENABLE" : "PAUSE"}
      />
    </Modal>
  );
}
