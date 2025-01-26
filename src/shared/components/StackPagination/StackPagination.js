import { Box, Typography } from "@mui/material";
import React from "react";
import { CustomButton, TinyButton } from "../";

export function StackPagination({
  page,
  pageCount,
  hideSteps,
  onBack,
  onNext,
  nextDisabled,
  nextText = "NEXT",
  backText = "BACK",
}) {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      bgcolor="white"
      zIndex={2}
      alignItems="center"
      style={{ borderTop: "1px solid #e0d9c3" }}
    >
      <Typography
        ml={1}
        fontSize="1.063rem"
        fontWeight="500"
        whiteSpace="nowrap"
        sx={{
          display: { md: "none", sm: "block", xs: "block" },
        }}
        fontStyle="italic"
      >
        {hideSteps ? null : `Step ${page} of ${pageCount}`}
      </Typography>
      {onBack ? (
        <>
          <TinyButton
            sx={{
              ...backButtonStyle,
              display: { md: "inline-flex", sm: "none", xs: "none" },
            }}
            onClick={() => onBack()}
            color="secondary"
          >
            {backText}
          </TinyButton>
        </>
      ) : (
        <div style={{ width: 72 }} />
      )}
      {hideSteps ? null : (
        <Typography
          sx={{
            display: { md: "block", sm: "none", xs: "none" },
          }}
          fontSize="1.063rem"
          fontWeight="500"
          whiteSpace="nowrap"
          fontStyle="italic"
        >
          Step {page} of {pageCount}
        </Typography>
      )}
      <Box display="flex">
        {onBack ? (
          <TinyButton
            sx={{
              ...backButtonStyle,
              display: { md: "none", sm: "inline-flex", xs: "inline-flex" },
            }}
            onClick={() => onBack()}
            color="secondary"
          >
            {backText}
          </TinyButton>
        ) : (
          ""
        )}
        <CustomButton
          type="submit"
          disabled={nextDisabled}
          onClick={onNext}
          sx={nextButtonStyle}
        >
          {nextText}
        </CustomButton>
      </Box>
    </Box>
  );
}

const nextButtonStyle = {
  alignSelf: "flex-end",
  paddingRight: 1,
  letterSpacing: "0.375rem",
  fontSize: "1.25rem",
  height: "3.438rem",
};

const backButtonStyle = {
  ml: 1,
  letterSpacing: "1.04px",
  fontSize: "0.813rem",
};
