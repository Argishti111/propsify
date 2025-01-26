import { Search } from "@mui/icons-material";
import {
  Box,
  IconButton,
  InputAdornment,
  List,
  MenuItem,
  Popper,
  Typography,
} from "@mui/material";
import React, { useCallback, useRef, useState } from "react";
import { getPropertyAddresses } from "../../../../services";
import { Input } from "../../../../shared/components/Form";
import { useOutsideClick } from "../../../../shared/hooks";
import "./SearchInput.css";

let timeout = 0;
export function SearchInput({
  sx,
  defaultValue = "",
  onSearch,
  containerStyle,
  inputStyle,
  disabled,
  ...rest
}) {
  const [places, setPlaces] = useState([]);
  const [value, setValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [selectedPlaceIndex, setSelectedPlaceIndex] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const menuRef = useRef();
  const inputRef = useRef();

  useOutsideClick(inputRef, () => setOpen(false));

  const handleChange = useCallback(
    (e) => {
      setValue(e.target.value);
      setSelectedPlaceIndex(-1);

      clearTimeout(timeout);

      if (e.target.value.length > 2) {
        timeout = setTimeout(() => {
          getPropertyAddresses(e.target.value)
            .then((data) => {
              if (e.target.value.length > 2) {
                setPlaces(data);
                setOpen(true);
                setTimeout(() => {
                  onFirstItemSelect();
                }, 0);
              } else {
                setPlaces([]);
                setOpen(false);
              }
            })
            .catch(() => {});
        }, 300);
      } else {
        setPlaces([]);
        setOpen(false);
      }
    },
    [value, timeout]
  );

  const handleSelect = useCallback((place) => {
    return () => {
      setValue(place.values);
      onSearch(place);
      setOpen(false);
    };
  }, []);
  const handlePlaceChange = useCallback(
    (e) => {
      e.stopPropagation();
      if (e.key === "ArrowUp") {
        setSelectedPlaceIndex((prev) => --prev);
        if (!selectedPlaceIndex) {
          document.querySelector("#place-input").focus();
        }
      }
      if (e.key === "ArrowDown") {
        setSelectedPlaceIndex((prev) => ++prev);
      }
      if (e.key === "Enter") {
        if (places.length) {
          handleSelect(places[selectedPlaceIndex]);
        }
      }
    },
    [selectedPlaceIndex, places]
  );

  const handleInputKeyDown = useCallback(
    (e) => {
      if (e.key === "ArrowDown") {
        handleArrowDown();
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        handleArrowUp();
      }
      if (e.key === "Enter") {
        if (places.length) {
          handleSelect(places[selectedPlaceIndex])();
        } else if (e.target.value) {
          handleSelect({ values: e.target.value, isFullAddress: false })();
        }
      }
    },
    [places, selectedPlaceIndex]
  );

  const handleArrowDown = useCallback(() => {
    setSelectedPlaceIndex((prev) => {
      if (prev === places.length - 1) return prev;
      return prev + 1;
    });
  }, [places]);

  const handleArrowUp = useCallback(() => {
    setSelectedPlaceIndex((prev) => {
      if (prev === 0) return prev;
      return prev - 1;
    });
  }, []);

  const onFirstItemSelect = useCallback(() => {
    setSelectedPlaceIndex(0);
  }, []);

  return (
    <Box
      component="span"
      sx={containerStyle}
      className="flex-column-center w-100"
      ref={inputRef}
    >
      <Input
        inputProps={{ autoComplete: "off" }}
        disabled={disabled}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={handleSelect(places[selectedPlaceIndex])}
                size="small"
                aria-label="toggle password visibility"
                edge="end"
              >
                <Search htmlColor={disabled ? "#AFAFAF" : "#BEB082"} />
              </IconButton>
            </InputAdornment>
          ),
        }}
        fullWidth
        sx={{
          maxWidth: 582,
          background: "#FFFFFF",
          "& .MuiOutlinedInput-root": {
            borderRadius: 0,
          },
          "& ::placeholder": {
            color: "#BEB082 !important",
            fontSize: 15,
          },
          ...sx,
        }}
        inputStyle={inputStyle}
        placeholder="Enter an address, city, or ZIP Code"
        onFocus={(e) => {
          setAnchorEl(e.currentTarget);
          setTimeout(() => {
            setOpen(true);
          }, 0);
        }}
        onKeyDown={handleInputKeyDown}
        id="place-input"
        value={value}
        onChange={handleChange}
        {...rest}
      />
      {!!anchorEl && (
        <Popper
          className="popper"
          style={{
            width: anchorEl.clientWidth + (window.innerWidth > 600 ? 53 : 49),
            zIndex: 10000,
          }}
          open={open && !disabled}
          anchorEl={anchorEl}
          placement="bottom-start"
        >
          {!!places.length && (
            <List ref={menuRef} onKeyDown={handlePlaceChange} sx={listStyle}>
              {places.map((place, index) => {
                return (
                  <MenuItem
                    id={`place${index}`}
                    sx={{
                      background: "white",
                    }}
                    className={
                      selectedPlaceIndex === index ? "Mui-focusVisible" : ""
                    }
                    key={place.values}
                    onClick={handleSelect(place)}
                  >
                    <Typography className="place-text">
                      {place.values}
                    </Typography>
                  </MenuItem>
                );
              })}
            </List>
          )}
        </Popper>
      )}
    </Box>
  );
}

const listStyle = {
  whiteSpace: "nowrap",
  overflowY: "auto",
  background: "#fff",
  boxShadow: "0px 0px 20px #d4d4d4",
  maxHeight: 300,
  display: "block",
};
