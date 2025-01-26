import { Box } from "@mui/material";
import React from "react";
import "./TemplateItemWrapper.css";

export function TemplateItemWrapper({ isSelected, value, onSelect, children }) {
  return (
    <Box
      borderRadius={0.25}
      onClick={() => onSelect(value)}
      style={isSelected ? styleOfSelected : style}
      height={260}
      display="flex"
      flexDirection="column"
      width={180}
      className="template-item-wrapper"
      overflow="hidden"
      sx={{ textOverflow: "ellipsis" }}
    >
      {children}
    </Box>
  );
}

const style = { border: "1px solid #BDBDBD", cursor: "pointer" };
const styleOfSelected = {
  border: "1px solid #BEB082",
  cursor: "pointer",
};
