import { Typography } from "@mui/material";
import React, { useCallback, useEffect, useRef } from "react";

export function TimePickerItem({ id, isSelected, value, onSelect, tabIndex }) {
  const ref = useRef(null);
  const executeScroll = useCallback(
    () => ref.current.scrollIntoView({ block: "start" }),
    [ref]
  );

  useEffect(() => {
    if (isSelected) {
      executeScroll();
    }
  }, []);

  return (
    <Typography
      id={id}
      ref={ref}
      tabIndex={tabIndex}
      autoFocus={isSelected}
      textAlign="center"
      sx={{
        "&:hover": {
          background: isSelected ? "#ECD9CC" : "#ECD9CC4D",
        },
        cursor: "pointer",
        background: isSelected ? "#ECD9CC" : "white",
      }}
      width={45}
      py={0.75}
      variant="p"
      onClick={() => onSelect(value)}
    >
      {value}
    </Typography>
  );
}
