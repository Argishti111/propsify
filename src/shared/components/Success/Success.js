import { Dialog, Typography, Box } from "@mui/material";
import React from "react";

export function Success({ title = "Success!", message, open, onClose, sx }) {
  return (
    <Dialog
      sx={{ zIndex: 1301 }}
      open={open}
      onClose={onClose}
      onBackdropClick={onClose}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        sx={sx}
        px={4}
        py={15}
      >
        <img
          style={{ height: 40, width: 40 }}
          alt=""
          src={
            require("../../static/icons/icon-progress-checked-light.svg")
              .default
          }
        />
        <Typography paddingTop={3} paddingBottom={2} variant="h5">
          {title}
        </Typography>
        <Typography
          textAlign="center"
          maxWidth={432}
          width="100%"
          variant="body1"
        >
          {message}
        </Typography>
      </Box>
    </Dialog>
  );
}
