import { Typography } from "@mui/material";
import React from "react";
import { PopedRectangle } from "../../shared/components";

export function WaitlistJoinMessage() {
  return (
    <PopedRectangle
      display="flex"
      flexDirection="column"
      maxHeight={{ md: "none", sm: "none", xs: 560 }}
      justifyContent="center"
      alignItems="center"
      py={2}
      overflow="hidden"
    >
      <Typography
        variant="p"
        fontSize="2.125rem"
        fontFamily="MinervaModern-Regular"
      >
        WE’LL BE IN TOUCH SOON
      </Typography>
      <Typography mt={3} variant="p">
        Thanks for signing up to learn more about Propsify.
      </Typography>
    </PopedRectangle>
  );
}
