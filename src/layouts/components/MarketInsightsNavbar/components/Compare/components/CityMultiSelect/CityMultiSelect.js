import { Checkbox, ListItemText, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { connect } from "react-redux";
import { MultiSelect } from "../../../../../../../shared/components/Form";

const mapStateToProps = (state) => {
  return {
    cities: state.user.citiesSubscribed,
  };
};

export const CityMultiSelect = connect(mapStateToProps)(
  ({ cities, selected, setSelected, children, threshold, open, setOpen }) => {
    const [search, setSearch] = useState("");
    return (
      <MultiSelect
        label="Cities*"
        labelId="cities-label"
        id="cities-select"
        search={search}
        setSearch={setSearch}
        open={open}
        setOpen={setOpen}
        threshold={threshold}
        value={selected}
        setSelected={setSelected}
        renderValue={(selectedCities) =>
          selectedCities.reduce(
            (prev, city, index) =>
              `${prev}${city.name}${
                index === selectedCities.length - 1 ? "" : ", "
              }`,
            ""
          )
        }
      >
        {cities
          .filter((city) => {
            return city.name.toLowerCase().includes(search.toLowerCase());
          })
          .map((city) => (
            <MenuItem
              focusRipple={false}
              sx={{
                paddingLeft: 0,
              }}
              key={city.id}
              value={city}
            >
              <Checkbox
                sx={{
                  color: "#beb082",
                }}
                checked={selected.some((c) => c.id === city.id)}
              />
              <ListItemText primary={city.name} />
            </MenuItem>
          ))}
        {children}
      </MultiSelect>
    );
  }
);
