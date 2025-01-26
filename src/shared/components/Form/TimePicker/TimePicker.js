import { Box, Popper } from "@mui/material";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { addZeroBefindSingleDigit } from "../../../helpers";
import { useOutsideClick } from "../../../hooks";
import { Input } from "../Input";
import { TimePickerItem } from "./components";

import "./TimePicker.css";

const hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const minutes = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
];
const periods = ["AM", "PM"];

export function TimePicker({ value, onChange, ...rest }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  useOutsideClick(anchorEl, () => setOpen(false));

  const [selectedHour, selectedMinute, selectedPeriod, periodHour] =
    useMemo(() => {
      let hour, minute;
      if (value) {
        [hour, minute] = value.split(":");
      } else {
        let now = new Date();
        hour = now.getHours();
        minute = now.getMinutes();
      }

      return [
        +hour,
        +minute,
        +hour > 11 ? "PM" : "AM",
        +hour > 12 ? +hour - 12 : +hour,
      ];
    }, [value]);

  const handlePeriodChange = useCallback(
    (period) => {
      if (period === "PM") {
        setPMPeriod();
      } else {
        setAMPeriod();
      }
    },
    [value]
  );

  const setPMPeriod = useCallback(() => {
    let hour, minute;
    if (!value) {
      let now = new Date();
      hour = now.getHours();
      minute = now.getMinutes();
    } else {
      [hour, minute] = value.split(":");
    }
    if (+hour < 12) {
      hour = +hour + 12;
      if (hour === 24) {
        hour = 0;
      }
    }

    onChange(
      `${addZeroBefindSingleDigit(+hour)}:${addZeroBefindSingleDigit(+minute)}`
    );
  }, [value]);

  const setAMPeriod = useCallback(() => {
    let hour, minute;
    if (!value) {
      let now = new Date();
      hour = now.getHours();
      minute = now.getMinutes();
    } else {
      [hour, minute] = value.split(":");
    }
    if (+hour > 12) {
      hour -= 12;
    }

    onChange(
      `${addZeroBefindSingleDigit(+hour)}:${addZeroBefindSingleDigit(+minute)}`
    );
  }, [value]);

  const handleHourChange = useCallback(
    (hour) => {
      if (selectedPeriod === "PM") {
        hour = +hour + 12;
        if (hour === 24) {
          hour = 12;
        }
      }
      onChange(
        `${addZeroBefindSingleDigit(+hour)}:${addZeroBefindSingleDigit(
          +selectedMinute
        )}`
      );
    },
    [selectedMinute, selectedPeriod]
  );

  const handleMinuteChange = useCallback(
    (minute) => {
      onChange(
        `${addZeroBefindSingleDigit(+selectedHour)}:${addZeroBefindSingleDigit(
          +minute
        )}`
      );
    },
    [selectedHour]
  );

  return (
    <span ref={anchorEl}>
      <Input
        value={value}
        type="time"
        sx={{ width: "100%" }}
        inputStyle={{
          padding: 8.5,
        }}
        onFocus={(e) => {
          setAnchorEl(e.currentTarget);
          setTimeout(() => {
            setOpen(true);
          }, 0);
        }}
        {...rest}
      />
      <Popper
        style={{
          zIndex: 10000,
        }}
        placement="bottom-start"
        anchorEl={anchorEl}
        open={open}
      >
        {open && (
          <Box
            display="flex"
            flexWrap="nowrap"
            width={182}
            justifyContent="center"
            height={240}
            sx={{ background: "white" }}
            boxShadow="1px 1px 4px 2px #00000044"
            p={2}
            ml={0.2}
            gap={1}
            overflow="hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Box
              className="scrollbar-hidden"
              overflow="auto"
              sx={{ scrollBehavior: "unset" }}
              display="flex"
              flexDirection="column"
              gap={1}
            >
              {hours.map((hour, index) => (
                <TimePickerItem
                  key={hour}
                  isSelected={periodHour === hour}
                  onSelect={handleHourChange}
                  tabIndex={100 + index}
                  value={addZeroBefindSingleDigit(hour)}
                />
              ))}
            </Box>
            <Box
              className="scrollbar-hidden"
              display="flex"
              overflow="auto"
              flexDirection="column"
              sx={{ scrollBehavior: "unset" }}
              gap={1}
            >
              {minutes.map((minute, index) => (
                <TimePickerItem
                  key={minute}
                  tabIndex={200 + index}
                  onSelect={handleMinuteChange}
                  isSelected={selectedMinute === minute}
                  value={addZeroBefindSingleDigit(minute)}
                />
              ))}
            </Box>
            <Box display="flex" flexDirection="column" gap={1}>
              {periods.map((period, index) => (
                <TimePickerItem
                  key={period}
                  onSelect={handlePeriodChange}
                  isSelected={selectedPeriod === period}
                  tabIndex={300 + index}
                  value={period}
                />
              ))}
            </Box>
          </Box>
        )}
      </Popper>
    </span>
  );
}
