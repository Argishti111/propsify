import { TextField, Typography, InputAdornment } from "@mui/material";
import React from "react";
import { Info } from "../../Info";

export function InputWithInfo({
  label = "",
  error,
  inputStyle = {},
  infoDefaultPosition,
  info = "",
  style,
  disabled,
  ...rest
}) {
  return (
    <>
      <TextField
        {...rest}
        error={!!error}
        label={label}
        type={"text"}
        style={style}
        size="small"
        disabled={disabled}
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
          style: {
            padding: 11.5,
            ...inputStyle,
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Info value={info} defaultPosition={infoDefaultPosition} />
            </InputAdornment>
          ),
        }}
        color="info"
      />
      <Typography
        marginTop={1}
        marginLeft={2}
        fontSize={12}
        fontStyle="italic"
        color="#E55656"
        whiteSpace="pre"
      >
        {error}
      </Typography>
    </>
  );
}
