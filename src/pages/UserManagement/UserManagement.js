import { Grid, Typography } from "@mui/material";
import React from "react";
import { Outlet } from "react-router";

export function UserManagement() {
  return (
    <>
      <Grid paddingX={2} borderBottom="1px solid #d8cfb4">
        <Typography
          fontWeight="500"
          fontFamily="MinervaModern-Bold"
          variant="p"
          fontSize={15}
          display="inline-block"
          paddingX={2}
          paddingY={2}
          position="relative"
          top={2}
          borderBottom="3px solid #beb082"
        >
          USERS
        </Typography>
        <Typography
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
          INVITED
        </Typography>
      </Grid>
      <Outlet />
    </>
  );
}
