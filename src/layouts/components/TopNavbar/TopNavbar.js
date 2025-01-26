import {
  NotificationsOutlined,
  SearchTwoTone,
  SettingsOutlined,
} from "@mui/icons-material";
import { Divider, Typography, Box } from "@mui/material";
import React from "react";
import "./TopNavbar.css";

export function TopNavbar({
  containerStyle,
  title = "Market insights",
  children,
  actions,
  navbarStyle,
}) {
  return (
    <nav style={containerStyle}>
      <div style={navbarStyle} className="navbar navbar-top flex-row-between">
        <Typography fontWeight="400" variant="h5">
          {title}
        </Typography>
        <Box className="nav-actions">
          {/* <SearchTwoTone //TODO: removed
            className="navbar-item-icon"
            htmlColor="#beb082"
            fontSize="small"
          />
          <Divider orientation="vertical" flexItem />
          <Typography variant="p" className="navbar-item-icon navbar-item-text">
            Upgrade
          </Typography>

          <img
            className="navbar-item-icon"
            src={
              require("../../../shared/static/icons/icon-upgrade.svg").default
            }
          /> 
          <SettingsOutlined
            className="navbar-item-icon"
            htmlColor="#beb082"
            fontSize="small"
          /> */}
          {/* <NotificationsOutlined
            className="navbar-item-icon"
            htmlColor="#beb082"
            fontSize="small"
          />
          <NotificationsOutlined
            className="navbar-item-icon"
            htmlColor="#beb082"
            fontSize="medium"
          /> */}
          {actions}
        </Box>
      </div>
      {children}
    </nav>
  );
}
