import { Typography } from "@mui/material";
import React, { useCallback, useContext } from "react";
import { SectionContext } from "../Navbar";

export function NavItem({ href, children, onClick }) {
  const { currentSection } = useContext(SectionContext);
  const preventDrag = useCallback((e) => e.preventDefault(), []);

  return (
    <a
      id={`item${href}`}
      onDragStart={preventDrag}
      onClick={onClick}
      className={`pd-nav-item ${currentSection === href ? "active" : ""}`}
      href={`#${href}`}
    >
      <Typography
        sx={{ pointerEvents: "none" }}
        display="inline"
        fontSize={15}
        fontFamily="MinervaModern-Bold"
      >
        {children}
      </Typography>
    </a>
  );
}
