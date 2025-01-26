import { Box } from "@mui/material";
import React, { useCallback } from "react";
import {
  CustomButton,
  ProgressNavItem as NavItem,
} from "../../../../components";

const items = [
  "Settings",
  "Recipients",
  "Template",
  "Text",
  "Review & Schedule",
];

export function Progress({
  currentPage,
  onNext,
  goToPage,
  nextDisabled,
  nextText = "NEXT",
  hideNext = false,
}) {
  return (
    <Box
      position="absolute"
      pt={0.5}
      bottom={0}
      pb={2}
      display="flex"
      justifyContent="space-between"
      borderTop="1px solid #D8CFB4"
      width="100%"
      zIndex={1}
      sx={{ background: "white" }}
    >
      <Box
        position="relative"
        display="flex"
        width="100%"
        flexDirection="row"
        justifyContent="space-around"
        pt={5.5}
        px={{ lg: 12, md: 12, sm: 12, xs: 7 }}
      >
        {items.map((item, index) => (
          <NavItem
            key={item}
            isFirst={index === 0}
            onClick={() => {
              if (index < currentPage) {
                goToPage(index + 1);
              } else if (index == currentPage && !nextDisabled) {
                onNext();
              }
            }}
            name={item}
            isNext={index == currentPage}
            isNextAndDisabled={index == currentPage && !nextDisabled}
            checked={index >= currentPage}
            isPrevious={index < currentPage - 1}
            isCurrent={index + 1 === currentPage}
            isBeforeCurrent={index + 2 === currentPage}
          />
        ))}
      </Box>

      <CustomButton
        type="submit"
        disabled={nextDisabled}
        onClick={onNext}
        sx={{
          fontSize: 20,
          alignSelf: "flex-end",
          letterSpacing: 2,
          top: -5,
          visibility: hideNext ? "hidden" : "visible",
          height: 56,
        }}
      >
        {nextText}
      </CustomButton>
    </Box>
  );
}
