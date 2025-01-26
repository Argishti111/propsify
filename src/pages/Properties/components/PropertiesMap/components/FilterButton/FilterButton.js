import { FilterList } from "@mui/icons-material";
import { Typography } from "@mui/material";
import React from "react";
import "./FilterButton.css";

export function FilterButton({ onClick }) {
  return (
    <Typography
      onClick={onClick}
      className="filter-button"
      display="inline-flex"
      alignItems="center"
      variant="p"
    >
      Filter
      <FilterList sx={{ ml: 2 }} fontSize="small" htmlColor="#ecd9cc" />
    </Typography>
  );
}
