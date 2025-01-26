import { CheckCircle } from "@mui/icons-material";
import { Box, List, Menu, MenuItem, Popper, Typography } from "@mui/material";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeDigitalCampaignField } from "../../../../../redux";
import {
  getGeoLocationsByName,
  updateLocations,
} from "../../../../../services";
import { StackPagination } from "../../../../components";
import { Input, SelectedItem } from "../../../../components/Form";
import { SelectedPlace } from "./components";
import DigitalMarketingEventRecorder from "../../../../analytics/google/DigitalMarketingEventRecoder";
import { useEffect } from "react";

let timeout = 0;

export function Places({ goNext, goBack, page, pageCount }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [places, setPlaces] = useState([]);
  const [updating, setUpdating] = useState(false);
  const [selectedPlaceIndex, setSelectedPlaceIndex] = useState(-1);
  const menuRef = useRef();

  useEffect(DigitalMarketingEventRecorder.adPlaces, []);

  const { id, selectedPlaces } = useSelector(
    (state) => state.digitalMarketing.campaign
  );
  const dispatch = useDispatch();

  const setSelectedPlaces = (callback) => {
    dispatch(
      changeDigitalCampaignField("selectedPlaces", callback(selectedPlaces))
    );
  };

  const handleRemove = useCallback(
    (place) => {
      setSelectedPlaces((selectedPlaces) =>
        selectedPlaces.filter((p) => p.resourceName !== place.resourceName)
      );
    },
    [selectedPlaces]
  );

  const handleChange = useCallback(
    (e) => {
      setSelectedPlaceIndex(-1);
      clearTimeout(timeout);
      setValue(e.target.value);
      if (e.target.value.length > 2) {
        timeout = setTimeout(() => {
          getGeoLocationsByName(e.target.value)
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

  const handleUpdateLocations = useCallback(() => {
    setUpdating(true);
    updateLocations(id, selectedPlaces)
      .then((data) => {
        if (data.success) {
          goNext();
        }
      })
      .finally(() => setUpdating(false));
  }, [selectedPlaces, id]);

  const handleSelect = useCallback(
    (place) => {
      return () => {
        setSelectedPlaces((prev) => {
          if (prev.some((p) => p.resourceName === place.resourceName)) {
            return prev;
          }
          return [...prev, place];
        });
      };
    },
    [selectedPlaces]
  );

  const filteredPlaces = useMemo(() => {
    return places.filter(
      (place) =>
        !selectedPlaces.some((p) => p.resourceName === place.resourceName)
    );
  }, [places, selectedPlaces]);

  const handlePlaceChange = useCallback(
    (e) => {
      if (e.key === "ArrowUp") {
        setSelectedPlaceIndex((prev) => prev - 1);
        if (!selectedPlaceIndex) {
          document.querySelector("#place-input").focus();
        }
      }
      if (e.key === "ArrowDown") {
        setSelectedPlaceIndex((prev) => prev + 1);
      }
      if (e.key === "Enter") {
        if (filteredPlaces.length) {
          handleSelect(filteredPlaces[selectedPlaceIndex]);
        }
      }
    },
    [selectedPlaceIndex, filteredPlaces]
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
        if (filteredPlaces.length) {
          handleSelect(filteredPlaces[selectedPlaceIndex])();
        }
      }
    },
    [filteredPlaces, selectedPlaceIndex]
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
    setTimeout(() => {
      menuRef.current?.scroll(0, 0);
    }, 0);
  }, [menuRef.current]);
  return (
    <>
      <Box
        onClick={(e) => {
          e.stopPropagation();
          setOpen(false);
        }}
        display="flex"
        px={{ md: 11, sm: 1, xs: 1 }}
        flexDirection="column"
        justifyContent="center"
        overflow="auto"
        style={{
          overflowX: "hidden",
          minWidth: 300,
          maxWidth: 800,
          height: "100%",
          marginBottom: 6,
        }}
      >
        <Typography width={800} />
        <Typography
          textAlign="center"
          variant="h4"
          fontFamily="MinervaModern-Regular"
        >
          UP NEXT, SHOW YOUR AD IN THE <br /> RIGHT PLACES
        </Typography>
        <Typography textAlign="center" mt={3} mb={5.2} variant="body1">
          Your ad shows to people in the locations you set up, and to people
          interested in these locations.
        </Typography>
        <Typography textAlign="center" variant="body1" mb={0.5}>
          Advertise in specific ZIP Codes, cities
        </Typography>
        <Box
          mb={4.8}
          display="flex"
          flexWrap="wrap"
          gap={1}
          justifyContent="center"
        >
          {selectedPlaces.map((place) => {
            return (
              <SelectedItem
                key={place.resourceName}
                onClose={() => handleRemove(place)}
                text={place.displayName}
              />
            );
          })}
        </Box>

        <Input
          inputProps={{ autoComplete: "off" }}
          onClick={(e) => e.stopPropagation()}
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
          autoFocus
          label="Add a ZIP Code or a city"
        />
      </Box>
      {!!anchorEl && (
        <Popper
          className="popper"
          style={{ width: anchorEl.clientWidth, zIndex: 1300 }}
          open={open}
          anchorEl={anchorEl}
          placement="bottom-start"
        >
          {!!filteredPlaces.length && (
            <List ref={menuRef} onKeyDown={handlePlaceChange} sx={listStyle}>
              {filteredPlaces.map((place, index) => {
                return (
                  <MenuItem
                    id={place}
                    sx={{
                      background: "white",
                    }}
                    className={
                      selectedPlaceIndex === index ? "Mui-focusVisible" : ""
                    }
                    key={place.resourceName}
                    onClick={handleSelect(place)}
                  >
                    <Typography>{place.displayName}</Typography>
                  </MenuItem>
                );
              })}
            </List>
          )}
        </Popper>
      )}
      <StackPagination
        onBack={goBack}
        onNext={handleUpdateLocations}
        page={page}
        pageCount={pageCount}
        nextDisabled={selectedPlaces.length === 0 || updating}
      />
    </>
  );
}
const listStyle = {
  whiteSpace: "nowrap",
  overflowY: "auto",
  background: "#fff",
  boxShadow: "0px 0px 20px #d4d4d4",
  maxHeight: 600,
  display: "block",
};
