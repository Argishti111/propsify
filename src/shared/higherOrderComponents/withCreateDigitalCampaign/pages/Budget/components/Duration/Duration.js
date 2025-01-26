import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeDigitalCampaignField } from "../../../../../../../redux";
import { DateTimePicker } from "../../../../../../components/Form";

export function Duration() {
  const dispatch = useDispatch();
  const { startDate, endDate, runContinously } = useSelector(
    (state) => state.digitalMarketing.campaign
  );

  const handleChange = useCallback((key) => {
    return (value) => {
      dispatch(changeDigitalCampaignField(key, value));
    };
  }, []);
  return (
    <Box mb={5} display="flex" flexDirection="column">
      <Typography
        mt={4}
        mb={2}
        variant="body2"
        fontStyle="italic"
        fontWeight="500"
      >
        Duration
      </Typography>
      <DateTimePicker
        minDate={Date.now()}
        maxDate={endDate}
        value={startDate}
        style={{ maxWidth: 500 }}
        required
        label="Start date and time"
        onChange={handleChange("startDate")}
      />

      <FormControl>
        <RadioGroup
          onChange={(e) => {
            dispatch(
              changeDigitalCampaignField(
                "runContinously",
                e.target.value == "2"
              )
            );
          }}
          defaultValue="2"
        >
          <FormControlLabel
            sx={{ mt: 2 }}
            value="1"
            // disabled={loading}
            control={<Radio sx={{ color: "#BEB082" }} />}
            label={<Typography variant="body2">End date and time</Typography>}
          />
          {!runContinously && (
            <DateTimePicker
              value={endDate}
              minDate={startDate ? startDate : Date.now()}
              label="End date and time"
              required
              style={{ maxWidth: 500 }}
              onChange={handleChange("endDate")}
            />
          )}
          <FormControlLabel
            value="2"
            sx={{ mt: 2 }}
            // disabled={loading}
            control={<Radio sx={{ color: "#BEB082" }} defaultChecked />}
            label={<Typography variant="body2">Run continously</Typography>}
          />
        </RadioGroup>
      </FormControl>
    </Box>
  );
}
