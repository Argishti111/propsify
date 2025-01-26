import { Box, Dialog, Typography } from "@mui/material";
import React, { useCallback } from "react";
import { TinyButton } from "../TinyButton";

export function Alert({ sx, title = "", message, onAction = () => {} }) {
  const handleClose = useCallback(() => {
    onAction(message);
  }, []);
  return (
    <Dialog sx={{ zIndex: 1301 }} open={!!message}>
      <Box
        sx={sx}
        display="flex"
        flexDirection="column"
        p={4}
        justifyContent="space-between"
        alignItems="center"
      >
        {!!title && (
          <Typography variant="h6" mb={3}>
            {title}
          </Typography>
        )}
        <Typography variant="subtitle2">{message}</Typography>
        <TinyButton
          color="info"
          sx={{ width: 80, mt: 2 }}
          onClick={handleClose}
        >
          OK
        </TinyButton>
      </Box>
    </Dialog>
  );
}
