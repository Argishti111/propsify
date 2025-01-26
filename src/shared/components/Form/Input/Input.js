import { TextField, Typography } from "@mui/material";
import React from "react";
import "./Input.css";

export const inputWithoutBorderStyle = {
  "& .Mui-focused": {
    "& .MuiOutlinedInput-notchedOutline": {
      borderWidth: "1px",
    },
  },
};

export function Input({
  label,
  error,
  inputStyle = {},
  style,
  disabled,
  inputProps,
  size = "small",
  ...rest
}) {
  return (
    <>
      <TextField
        {...rest}
        error={!!error}
        disabled={disabled}
        label={label}
        style={style}
        size={size}
        InputLabelProps={{
          shrink: true,
          style: {
            color: disabled ? "#AFAFAF" : error ? "#E55656" : "#BEB082",
            fontSize: 17,
            fontStyle: "italic",
            background: "white",
          },
        }}
        inputProps={{
          ...inputProps,
          style: {
            padding: 11.5,
            ...inputStyle,
          },
        }}
        color="info"
      />
      <Typography
        mb={1}
        ml={!error ? 0 : 2}
        fontSize={12}
        alignSelf="flex-start"
        fontStyle="italic"
        whiteSpace="pre"
        color="#E55656"
      >
        {error}
      </Typography>
    </>
  );
}
