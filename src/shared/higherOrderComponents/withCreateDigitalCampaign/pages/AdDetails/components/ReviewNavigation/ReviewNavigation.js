import { Box, Typography } from "@mui/material";
import React from "react";

export function ReviewNavigation({ mobileReview, setMobileReview }) {
  return (
    <Box display="flex" justifyContent="center">
      <Typography
        className={`top-nav-item ${
          mobileReview ? "active" : ""
        } top-nav-item-border-right`}
        variant="p"
        fontFamily="MinervaModern-Bold"
        onClick={() => setMobileReview(true)}
      >
        MOBILE
      </Typography>
      <Typography
        className={`top-nav-item ${mobileReview ? "" : "active"}`}
        variant="p"
        fontFamily="MinervaModern-Bold"
        onClick={() => setMobileReview(false)}
      >
        DESKTOP
      </Typography>
    </Box>
  );
}
