import React from "react";
import { NavItem as MyNavItem } from "../../../../components/Sidebar/components";
import "./NavItem.css";

export function NavItem({ style, ...rest }) {
  return (
    <MyNavItem
      iconStyle={{ color: "#beb082" }}
      style={{ color: "#192231", ...style }}
      nameStyle={{ marginLeft: 4 }}
      className="nav-item-dark"
      {...rest}
    />
  );
}
