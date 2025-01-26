import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Collapse, Grid, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./CollapsableNavItem.css";

export function CollapsableNavItem({
  toggleParent,
  Icon,
  iconSrc,
  parent,
  name,
  to,
  children,
}) {
  return (
    <span
      className={`nav-collapse-container  borders-top-bottom w-100 transition-all`}
    >
      <Link
        onClick={(e) => {
          toggleParent(to);
          e.stopPropagation();
        }}
        className="nav-item"
        to="#"
      >
        <Grid display="flex" alignItems="center">
          {Icon ? (
            <Icon fontSize="small" className="nav-icon" />
          ) : (
            <img className="nav-icon" src={iconSrc} />
          )}
          <Typography fontWeight="normal" className="nav-item-name" variant="p">
            {name}
          </Typography>
        </Grid>
        {parent === to ? (
          <KeyboardArrowUp
            className="nav-collapse-arrow"
            fontSize="small"
            htmlColor="#ECD9CC"
          />
        ) : (
          <KeyboardArrowDown
            className="nav-collapse-arrow"
            fontSize="small"
            htmlColor="#ECD9CC"
          />
        )}
      </Link>
      <Collapse
        className="w-100 nav-collapse-items-container"
        translate="no"
        in={parent === to}
        // style={{ transformOrigin: '50 50 50' }}
        timeout={500}
      >
        {children}
      </Collapse>
    </span>
  );
}
