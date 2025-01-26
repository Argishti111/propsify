import { PrintOutlined } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import "./CampaignCardButton.css";

export function CampaignCardButton({
  title,
  Icon = () => {},
  onClick,
  ...rest
}) {
  return (
    <Grid
      {...rest}
      width={{ md: 200, sm: 186, xs: "100%" }}
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      className="card-button"
      paddingTop={4}
      paddingBottom={3}
      item
    >
      <div onClick={onClick} className="flex-column-center">
        <Box className="card-button-icon">
          <Icon fontSize="inherit" color="inherit" />
        </Box>
        <Typography
          textAlign="center"
          paddingX={2}
          fontSize={17}
          variant="p"
          fontStyle="italic"
          fontWeight="500"
        >
          {title}
        </Typography>
      </div>
    </Grid>
  );
}
