import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { ReactComponent as LogoText } from "../../shared/static/icons/logo-text.svg";
import { ReactComponent as MaintenanceImage } from "../../shared/static/images/maintenance.svg";
import "./Maintenance.css";
import { CustomButton } from "../../shared/components";

export function Maintenance() {
  return (
    <main>
      <Box bgcolor="#192231">
        <LogoText className="maintenance-logo-text" />
      </Box>
      <Box
        minHeight={600}
        overflow="auto"
        height="calc(100vh - 80px)"
        className="flex-column-center"
        justifyContent="center"
      >
        <MaintenanceImage />
        <Typography fontFamily="MinervaModern-Regular" mt={7} variant="h4">
          We’re just tuning up a few things
        </Typography>
        <Typography
          fontStyle="italic"
          mt={2}
          variant="p"
          fontWeight="500"
          fontSize="1.25rem"
          maxWidth={651}
          textAlign="center"
        >
          We apologize for the inconvenience but Propsify is currently
          undergoing planned maintenance.
        </Typography>
        <CustomButton
          style={{ marginTop: 36, minWidth: 200 }}
          onClick={() => window.location.reload()}
        >
          REFRESH PAGE
        </CustomButton>
      </Box>
    </main>
  );
}
