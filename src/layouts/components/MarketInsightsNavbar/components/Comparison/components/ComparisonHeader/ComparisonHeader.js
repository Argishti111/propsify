import { FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import { CustomButton } from "../../../../../../../shared/components";
import { connect } from "react-redux";
import { setCity, setZipCode } from "../../../../../../../redux";

const mapDispatchToProps = (dispatch) => {
  return {
    setCity: (city) => dispatch(setCity(city)),
    setZipCode: (zipCode) => dispatch(setZipCode(zipCode)),
  };
};
/**
 *
 * @default cities = []
 * @default zipCodes = []
 */
export const ComparisonHeader = connect(
  null,
  mapDispatchToProps
)(
  ({
    cities = [],
    zipCodes = [],
    setPlace,
    setCity,
    setZipCode,
    onViewDetails = () => {},
  }) => {
    useEffect(() => {
      return () => {
        setPlace(null);
      };
    }, []);
    const handlePlaceChange = useCallback((e) => {
      setPlace(e.target.value);
    }, []);

    const viewDetails = useCallback(
      (item, key) => {
        switch (key) {
          case "city": {
            setCity(item);
            break;
          }
          case "zipCode": {
            setZipCode(item);
            break;
          }
        }
        onViewDetails(item);
      },
      [cities, zipCodes]
    );

    return (
      <RadioGroup
        onChange={handlePlaceChange}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
        aria-labelledby="radio-buttons-group-label-places"
        defaultValue="city"
        name="radio-buttons-group-places"
      >
        <thead style={{ position: "sticky", paddingRight: 10 }}>
          <tr>
            <th style={{ width: "30%" }}></th>
            {cities.map((city) => (
              <th key={city.id}>
                <FormControlLabel
                  value={city.id}
                  control={
                    <Radio
                      sx={{
                        color: "#beb082",
                      }}
                    />
                  }
                  label={city.name}
                />
                <CustomButton
                  onClick={() => viewDetails(city, "city")}
                  style={{ width: "90%", marginTop: 12, marginBottom: 8 }}
                >
                  View Details
                </CustomButton>
              </th>
            ))}
            {zipCodes.map((zipCode) => (
              <th key={zipCode.id}>
                <FormControlLabel
                  value={zipCode.id}
                  control={
                    <Radio
                      sx={{
                        color: "#beb082",
                      }}
                    />
                  }
                  label={zipCode.code}
                />
                <CustomButton
                  onClick={() => viewDetails(zipCode, "zipCode")}
                  style={{ width: "90%", marginTop: 18, marginBottom: 8 }}
                >
                  View Details
                </CustomButton>
              </th>
            ))}
          </tr>
        </thead>
      </RadioGroup>
    );
  }
);

{
  /* <Typography variant="p" fontWeight="600" fontStyle="italic">
{city}
</Typography> */
}
