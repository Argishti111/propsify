import * as React from "react";
import { TextField } from "@mui/material";
import {
  DatePicker as MuiDatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import {
  ArrowDownward,
  ArrowUpward,
  KeyboardArrowDown,
} from "@mui/icons-material";
import "./DatePicker.css";
import { renderPickerDay } from "../../../renderFunctions";

export function DatePicker({
  required,
  disabled,
  style,
  shrink = false,
  error,
  helperText,
  inputStyle,
  onOpen = () => {},
  onClose = () => {},
  ...rest
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MuiDatePicker
        disabled={disabled}
        onOpen={onOpen}
        onClose={onClose}
        closeOnSelect={true}
        showTodayButton
        PopperProps={{
          className: "date-picker-dialog",
          placement: "top-end",
        }}
        componentsProps={{
          rightArrowButton: {
            color: "primary",
          },
          leftArrowButton: {
            color: "primary",
          },

          actionBar: {
            actions: ["today"],
          },
        }}
        components={{
          LeftArrowIcon: ArrowUpward,
          RightArrowIcon: ArrowDownward,
          OpenPickerIcon: ({ ...rest }) =>
            disabled ? (
              <KeyboardArrowDown htmlColor="rgba(0,0,0,0.38)" {...rest} />
            ) : (
              <KeyboardArrowDown color="primary" {...rest} />
            ),
        }}
        PaperProps={{
          sx: {
            "& .MuiDialogActions-root button": {
              color: "#192231",
              mr: 1.5,
            },
            "& .MuiCalendarPicker-root > div:first-child": {
              pl: "36px",
              pr: "24px",
            },
            "& .MuiTypography-caption": {
              color: "black",
            },
          },
          style: {
            boxShadow: "rgb(136 136 136 / 40%) 0px 1px 6px",
          },
        }}
        renderDay={renderPickerDay}
        showDaysOutsideCurrentMonth
        InputProps={{ error, disabled, style: inputStyle }}
        renderInput={(props) => {
          props.inputProps.readOnly = true;
          return (
            <TextField
              required={required}
              disabled={disabled}
              style={style}
              sx={{
                "& input": {
                  cursor: "pointer",
                },
              }}
              size="small"
              helperText={error && helperText}
              InputLabelProps={{
                shrink,
                sx: {
                  color: disabled ? "#AFAFAF" : "#BEB082",
                  fontStyle: "italic",
                },
              }}
              InputProps={{
                disabled,
              }}
              color="info"
              {...props}
              onClick={onOpen}
            />
          );
        }}
        {...rest}
      />
    </LocalizationProvider>
  );
}
