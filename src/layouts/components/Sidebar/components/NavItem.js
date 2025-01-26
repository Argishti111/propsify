import { Grid, Typography } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

export function NavItem({
  Icon,
  style,
  iconSrc,
  to,
  onClick = () => {},
  iconStyle,
  name,
  nameStyle,
  className = "",
}) {
  return (
    <NavLink
      style={style}
      onClick={(e) => {
        e.stopPropagation();
        onClick(e);
      }}
      className={({ isActive }) =>
        isActive
          ? `nav-item-active nav-item ${className}`
          : `nav-item ${className}`
      }
      to={to}
    >
      <Grid display="flex" alignItems="center">
        {Icon ? (
          <Icon fontSize="small" sx={iconStyle} className="nav-icon" />
        ) : (
          <img className="nav-icon" style={iconStyle} alt="" src={iconSrc} />
        )}
        <Typography
          style={nameStyle}
          fontWeight="normal"
          className="nav-item-name"
          variant="p"
        >
          {name}
        </Typography>
      </Grid>
    </NavLink>
  );
}
