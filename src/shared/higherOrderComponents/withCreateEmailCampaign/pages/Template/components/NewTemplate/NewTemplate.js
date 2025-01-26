import { Add } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React from "react";
import { TemplateItemWrapper } from "../../wrappers";

const DEFAULT_VALUE = {
  id: 0,
  name: "New template",
  content: "Your text here",
};

export function NewTemplate({ selected, onSelect }) {
  const isSelected = selected?.id === DEFAULT_VALUE.id;
  return (
    <TemplateItemWrapper
      onSelect={onSelect}
      isSelected={isSelected}
      value={DEFAULT_VALUE}
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100%"
        sx={{ background: isSelected ? "#ECD9CC4D" : "transparent" }}
        pb={1}
      >
        <Add htmlColor="#ECD9CC" fontSize="large" />
        <Typography fontFamily="MinervaModern-Regular" variant="h5">
          BLANK
        </Typography>
      </Box>
    </TemplateItemWrapper>
  );
}
