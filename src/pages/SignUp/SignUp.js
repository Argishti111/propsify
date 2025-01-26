import React from "react";
import { Outlet } from "react-router";
import { PopedRectangle, TariffPlan } from "../../shared/components";
import "./SignUp.css";

export function SignUp() {
  return (
    <PopedRectangle
      display="flex"
      flexDirection="column"
      alignItems="center"
      overflow="hidden"
      maxHeight={{ md: "none", sm: "none", xs: 800 }}
      justifyContent={{ md: "center", sm: "start", xs: "start" }}
      sx={{
        height: {
          md: "auto",
          sm: 800,
          xs: 800,
        },
      }}
    >
      <Outlet />
    </PopedRectangle>
  );
}
