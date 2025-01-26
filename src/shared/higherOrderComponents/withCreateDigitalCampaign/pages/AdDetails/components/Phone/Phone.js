import { CheckBoxOutlineBlank, KeyboardArrowDown } from "@mui/icons-material";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeDigitalCampaignField } from "../../../../../../../redux";
import { Input } from "../../../../../../components/Form";
import { formatPhone } from "../../../../../../helpers";
import "./Phone.css";

export function Phone() {
  const { phone, country, savePhone } = useSelector(
    (state) => state.digitalMarketing.campaign
  );

  const dispatch = useDispatch();

  const handleChange = useCallback((key) => {
    return (value) => {
      dispatch(changeDigitalCampaignField(key, value));
    };
  });

  const handlePhoneChange = useCallback((e) => {
    handleChange("phone")(formatPhone(e.target.value));
  }, []);

  return (
    <Box display="flex" flexDirection="column">
      <Typography
        color="#192231CC"
        fontStyle="italic"
        fontWeight="500"
        variant="body2"
      >
        Show a call button in your ad
      </Typography>
      <Grid display="flex" flexWrap="wrap">
        <Grid
          mt={2}
          pr={{ md: 1, sm: 0, xs: 0 }}
          item
          xl={5}
          lg={5}
          md={5}
          sm={12}
          xs={12}
        >
          <FormControl fullWidth>
            <InputLabel sx={{ color: "#BEB082" }} color="primary" id="country">
              Country
            </InputLabel>
            <Select
              onChange={handleChange("country")}
              defaultValue={country}
              SelectDisplayProps={{
                style: {
                  paddingTop: 11.5,
                  paddingBottom: 11.5,
                },
              }}
              fullWidth
              IconComponent={({ ...rest }) => (
                <KeyboardArrowDown {...rest} htmlColor="#BEB082" />
              )}
              labelId="country"
              value={"US"}
              label="Country"
              MenuProps={{
                className: "country-dropdown",
                sx: { left: { lg: 0, md: 0, sm: -8, xs: -8 } },
              }}
            >
              <MenuItem value={"US"}>USA</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid mt={2} item xl={7} lg={7} md={7} sm={12} xs={12}>
          <Input
            type="tel"
            fullWidth
            value={phone}
            inputProps={{ pattern: "[0-9]+{10}" }}
            onChange={handlePhoneChange}
            label="Phone Number"
          />
        </Grid>
      </Grid>
      <FormControlLabel
        sx={{ mt: -0.5 }}
        checked={savePhone}
        onChange={(e) => {
          e.target.value = savePhone ? "off" : "on";
          handleChange("savePhone")(!savePhone);
        }}
        control={
          <Checkbox
            color="primary"
            icon={<CheckBoxOutlineBlank htmlColor="#BEB082" />}
          />
        }
        label={
          <Typography variant="p">Save to my account for future use</Typography>
        }
      />
    </Box>
  );
}
