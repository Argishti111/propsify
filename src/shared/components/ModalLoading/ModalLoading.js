import { Box, Dialog } from "@mui/material";
import React from "react";
import { Loading } from "../Loading";
import "./ModalLoading.css";

export function ModalLoading({ centerOfContent, sx }) {
  return (
    <Dialog
      PaperProps={{
        style: {
          background: "transparent",
          ...(centerOfContent ? { marginLeft: "20%" } : {}),
        },
      }}
      BackdropProps={{ sx }}
      style={{ zIndex: 1301 }}
      sx={sx}
      open={true}
    >
      <Box height={150} width={200}>
        <Loading />
      </Box>
    </Dialog>
  );
}
