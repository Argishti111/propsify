/// <reference types="react" />
import { InfoOutlined } from "@mui/icons-material";
import { Popper } from "@mui/material";
import React, { useCallback, useRef, useState } from "react";
import "./Info.css";

export function Info({
  style,
  defaultPosition = "bottom",
  value = "",
  children,
  fontSize = "small",
  containerClassName = "",
  sx = {},
  contentStyle,
  iconColor,
}) {
  const textRef = useRef();
  const containerRef = useRef();
  const [open, setOpen] = useState(false);

  const [position, setPosition] = useState(defaultPosition);

  const handleMouseEnter = useCallback((e) => {
    e.stopPropagation();
    if (textRef.current) {
      let targetRect = textRef.current.getBoundingClientRect();
      if (
        window.innerHeight - targetRect.y < targetRect.height &&
        targetRect.y - targetRect.height > 100
      ) {
        setPosition("top");
      } else {
        setPosition(defaultPosition);
      }
    }
    setOpen(true);
  }, []);

  const handleMouseOut = useCallback((e) => {
    setPosition(defaultPosition);
    setOpen(false);
  }, []);

  return (
    <div
      ref={containerRef}
      onClick={handleMouseEnter}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseOut}
      style={style}
      className={`tooltip ${containerClassName}`}
    >
      <InfoOutlined
        sx={sx}
        className="tooltip-icon-hovered"
        htmlColor={iconColor || "black"}
        fontSize={fontSize}
      />
      <InfoOutlined
        sx={sx}
        className="tooltip-icon"
        htmlColor={iconColor || "#beb082"}
        fontSize={fontSize}
      />

      {!!value && (
        <Popper
          popperOptions={{
            placement: !!placement[position]
              ? placement[position]
              : "bottom-end",
            strategy: "fixed",
          }}
          anchorEl={containerRef.current}
          style={{ zIndex: 40000000 }}
          disablePortal
          open={open}
        >
          <p
            onClick={(e) => e.stopPropagation()}
            ref={textRef}
            style={contentStyle}
            className={`tooltip-text tooltip-text-${position}`}
          >
            {value}
            {children}
          </p>
        </Popper>
      )}
    </div>
  );
}

const placement = {
  bottom: "bottom-end",
  right: "right-start",
  left: "bottom-start",
  bottomStart: "bottom-start",
};
