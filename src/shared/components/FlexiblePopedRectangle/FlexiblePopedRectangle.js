import React from "react";
import { PopedRectangle } from "../PopedRectangle";

export function FlexiblePopedRectangle({ children, ...rest }) {
  return (
    <PopedRectangle
      display="flex"
      flexDirection="column"
      alignItems="center"
      p={2}
      maxHeight={{ md: "none", sm: "none", xs: 600 }}
      justifyContent={{ md: "center", sm: "start", xs: "center" }}
      {...rest}
    >
      {children}
    </PopedRectangle>
  );
}
