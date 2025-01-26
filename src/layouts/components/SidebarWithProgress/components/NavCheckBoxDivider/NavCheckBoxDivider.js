import { Box } from "@mui/material";
import React from "react";
import "./NavCheckBoxDivider.css";

export function NavCheckBoxDivider() {
  return (
    <Box
      className="nav-checkBox-divider"
      sx={{
        borderLeft: { md: "1px solid #ecd9cc", sm: 0, xs: 0 },
        borderBottom: {
          md: 0,
          sm: "1px solid #ecd9cc",
          xs: "1px solid #ecd9cc",
        },
      }}
      px={{ md: 0, sm: 4, xs: 4 }}
      mx={{ md: 2, sm: 1, xs: 1 }}
      py={{ md: 4, sm: 0, xs: 0 }}
      my={{ md: 1, sm: 1.5, xs: 1.5 }}
      position={{ md: "static", sm: "absolute", xs: "absolute" }}
      width="calc(100% / 2.5)"
      ml={2}
    />
  );
}
