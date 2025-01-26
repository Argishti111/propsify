import {
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import React, { useMemo, useRef, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { placeCursorToEnd } from "../../../helpers";

export function PasswordInput({
  label = "Password",
  error,
  inputStyle = {},
  style,
  disabled,
  ...rest
}) {
  const ref = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
    placeCursorToEnd(ref);
  };

  return (
    <>
      <TextField
        {...rest}
        inputRef={ref}
        disabled={disabled}
        error={!!error?.length}
        label={label}
        type={showPassword ? "text" : "password"}
        style={style}
        size="small"
        InputLabelProps={{
          shrink: true,
          style: {
            color: disabled ? "#AFAFAF" : error?.length ? "#E55656" : "#BEB082",
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
              <IconButton
                size="small"
                disabled={disabled}
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? (
                  <VisibilityOff
                    fontSize="small"
                    htmlColor={disabled ? "#AFAFAF" : "#BEB082"}
                  />
                ) : (
                  <Visibility
                    fontSize="small"
                    htmlColor={disabled ? "#AFAFAF" : "#BEB082"}
                  />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
        color="info"
      />
      <Typography
        marginBottom={1}
        marginLeft={2}
        fontSize={12}
        // whiteSpace="pre"
        fontStyle="italic"
        color="#E55656"
      >
        <Error error={error} />
      </Typography>
    </>
  );
}

const Error = ({ error }) => {
  if (!!error && error.length) {
    return (
      <ul style={{ listStyleType: "none" }}>
        <li>
          password must contain:
          <ul>
            {error.map((e) => (
              <li>{e}</li>
            ))}
          </ul>
        </li>
      </ul>
    );
  }
  return <ul></ul>;
};
