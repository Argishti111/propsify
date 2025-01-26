import { Box, Typography } from "@mui/material";
import React, { useContext } from "react";
import { NavigationContext } from "../../CancelSubscription";

export function PlanDetails({ style }) {
  const { plan, planDescription } = useContext(NavigationContext);
  return (
    <Box
      style={style}
      className="card-container"
      display="flex"
      maxWidth={{ sm: 370, xs: 260 }}
      flexDirection="column"
      pl={3}
      pt={3}
      pb={1}
      pr={12}
    >
      <img
        style={{ maxWidth: 186 }}
        alt="logo"
        src={require("../../../../../../shared/static/images/logo.png")}
      />
      <Typography mt={1} variant="subtitle1">
        {plan}
      </Typography>
      <Typography variant="subtitle1">{planDescription}</Typography>
    </Box>
  );
}
