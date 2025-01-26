import { Typography } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import "./NavItem.css";

export function NavItem({
  to = "#",
  disabled,
  className,
  children = "",
  ...rest
}) {
  return (
    <NavLink
      {...rest}
      to={to}
      className={`top-nav-item ${disabled ? "disabled" : ""} ${className}`}
    >
      <Typography
        letterSpacing={1.2}
        variant="p"
        fontSize={15}
        fontFamily="MinervaModern-Bold"
        whiteSpace="nowrap"
      >
        {children}
      </Typography>
    </NavLink>
  );
}
