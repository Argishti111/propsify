import { Box } from "@mui/material";
import React from "react";
import { CustomButton } from "../../../../../../shared/components";

export function Navigation({
  onClose,
  showFirstAction = true,
  onFirstAction,
  secondActionDisabled,
  secondActionText = "CONTINUE",
  secondActionStyle,
  secondActionVariant,
  onSecondAction,
}) {
  return (
    <Box
      position="absolute"
      // bottom={0.5}
      width="99%"
      pt={1}
      px={2}
      display="flex"
      style={{ background: "white" }}
      justifyContent="space-between"
    >
      <CustomButton onClick={onClose} sx={buttonSx} variant="outlined">
        CLOSE
      </CustomButton>
      <Box display="flex" gap={3}>
        {showFirstAction && (
          <CustomButton
            onClick={onFirstAction}
            sx={buttonSx}
            variant="outlined"
          >
            PREVIOUS
          </CustomButton>
        )}
        <CustomButton
          onClick={onSecondAction}
          variant={secondActionVariant}
          sx={{ ...secondActionStyle, ...buttonSx2 }}
          disabled={secondActionDisabled}
        >
          {secondActionText}
        </CustomButton>
      </Box>
    </Box>
  );
}

const buttonSx = {
  letterSpacing: "0.08em",
  border: "1px solid #BEB082",
  borderRadius: "2px !important",
  height: 32,
};

const buttonSx2 = {
  height: 32,
  borderRadius: "2px !important",
  letterSpacing: "0.08em",
};
