import { KeyboardArrowLeft } from "@mui/icons-material";
import React from "react";

export function NavigateBack({ onBack, page }) {
  if (page == 1) {
    return <div />;
  }
  return (
    <KeyboardArrowLeft sx={iconStyle} htmlColor="#BEB082" onClick={onBack} />
  );
}

const iconStyle = {
  ml: { lg: 10, md: 4, sm: 1, xs: 1 },
  cursor: "pointer",
  "&:hover": {
    color: "#192231",
  },
};
