import { Box } from "@mui/material";
import React from "react";
import { SidebarWithProgress } from "../components";

export function AuthLayout({ children, ...rest }) {
  return (
    <Box onClick={() => {}} className="container">
      <SidebarWithProgress {...rest} />
      {children}
    </Box>
  );
}
