import { Box, Typography } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import "./NavCheckBox.css";

export function NavCheckBox({ style, checked, to = "/", label }) {
  return (
    <Box width={200}>
      <NavLink
        onClick={(e) => {
          !checked && e.preventDefault();
        }}
        style={style}
        className={`w-100 d-flex nav-checkbox ${checked ? "checked" : ""}`}
        to={to}
      >
        <img
          className="icon-progress-check"
          alt=""
          src={
            require("../../../../../shared/static/icons/icon-progress-check.svg")
              .default
          }
        />
        <img
          className="icon-progress-outline"
          alt=""
          src={
            require("../../../../../shared/static/icons/icon-progress-outline.svg")
              .default
          }
        />
        <img
          className="icon-progress-checked"
          alt=""
          src={
            require("../../../../../shared/static/icons/icon-progress-checked.svg")
              .default
          }
        />
        <Typography
          className="nav-checkbox-label"
          marginLeft={2}
          display="inline"
          color="#ecd9cc4d"
          variant="body1"
        >
          {label}
        </Typography>
      </NavLink>
    </Box>
  );
}
