import { Box, Grid, Typography } from "@mui/material";
import React from "react";

export function Filter({ title, sx, children, ...rest }) {
  return (
    <Grid
      width="100%"
      display="flex"
      sx={{
        flexDirection: { xs: "column", sm: "row", ...sx },
        alignItems: { xs: "flex-start" },
      }}
      {...rest}
    >
      <Grid item sm={4} sx={{ alignSelf: "flex-start", mb: { xs: 2 } }}>
        <Typography pr={2} variant="h6" fontStyle="italic">
          {title}
        </Typography>
      </Grid>
      <Grid item sm={8} xs={12}>
        {children}
      </Grid>
    </Grid>
  );
}
