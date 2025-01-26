import { Box } from "@mui/material";
import React from "react";
import { OptionNavItem } from "../../../../components";

export const SENDING_PAGES = {
  SEND_NOW: 1,
  SCHEDULE_LATER: 2,
};

export function Navigation({ selected, onSelect }) {
  return (
    <Box mb={3} display="flex" borderBottom="1px solid #ECD9CC">
      <OptionNavItem
        id={SENDING_PAGES.SEND_NOW}
        onSelect={onSelect}
        isSelected={selected === SENDING_PAGES.SEND_NOW}
        title="SEND NOW"
        style={{
          borderRight: "1px solid #ECD9CC",
          width: "50%",
        }}
      />
      <OptionNavItem
        id={SENDING_PAGES.SCHEDULE_LATER}
        onSelect={onSelect}
        isSelected={selected === SENDING_PAGES.SCHEDULE_LATER}
        style={{ width: "50%" }}
        title="SCHEDULE FOR LATER"
      />
    </Box>
  );
}
