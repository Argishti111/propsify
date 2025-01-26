import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { CardContainer } from "../../shared/components";
import { Navbar, Sidebar } from "./components";

export function ProfileLayout({ children }) {
  return (
    <Grid className="profile-container" sx={{ overflowX: "hidden" }}>
      <Navbar />
      <Grid
        sx={{
          px: {
            xl: 8,
            lg: 6,
            md: 4,
            sm: 2,
            xs: 1,
          },
        }}
        gap={2}
        paddingY={2}
        flexDirection="row"
        display="flex"
        flexWrap="no-wrap"
      >
        <Sidebar />

        <CardContainer
          display="flex"
          flexDirection="column"
          item
          mb={0}
          pb={0}
          xl={9}
          lg={9}
          md={9}
          sm={10}
          xs={10}
          sx={{ overflowY: "auto", overflowX: "hidden" }}
        >
          {children}
        </CardContainer>
      </Grid>
    </Grid>
  );
}
