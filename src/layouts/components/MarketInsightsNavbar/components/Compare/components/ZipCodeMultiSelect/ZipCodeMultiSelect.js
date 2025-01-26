import { Checkbox, ListItemText, MenuItem, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { MultiSelect } from "../../../../../../../shared/components/Form";

const mapStateToProps = (state) => {
  return {
    cities: state.user.citiesSubscribed,
  };
};

export const ZipCodeMultiSelect = connect(mapStateToProps)(
  ({ cities, children, selected, setSelected, threshold, setOpen, open }) => {
    const [search, setSearch] = useState("");

    useEffect(() => {
      cities.forEach((city) =>
        city.zipCodes.forEach((zipCode) => {
          zipCode.city = city;
        })
      );
    }, []);

    const filterByCity = useMemo(
      () =>
        cities.some((city) =>
          city.name.toLowerCase().includes(search.toLocaleLowerCase())
        ),
      [search, cities]
    );

    return (
      <>
        <MultiSelect
          label="ZIP Codes*"
          labelId="zip-code-label"
          id="zip-code-select"
          value={selected}
          setOpen={setOpen}
          open={open}
          setSearch={setSearch}
          search={search}
          threshold={threshold}
          setSelected={setSelected}
          renderValue={(selectedZipCodes) =>
            selectedZipCodes.reduce(
              (prev, zipCode, index) =>
                `${prev}${zipCode.code}${
                  index === selectedZipCodes.length - 1 ? "" : ", "
                } `,
              ""
            )
          }
        >
          {filterByCity
            ? cities
                .filter((city) =>
                  city.name.toLowerCase().includes(search.toLocaleLowerCase())
                )
                .map((city) => {
                  return [
                    <ListItemText sx={{ paddingLeft: "12px" }} key={city.id}>
                      <Typography fontSize={17} variant="p">
                        {city.name}
                      </Typography>
                    </ListItemText>,
                    city.zipCodes.map((zipCode) => {
                      zipCode.city = city;
                      return (
                        <MenuItem
                          key={zipCode.id}
                          sx={{
                            paddingLeft: 0,
                          }}
                          value={zipCode}
                        >
                          <Checkbox
                            sx={{
                              color: "#beb082",
                            }}
                            checked={selected.some(
                              (zc) => zc.id === zipCode.id
                            )}
                          />
                          <ListItemText primary={zipCode.code} />
                        </MenuItem>
                      );
                    }),
                  ];
                })
            : cities.map((city) => {
                if (
                  city.zipCodes.some((zipCode) =>
                    zipCode.code.toLowerCase().includes(search.toLowerCase())
                  )
                ) {
                  return [
                    <ListItemText sx={{ paddingLeft: "12px" }} key={city.id}>
                      <Typography fontSize={17} variant="p">
                        {city.name}
                      </Typography>
                    </ListItemText>,
                    city.zipCodes.map((zipCode) => {
                      if (
                        zipCode.code
                          .toLowerCase()
                          .includes(search.toLowerCase())
                      ) {
                        zipCode.city = {
                          id: city.id,
                          name: city.name,
                          index: city.index,
                        };
                        return (
                          <MenuItem
                            key={zipCode.id}
                            sx={{
                              paddingLeft: 0,
                            }}
                            value={zipCode}
                          >
                            <Checkbox
                              sx={{
                                color: "#beb082",
                              }}
                              checked={selected.some(
                                (zc) => zc.id === zipCode.id
                              )}
                            />
                            <ListItemText primary={zipCode.code} />
                          </MenuItem>
                        );
                      }
                      return null;
                    }),
                  ];
                }
                return null;
              })}
          {children}
        </MultiSelect>
      </>
    );
  }
);
