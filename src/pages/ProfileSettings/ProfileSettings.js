import { Grid, Typography } from "@mui/material";
import React from "react";
import { Outlet } from "react-router";
import { CardContainer } from "../../shared/components";
import { PageTitle } from "../../shared/components/Titles";

export function ProfileSettings() {
  return (
    <>
      <Grid
        px={2}
        flexDirection="row"
        display="flex"
        sx={{ overflowX: "auto", overflowY: "hidden" }}
        width="100%"
        flexWrap="nowrap"
        borderBottom="1px solid #d8cfb4"
      >
        <PageTitle>PROFILE DETAILS</PageTitle>
        {/* <Typography
          fontWeight="500"
          fontFamily="MinervaModern-Bold"
          variant="p"
          fontSize={15}
          color="gray"
          display="inline-block"
          paddingX={2}
          paddingY={2}
          position="relative"
          top={3}
        >
          NOTIFICATIONS
        </Typography> */}
      </Grid>
      <Outlet />
    </>
  );
}
