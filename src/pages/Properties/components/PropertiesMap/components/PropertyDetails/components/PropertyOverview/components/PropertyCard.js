import { Box, Typography } from "@mui/material";
import React from "react";

export function PropertyCard({ name, value, Icon, white }) {
  return (
    <Box
      mb={1}
      className={`list-item ${white ? "list-item-white" : ""}`}
      display="flex"
      width="100%"
      height={118}
      alignItems={{ md: "center", sm: "end", xs: "end" }}
      justifyContent="space-between"
      borderRadius={1}
      px={{ md: 2, sm: 1, xs: 1 }}
      py={{ md: 5, sm: 3, xs: 3 }}
      boxShadow="0px 8px 16px #0000001A;"
    >
      <Typography
        display="flex"
        alignItems="center"
        variant="subtitle2"
        // height={0}
        fontStyle="italic"
        alignSelf={{ md: "center", sm: "flex-end", xs: "flex-end" }}
        pr={3}
      >
        <Icon
          sx={{ mr: 2, display: { md: "block", sm: "none", xs: "none" } }}
          fontSize="small"
          htmlColor="#BEB082"
        />
        {name}
      </Typography>
      <Box
        display="flex"
        justifyContent="space-between"
        flexDirection="column"
        alignItems="end"
      >
        <Icon
          sx={{ mb: 1, display: { md: "none", sm: "block", xs: "block" } }}
          fontSize="small"
          htmlColor="#BEB082"
        />
        <Typography variant="h6" fontStyle="italic">
          {value}
        </Typography>
      </Box>
    </Box>
  );
}
