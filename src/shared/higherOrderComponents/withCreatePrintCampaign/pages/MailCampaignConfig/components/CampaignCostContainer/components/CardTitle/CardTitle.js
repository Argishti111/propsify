import { Box, Typography } from "@mui/material";
import React from "react";
import { Info } from "../../../../../../../../components";

export const CardTitle = ({ title, info, infoPosition, mr = 0 }) => {
  return (
    <Box display="flex" justifyContent="space-between" mr={mr}>
      <Typography pr={{ md: 0, sm: 1, xs: 1 }} fontSize="0.938rem" variant="p">
        {title}
      </Typography>
      <Info defaultPosition={infoPosition} value={info} />
    </Box>
  );
};
