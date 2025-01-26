import { Cancel, DescriptionOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import React from "react";

export function UploadedFile({ name, onDelete, ...rest }) {
  return (
    <Box
      {...rest}
      borderRadius={1}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      padding={3}
      paddingY={3.5}
      sx={{ background: "#FEFAF6" }}
    >
      <Box display="flex" alignItems="center">
        <DescriptionOutlined htmlColor="#BEB082" />
        <Typography fontWeight="100" marginLeft={3} variant="p">
          {name}
        </Typography>
      </Box>
      <IconButton onClick={onDelete}>
        <Cancel htmlColor="#BEB082" fontSize="small" />
      </IconButton>
    </Box>
  );
}
