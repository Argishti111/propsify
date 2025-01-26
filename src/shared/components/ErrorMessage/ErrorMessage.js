import { HighlightOff } from "@mui/icons-material";
import { Dialog, Typography, Box } from "@mui/material";
import React from "react";

export function ErrorMessage({ title = "Error!", message, open, onClose, sx }) {
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
        paddingX={4}
        paddingY={15}
        fontSize="3rem"
      >
        <HighlightOff fontSize="inherit" htmlColor="#E55656" />
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
