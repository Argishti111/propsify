import {
  FormControlLabel,
  RadioGroup,
  Typography,
  Radio,
  FormControl,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useCallback, useState } from "react";
import { CustomButton, Modal } from "../../../../../shared/components";
import { SelectedItem } from "../../../../../shared/components/Form";
import "./Compare.css";
import {
  CityMultiSelect,
  SelectActions,
  ZipCodeMultiSelect,
} from "./components";

export const Compare = ({ open, setOpen, openComarison }) => {
  const [selectedType, setSelectedType] = useState("city");
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedZipCodes, setSelectedZipCodes] = useState([]);
  const [citySelectOpen, setCitySelectOpen] = useState(false);
  const [zipCodeSelectOpen, setZipCodeSelectOpen] = useState(false);

  // choose function by type
  const setSelected = {
    city: setSelectedCities,
    zip: setSelectedZipCodes,
  }[selectedType];

  // change the type of select
  const handleTypeChange = useCallback((e) => {
    setSelectedType(e.target.value);
  }, []);

  // remove city or zip code from the list
  const handleRemove = useCallback(
    (item) => {
      setSelected((prev) => prev.filter((s) => item.id !== s.id));
    },
    [setSelected]
  );

  // choose field name
  const name = { zip: "code", city: "name" }[selectedType];
  // selected values for displaying
  const selected = { zip: selectedZipCodes, city: selectedCities }[
    selectedType
  ];

  // close current view and open Comparison component
  const handleCompare = useCallback(() => {
    const selectedPlaces = {};
    selectedPlaces.zipCodes = selectedType === "zip" ? selectedZipCodes : [];
    selectedPlaces.cities = selectedType === "city" ? selectedCities : [];
    setOpen(false);
    openComarison({ open: true, selectedPlaces });
  }, [selected, selectedType]);

  // clear all selected values
  const clear = () => {
    setSelected([]);
  };

  // close multiselect
  const apply = () => {
    setCitySelectOpen(false);
    setZipCodeSelectOpen(false);
  };

  const threshold = selected.length < 2 || selected.length > 3;
  return (
    <Modal
      style={{ maxWidth: 496, left: 0, right: 0, margin: "auto" }}
      PaperProps={{
        sx: {
          margin: 1,
        },
      }}
      open={open}
      onClose={() => setOpen(false)}
      titleChildren={<div />}
      title="Compare"
    >
      <Typography
        maxWidth={368}
        textAlign="center"
        my={5}
        mx={7}
        variant="body1"
      >
        Choose up to three Cities or ZIP Codes to compare market trends
      </Typography>
      <form
        style={{
          paddingBottom: 20,
          borderBottom: "1px solid #ddd5be",
        }}
      >
        <RadioGroup
          onChange={handleTypeChange}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue={selectedType}
          name="radio-buttons-group"
        >
          <FormControlLabel
            style={{ paddingRight: 85 }}
            value="city"
            control={
              <Radio
                sx={{
                  color: "#beb082",
                }}
              />
            }
            label="Cities"
          />
          <FormControlLabel
            value="zip"
            control={
              <Radio
                sx={{
                  color: "#beb082",
                }}
              />
            }
            label="ZIP Codes"
          />
        </RadioGroup>

        <Box pt={2} display="flex" justifyContent="center">
          <FormControl
            style={{ alignSelf: "center" }}
            className="multiselect-container"
            sx={{ m: 1, width: "80%", position: "relative" }}
          >
            {selectedType === "city" ? (
              <CityMultiSelect
                threshold={3}
                open={citySelectOpen}
                setOpen={setCitySelectOpen}
                selected={selectedCities}
                setSelected={setSelectedCities}
              >
                <SelectActions apply={apply} clear={clear} />
              </CityMultiSelect>
            ) : selectedType === "zip" ? (
              <ZipCodeMultiSelect
                open={zipCodeSelectOpen}
                setOpen={setZipCodeSelectOpen}
                threshold={3}
                selected={selectedZipCodes}
                setSelected={setSelectedZipCodes}
              >
                <SelectActions apply={apply} clear={clear} />
              </ZipCodeMultiSelect>
            ) : null}
          </FormControl>
        </Box>
        <Box padding="0 48px" mb={3}>
          {selected.map((item) => {
            return (
              <SelectedItem
                key={item.id}
                containerStyle={{ marginRight: 8, marginBottom: 8 }}
                onClose={() => handleRemove(item)}
                text={item[name]}
              />
            );
          })}
        </Box>
      </form>
      <Box height={50}>
        <CustomButton
          size="large"
          onClick={() => setOpen(false)}
          style={{
            backgroundColor: "white",
            ...buttonStyle,
          }}
        >
          CANCEL
        </CustomButton>
        <CustomButton
          onClick={handleCompare}
          disabled={threshold}
          size="large"
          style={buttonStyle}
        >
          COMPARE
        </CustomButton>
      </Box>
    </Modal>
  );
};

const buttonStyle = {
  height: "100%",
  width: "50%",
  letterSpacing: "0.375rem",
  fontSize: "1.25rem",
};
