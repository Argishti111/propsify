import { Box } from "@mui/material";
import React, { useCallback, useRef } from "react";
import { NavItem } from "./components";
import "./Navbar.css";
export const SectionContext = React.createContext();

export function Navbar({
  currentSection,
  items = [],
  width = "auto",
  ...rest
}) {
  const handleClick = useCallback((e) => {
    e.preventDefault();
    let id = e.target.href.split("#")[1];
    let section = document.getElementById(id);
    section.scrollIntoView();
  }, []);
  const mouse = useRef({
    x: 0,
    left: 0,
  });

  const handleMouseMove = useCallback((e) => {
    if (mouse.current) {
      const dx = e.clientX - mouse.current.x;
      e.currentTarget.scrollLeft = mouse.current.left - dx;
    }
  }, []);

  return (
    <SectionContext.Provider value={{ currentSection }}>
      <Box
        borderTop="1px solid #AFAFAF1A"
        onMouseDown={(e) => {
          mouse.current = {
            x: e.clientX,
            left: e.currentTarget.scrollLeft,
          };
        }}
        onMouseUp={() => {
          mouse.current = false;
        }}
        sx={{ scrollBehavior: "unset" }}
        onMouseMove={handleMouseMove}
        position="sticky"
        className="pd-nav"
        display="flex"
        mx={{ md: 2, sm: 0, xs: 0 }}
        width={width}
        {...rest}
      >
        {items.map((item) => (
          <NavItem key={item.id} onClick={handleClick} href={item.id}>
            {item.name}
          </NavItem>
        ))}
      </Box>
    </SectionContext.Provider>
  );
}
