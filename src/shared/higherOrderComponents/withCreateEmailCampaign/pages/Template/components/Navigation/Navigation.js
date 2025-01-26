import { Box } from "@mui/material";
import React from "react";
import { OptionNavItem } from "../../../../components";

export const TEMPLATE_PAGES = {
  TEMPLATE_LIBRARY: 1,
  MY_TEMPLATES: 2,
};

export function Navigation({ containerProps, selected, onSelect }) {
  return (
    <Box
      {...containerProps}
      maxWidth={400}
      mb={3}
      display="flex"
      borderBottom="1px solid #ECD9CC"
    >
      <OptionNavItem
        id={TEMPLATE_PAGES.TEMPLATE_LIBRARY}
        onSelect={onSelect}
        isSelected={selected === TEMPLATE_PAGES.TEMPLATE_LIBRARY}
        title="TEMPLATE LIBRARY"
        style={{
          borderRight: "1px solid #ECD9CC",
          width: "50%",
        }}
      />
      <OptionNavItem
        id={TEMPLATE_PAGES.MY_TEMPLATES}
        onSelect={onSelect}
        isSelected={selected === TEMPLATE_PAGES.MY_TEMPLATES}
        style={{ width: "50%" }}
        title="MY TEMPLATES"
      />
    </Box>
  );
}
