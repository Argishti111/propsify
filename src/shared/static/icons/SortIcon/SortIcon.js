import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import React from "react";

export function SortIcon({ style }) {
  return (
    <span
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        // height: 0,
        width: 20,
        ...style,
      }}
    >
      <ArrowDropUp style={{ marginTop: -5 }} fontSize="small" color="primary" />
      <ArrowDropDown
        style={{ marginTop: -12, marginBottom: -4 }}
        fontSize="small"
        color="primary"
      />
    </span>
  );
}
