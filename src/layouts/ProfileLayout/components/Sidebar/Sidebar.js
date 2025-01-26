import { Business, Loyalty, People, Person } from "@mui/icons-material";
import { Box } from "@mui/material";
import React from "react";
import { CardContainer } from "../../../../shared/components";
import { NavItem } from "./components";
import "./Sidebar.css";

export function Sidebar() {
  return (
    <CardContainer
      height="calc(100vh - 126px)"
      xl={3}
      lg={3}
      md={3}
      sm={2}
      xs={2}
      item
      className="profile-sidebar-container"
      pr={{ lg: 2, md: 2, sm: 2, xs: 2 }}
    >
      <NavItem Icon={Person} to="/profile/details" name="Profile Settings" />
      <NavItem Icon={Business} to="/company" name="Company Profile" />
      <NavItem Icon={Loyalty} to="/subscription" name="Subscription Plan" />
      <Box ml={1} style={{ borderBottom: "1px solid #f5f3ec" }} />
      {/* <NavItem
        Icon={People}
        to="/user-management/users"
        name="User Management"
      /> */}
    </CardContainer>
  );
}
