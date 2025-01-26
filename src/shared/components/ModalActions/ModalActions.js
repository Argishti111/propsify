import { Box } from "@mui/material";
import React from "react";
import { CustomButton } from "../CustomButton";

export function ModalActions({
  firstAction = "CANCEL",
  secondAction = "NEXT",
  onFirstAction = () => {},
  onSecondAction = () => {},
  secondActionDisabled = false,
  firstActionDisabled = false,
  secondActionStyle,
  firstActionStyle,
}) {
  return (
    <Box borderTop="1px solid #dbd3ba" height={50}>
      <CustomButton
        size="large"
        disabled={firstActionDisabled}
        onClick={onFirstAction}
        style={firstActionStyle}
        sx={firstActionSx}
      >
        {firstAction}
      </CustomButton>
      <CustomButton
        onClick={onSecondAction}
        disabled={secondActionDisabled}
        size="large"
        style={secondActionStyle}
        sx={secondActionSx}
      >
        {secondAction}
      </CustomButton>
    </Box>
  );
}

const firstActionSx = {
  height: "100%",
  width: "50%",
  letterSpacing: "0.08em",
  backgroundColor: "white",
  fontSize: { md: 20, sm: 13, xs: 13 },
};

const secondActionSx = {
  height: "100%",
  width: "50%",
  letterSpacing: "0.08em",
  fontSize: { md: 20, sm: 13, xs: 13 },
};
