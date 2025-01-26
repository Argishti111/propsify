import { KeyboardArrowDown } from "@mui/icons-material";
import { FormControl, InputLabel, Select } from "@mui/material";
import React from "react";

export function MuiSelect({
  id,
  required,
  label,
  children,
  fullWidth = true,
  formControlSx = {},
  menuMaxHeight = "auto",
  ...rest
}) {
  return (
    <FormControl sx={formControlSx} fullWidth={fullWidth}>
      <InputLabel
        required={required}
        shrink={true}
        sx={{ color: "#BEB082", background: "#fff" }}
        color="primary"
        id={id}
      >
        {label}
      </InputLabel>
      <Select
        required={required}
        SelectDisplayProps={{
          style: {
            paddingTop: 11.5,
            paddingBottom: 11.5,
          },
        }}
        fullWidth
        IconComponent={({ ...restProps }) => (
          <KeyboardArrowDown
            {...restProps}
            sx={{ color: "#BEB082 !important" }}
          />
        )}
        labelId={id}
        label={label}
        MenuProps={{
          sx: {
            maxHeight: menuMaxHeight,
            "& .MuiPopover-paper": { boxShadow: "0px 0px 4px gray" },
          },
        }}
        {...rest}
      >
        {children}
      </Select>
    </FormControl>
  );
}
