import { Box } from "@mui/material";
import React from "react";
import { OptionNavItem } from "../../../../components";

export const EDIT_PAGES = {
  EDIT: 1,
  PREVIEW: 2,
};

export function Navigation({ onSelect, selected }) {
  return (
    <Box mt={3} display="flex" borderBottom="1px solid #ECD9CC">
      <OptionNavItem
        id={EDIT_PAGES.EDIT}
        onSelect={onSelect}
        isSelected={selected === EDIT_PAGES.EDIT}
        title="EDIT TEXT"
        style={{
          borderRight: "1px solid #ECD9CC",
          paddingLeft: 24,
          paddingRight: 24,
        }}
      />
      <OptionNavItem
        id={EDIT_PAGES.PREVIEW}
        onSelect={onSelect}
        isSelected={selected === EDIT_PAGES.PREVIEW}
        title="PREVIEW"
        style={{
          paddingLeft: 24,
          paddingRight: 24,
        }}
      />
    </Box>
  );
}
