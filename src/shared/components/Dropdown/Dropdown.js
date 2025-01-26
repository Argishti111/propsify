import { KeyboardArrowDown } from "@mui/icons-material";
import { Popper } from "@mui/material";
import React, { useCallback, useRef, useState } from "react";
import "./Dropdown.css";
import { useOutsideClick } from "../../hooks";
import { CustomButton } from "../CustomButton";

export function Dropdown({
  className = "",
  containerClassName = "",
  style,
  placement = "bottom-end",
  iconSX,
  buttonSX,
  children,
}) {
  const containerRef = useRef();
  const [open, setOpen] = useState(false);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  useOutsideClick(containerRef, handleClose);

  const toggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  return (
    <div
      ref={containerRef}
      style={style}
      className={`dropdown ${open ? "open" : ""} ${containerClassName}`}
    >
      <CustomButton style={{ width: 32 }} sx={buttonSX} onClick={toggle}>
        <KeyboardArrowDown sx={iconSX} />
      </CustomButton>
      <Popper
        anchorEl={containerRef.current}
        open={open}
        style={{ zIndex: 400000 }}
        onClick={toggle}
        popperOptions={{ placement }}
        className={`dropdown-options ${className}`}
      >
        {children}
      </Popper>
    </div>
  );
}
