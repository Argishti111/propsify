import { Typography } from "@mui/material";
import React from "react";
import "./Radio.css";

export function Radio({ id, onChange, checked, label, ...rest }) {
  return (
    <label className="input-radio">
      <input
        id={id}
        checked={checked}
        onChange={onChange}
        type="radio"
        {...rest}
      />
      <span className="radio-checkmark"></span>
      <Typography pl={0.5} className="input-radio-label" variant="p">
        {label}
      </Typography>
    </label>
  );
}
