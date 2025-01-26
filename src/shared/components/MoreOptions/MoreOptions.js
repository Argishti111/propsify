import { MoreHoriz } from "@mui/icons-material";
import { Popper } from "@mui/material";
import React, { useCallback, useRef, useState } from "react";
import "./MoreOptions.css";

export function MoreOptions({
  className = "",
  containerClassName = "",
  style,
  placement = "bottom-end",
  iconSX,
  children,
  MoreIcon = MoreHoriz,
  onContainerClick,
}) {
  const containerRef = useRef();
  const [open, setOpen] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setOpen(true);
  }, []);

  const handleMouseOut = useCallback((e) => {
    e.stopPropagation();
    setOpen(false);
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseOut}
      className={`more ${containerClassName}`}
      style={style}
      onClick={() => setOpen((prev) => !prev)}
    >
      <MoreIcon sx={iconSX} htmlColor="#beb082" />
      <Popper
        anchorEl={containerRef.current}
        open={open}
        style={{ zIndex: 400000 }}
        onClick={onContainerClick}
        popperOptions={{ placement }}
        className={`more-options ${className}`}
      >
        {children}
      </Popper>
    </div>
  );
}
