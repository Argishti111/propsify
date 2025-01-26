import React, { useCallback, useEffect, useState } from "react";
import { ReactComponent as BuyerInsights } from "../../../shared/static/icons/icon-buyer-insights.svg";
import { ReactComponent as AdsClick } from "../../../shared/static/icons/icon-ads-click.svg";
import { ReactComponent as SellerInsights } from "../../../shared/static/icons/icon-seller-insights.svg";
import { ReactComponent as Timeline } from "../../../shared/static/icons/icon-graph.svg";
import { ReactComponent as MapsHomeWorkOutlined } from "../../../shared/static/icons/icon-maps-home-work.svg";
import { ReactComponent as ForwardToInbox } from "../../../shared/static/icons/icon-forward-to-inbox.svg";
import { ReactComponent as LocalPrintshopOutlined } from "../../../shared/static/icons/print-black.svg";
import { ReactComponent as Logout } from "../../../shared/static/icons/icon-logout.svg";
import { ReactComponent as Home } from "../../../shared/static/icons/icon-home.svg";

import "./Sidebar.css";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router";
import { CollapsableNavItem, NavItem, NavUser } from "./components";
import { Box } from "@mui/material";
const sideVariants = {
  closed: {
    x: "-25vw",
    transition: { duration: 0.5, type: "tween", ease: "easeIn" },
  },
  open: {
    x: 0,
    transition: { duration: 0.5, type: "tween", ease: "easeIn" },
  },
};
export function Sidebar() {
  const location = useLocation();
  const [parent, setParent] = useState(() => location.pathname.split("/")[1]);
  const [closed, setClosed] = useState(true);
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const [anyCollapsed, setAnyCollapsed] = useState(false);

  const toggleParent = useCallback(
    (selected) => {
      setParent(parent === selected ? "" : selected);
      setAnyCollapsed((prev) => !prev);
    },
    [parent]
  );

  useEffect(() => {
    setParent(location.pathname.split("/")[1]);
  }, [location.pathname]);

  const toggleSidebar = useCallback((e) => {
    setClosed((prev) => !prev);
    e.stopPropagation();
  }, []);
  const closeSidebar = useCallback((e) => {
    setClosed(true);
    e.stopPropagation();
  }, []);
  return (
    <motion.div
      onClick={toggleSidebar}
      initial="closed"
      animate={open ? "open" : "closed"}
      variants={sideVariants}
      className={`sidebar sidebar-main ${closed ? "sidebar-closed" : ""} ${
        open ? "" : "sidebar-closing"
      }`}
    >
      <img
        alt=""
        onClick={(e) => {
          e.stopPropagation();
          navigate("/home");
        }}
        className="logo-text"
        src={require("../../../shared/static/icons/logo-text.svg").default}
      />
      <NavUser
        onClick={() => {
          setOpen(false);
        }}
      />
      <Box
        display="flex"
        flexDirection="column"
        className={
          anyCollapsed || closed
            ? "sidebar-section-2-collapsed"
            : "sidebar-section-2"
        }
        width="100%"
        height="100%"
      >
        <nav className="nav-item-container">
          <NavItem
            to="/home"
            Icon={Home}
            onClick={closeSidebar}
            toggleParent={toggleParent}
            iconStyle={{ height: "0.938rem", width: "0.938rem" }}
            name="Home"
          />
          <CollapsableNavItem
            Icon={Timeline}
            name="Market Insights"
            parent={parent}
            toggleParent={toggleParent}
            to="market-insights"
          >
            <NavItem
              onClick={closeSidebar}
              Icon={BuyerInsights}
              name="Buyer's Insights"
              to="/market-insights/buyers-insights"
            />
            <NavItem
              onClick={closeSidebar}
              Icon={SellerInsights}
              name="Seller's Insights"
              to="/market-insights/cities-zip-codes"
            />
            <NavItem
              onClick={closeSidebar}
              Icon={MapsHomeWorkOutlined}
              name="Property Insights"
              to="/market-insights/properties"
            />
          </CollapsableNavItem>

          {/* <CollapsableNavItem
          iconSrc={
            require("../../../shared/static/icons/icon-target.svg").default
          }
          name="Lead Generation"
          parent={parent}
          toggleParent={toggleParent}
          to="lead-generation"
        > */}
          <NavItem
            onClick={closeSidebar}
            Icon={AdsClick}
            name="Digital Marketing"
            to="/lead-generation/digital-marketing"
          />
          <NavItem
            onClick={closeSidebar}
            Icon={ForwardToInbox}
            name="Email Marketing"
            to="/lead-generation/email-marketing"
          />
          <NavItem
            onClick={closeSidebar}
            Icon={LocalPrintshopOutlined}
            name="Print Marketing"
            to="/lead-generation/print-marketing"
          />
          {/* </CollapsableNavItem> */}
        </nav>
        <NavItem
          style={{
            bottom: 0,
            paddingTop: 18,
            paddingBottom: 18,
          }}
          onClick={(e) => {
            e.preventDefault();
            localStorage.clear();
            setTimeout(() => {
              window.location.reload();
            }, 0);
          }}
          className="borders-top"
          Icon={Logout}
          name="Sign Out"
          to="/sign-in"
        />
      </Box>
    </motion.div>
  );
}
