import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import { Box } from "@mui/material";
import React, { useRef, useState } from "react";
import { useOutsideClick } from "../../../hooks";
import "./CustomSelect.css";

export function CustomSelect({ children, selectedItem, sx, ...rest }) {
  const [open, setOpen] = useState(false);
  const [width, setWidth] = useState(0);
  const ref = useRef(null);
  const toggle = (e) => {
    e.stopPropagation();
    setWidth(ref.current.getBoundingClientRect().width + 24);
    setOpen((prev) => !prev);
  };
  const close = () => {
    setOpen(false);
  };

  useOutsideClick(ref, close);

  return (
    <Box ref={ref} onClick={toggle} sx={sx} className="select" {...rest}>
      <button className="select-btn">
        <span className="selected-item-label">{selectedItem}</span>
        {open ? (
          <ArrowDropUp htmlColor="#beb082" fontSize="small" />
        ) : (
          <ArrowDropDown
            onClick={toggle}
            htmlColor="#beb082"
            fontSize="small"
          />
        )}
      </button>
      {open && (
        <div style={{ width }} className="select-options">
          {children}
        </div>
      )}
    </Box>
  );
}
