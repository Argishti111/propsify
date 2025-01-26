import { Box } from "@mui/material";
import React from "react";
import { ProgressNavItem as NavItem } from "../../../../../../shared/components";

const items = ["Feedback", "Details", "Campaigns", "Review"];

export function Progress({ currentPage, onNavigate, onNext, nextDisabled }) {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      width="100%"
      zIndex={1}
      px="20%"
      pt={3}
      sx={{ background: "white" }}
      alignSelf="center"
    >
      <Box
        position="relative"
        display="flex"
        width="100%"
        flexDirection="row"
        justifyContent="space-around"
        pt={1.5}
      >
        {items.map((item, index) => (
          <NavItem
            key={item}
            isFirst={index === 0}
            name={item}
            checked={index >= currentPage}
            onClick={() => {
              if (index < currentPage) {
                onNavigate(index + 1);
              } else if (index === currentPage && !nextDisabled) {
                onNext();
              }
            }}
            isNext={index === currentPage && !nextDisabled}
            isPrevious={index < currentPage - 1}
          />
        ))}
      </Box>
    </Box>
  );
}
