import * as React from "react";
import { TextField } from "@mui/material";
import {
  ArrowDownward,
  ArrowUpward,
  KeyboardArrowDown,
} from "@mui/icons-material";
import {
  DateTimePicker as MuiDateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { renderPickerDay } from "../../../renderFunctions";

export function DateTimePicker({ required, disabled, style, error, ...rest }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MuiDateTimePicker
        disabled={disabled}
        renderDay={renderPickerDay}
        componentsProps={{
          rightArrowButton: {
            color: "primary",
          },
          leftArrowButton: {
            color: "primary",
          },
        }}
        showDaysOutsideCurrentMonth
        components={{
          LeftArrowIcon: ArrowUpward,
          RightArrowIcon: ArrowDownward,
          OpenPickerIcon: ({ ...rest }) => (
            <KeyboardArrowDown color="primary" {...rest} />
          ),
        }}
        PaperProps={{
          style: {
            boxShadow: "rgb(136 136 136 / 40%) 0px 1px 6px",
          },
        }}
        InputProps={{ error, disabled }}
        renderInput={(props) => (
          <TextField
            required={required}
            type="datetime-local"
            disabled={disabled}
            style={style}
            size="small"
            InputLabelProps={{
              shrink: true,
              readOnly: true,
              sx: {
                "&.MuiInputLabel-formControl": {
                  color: disabled ? "#AFAFAF" : "#BEB082",
                },
                "&.MuiInputLabel-formControl.Mui-error": {
                  color: "#d32f2f",
                },
              },
              style: {
                fontStyle: "italic",
              },
            }}
            InputProps={{
              readOnly: true,
              disabled,
              style: {},
            }}
            color="info"
            {...props}
          />
        )}
        {...rest}
      />
    </LocalizationProvider>
  );
}
