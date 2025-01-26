import { Box } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { CustomSelect } from "../Form/CustomSelect";
import { useQuery } from "../../hooks";
import { useNavigate } from "react-router";
import { periods } from "../../../layouts/components/MarketInsightsNavbar/components/Comparison/data";

const mapStateToProps = (state) => {
  return {
    citiesSubscribed: state.user.citiesSubscribed,
  };
};

const defaultZipCode = { id: "", code: "All ZIP Codes" };
const defaultCity = {
  id: "",
  name: "",
  zipCodes: [],
  index: 0,
};
const defaultPeriod = {
  id: "1mo",
  name: "Last month",
};
export const CitiesAndZipCodes = connect(mapStateToProps)(
  ({
    citiesSubscribed,
    onSelect = () => {},
    initialCity = defaultCity,
    initialZipCode = defaultZipCode,
    initialPeriod = defaultPeriod,
    hidePeriod = false,
    dontTakeFromQuery,
    page = "cities-zip-codes",
  }) => {
    const query = useQuery();

    const navigate = useNavigate();

    const [selectedCity, setSelectedCity] = useState(initialCity);
    const [selectedZipCode, setSelectedZipCode] = useState(initialZipCode);
    const [selectedPeriod, setSelectedPeriod] = useState(initialPeriod);

    useEffect(() => {
      const entityId = query.get("entityId");
      // if there is city id on query params then use it
      if (citiesSubscribed.length && entityId) {
        const entityIdToFind = +entityId;
        let zipCodeFromQuery = selectedZipCode;
        let cityFromQuery = citiesSubscribed.find((c) => {
          if (c.id === entityIdToFind) {
            return true;
          }
          let zipCode = c.zipCodes.find((zc) => zc.id === entityIdToFind);
          if (zipCode) {
            zipCodeFromQuery = zipCode;
            return c;
          }
        });
        if (cityFromQuery && !dontTakeFromQuery) {
          onSelect({
            selectedCity: cityFromQuery,
            selectedZipCode: zipCodeFromQuery,
            selectedPeriod,
          });
          setSelectedCity(cityFromQuery);
          setSelectedZipCode(zipCodeFromQuery);
        }
        // navigate(`/market-insights/${page}`, { replace: true });
      } else if (citiesSubscribed.length && !selectedCity.id) {
        // select first city if there is any of it
        citiesSubscribed[0].index = 0;
        setSelectedCity(citiesSubscribed[0]);
      }
    }, [citiesSubscribed]);

    useEffect(() => {
      if (
        initialCity.id !== selectedCity.id ||
        initialZipCode.id !== selectedZipCode.id
      ) {
        setSelectedCity(initialCity);
        setSelectedZipCode(initialZipCode);
      }
    }, [initialCity, initialZipCode]);

    useEffect(() => {
      // handle select event when the city or the zip code is changed
      if (selectedCity.id) {
        onSelect({
          selectedCity,
          selectedZipCode,
          selectedPeriod,
        });
      }
    }, [selectedCity, selectedZipCode, selectedPeriod]);

    const handleCitySelect = useCallback((city, index) => {
      return () => {
        city.index = index;

        if (dontTakeFromQuery) {
          query.set("city", city.name);
          query.set("zipCode", defaultZipCode.code);
          query.set("entityId", city.id);
        }

        navigate(`${window.location.pathname}?${query.toString()}`, {
          replace: true,
        });

        setSelectedCity(city);
        setSelectedZipCode(defaultZipCode);
      };
    }, []);

    const handleZipCodeSelect = useCallback((zipCode) => {
      return () => {
        if (!dontTakeFromQuery) {
          query.set("zipCode", zipCode.code);
          query.set("entityId", zipCode.id);
        }
        navigate(`${window.location.pathname}?${query.toString()}`, {
          replace: true,
        });

        setSelectedZipCode(zipCode);
      };
    }, []);

    const handlePeriodSelect = useCallback((period) => {
      return () => {
        setSelectedPeriod(period);
      };
    }, []);

    return (
      <Box
        display="inline-flex"
        flexWrap="wrap"
        className="select-fullWidth"
        width="100%"
      >
        <CustomSelect selectedItem={selectedCity.name}>
          {citiesSubscribed.map((city, index) => (
            <a key={city.id} onClick={handleCitySelect(city, index)} href="#">
              {city.name}
            </a>
          ))}
          {/* <a style={{ borderTop: "1px solid #ecd9cc" }} href="#">
            + Add Cities //TODO: Removed for mvp
          </a> */}
        </CustomSelect>
        <CustomSelect selectedItem={selectedZipCode.code}>
          <a
            key={defaultZipCode.id}
            onClick={handleZipCodeSelect(defaultZipCode)}
            href="#"
          >
            {defaultZipCode.code}
          </a>
          {/* if there is any city subscribed */}
          {citiesSubscribed.length > 0 &&
            citiesSubscribed[selectedCity.index].zipCodes.map((zipCode) => (
              <a
                key={zipCode.id}
                onClick={handleZipCodeSelect(zipCode)}
                href="#"
              >
                {zipCode.code}
              </a>
            ))}
        </CustomSelect>

        {!hidePeriod && (
          <CustomSelect selectedItem={selectedPeriod.name}>
            {periods.map((p) => (
              <a key={p.id} onClick={handlePeriodSelect(p)} href="#">
                {p.name}
              </a>
            ))}
          </CustomSelect>
        )}
      </Box>
    );
  }
);
