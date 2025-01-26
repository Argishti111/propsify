import {
  FormControlLabel,
  Typography,
  Checkbox as MuiCheckbox,
} from "@mui/material";
import React from "react";

export function Checkbox({
  sx,
  label,
  value,
  labelProps,
  checked,
  onChange = () => {},
  defaultChecked,
}) {
  return (
    <FormControlLabel
      sx={sx}
      checked={checked}
      defaultChecked={defaultChecked}
      onChange={(e) => {
        e.target.value = checked ? "off" : "on";
        onChange(value);
      }}
      control={
        <MuiCheckbox
          sx={{
            color: "#beb082",
          }}
          color="primary"
        />
      }
      label={
        <Typography variant="body2" {...labelProps}>
          {label}
        </Typography>
      }
    />
  );
}
