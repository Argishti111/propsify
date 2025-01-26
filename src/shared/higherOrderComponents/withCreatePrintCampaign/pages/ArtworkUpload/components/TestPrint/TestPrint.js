import { CheckBoxOutlineBlank } from "@mui/icons-material";
import { Box, Checkbox, Grid, Typography } from "@mui/material";
import React from "react";
import { Input } from "../../../../../../components/Form";
import "./TestPrint.css";
import { connect } from "react-redux";
import { changePrintCampaignField } from "../../../../../../../redux";

const mapStateToProps = (state) => {
  return {
    address: state.printMarketing.address,
    city: state.printMarketing.city,
    state: state.printMarketing.state,
    zip: state.printMarketing.zip,
    finalize: state.printMarketing.finalize,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeField: (key, value) => dispatch(changePrintCampaignField(key, value)),
  };
};

export const TestPrint = connect(
  mapStateToProps,
  mapDispatchToProps
)(
  ({
    changeField,
    defaultChecked,
    testChecked,
    setTestChecked,
    address,
    city,
    state,
    zip,
    setAllFieldsWriten,
    finalize,
  }) => {
    const handleChange = (key) => {
      setAllFieldsWriten(address && city && state && zip);
      return (e) => changeField(key, e.target.value);
    };

    return (
      <>
        {/* Send test */}
        <Box marginTop={7} display="flex">
          {!finalize && (
            <Checkbox
              id="sendTest"
              icon={<CheckBoxOutlineBlank color="primary" />}
              defaultChecked={defaultChecked}
              value={testChecked}
              onChange={(e) => {
                setTestChecked((prev) => !prev);
              }}
            />
          )}
          <Typography
            display="block"
            alignSelf="center"
            variant="p"
            fontSize={15}
          >
            <label style={{ cursor: "pointer" }} htmlFor="sendTest">
              {!finalize && "Send test print"}
            </label>
          </Typography>
        </Box>
        {/* <Typography
          marginTop={-1}
          marginLeft={5}
          style={{ paddingLeft: 2 }}
          fontStyle="italic"
          fontSize={15}
          variant="p"
        >
          {!finalize && "You are eligible for one post card per month"}
        </Typography> */}
        <Box
          className={`test-print-address ${
            testChecked && !finalize ? "" : "test-print-address-hidden"
          }`}
          ml={{ md: 5, sm: 0, xs: 0 }}
          mt={3}
          mb={2}
        >
          <Input
            label="Address*"
            value={address}
            onChange={handleChange("address")}
            fullWidth
          />
          <Grid
            display="flex"
            gap={{ md: 1, sm: 0, xs: 0 }}
            flexWrap={{ md: "nowrap", sm: "wrap", xs: "wrap" }}
          >
            <Grid xl={6} lg={6} md={6} sm={12} xs={12} item>
              <Input
                sx={{ marginTop: 1 }}
                label="City*"
                value={city}
                onChange={handleChange("city")}
                fullWidth
              />
            </Grid>
            <Grid xl={6} lg={6} md={6} sm={12} xs={12} item>
              <Input
                sx={{ marginTop: 1 }}
                label="Zip Code*"
                value={zip}
                onChange={handleChange("zip")}
                fullWidth
              />
            </Grid>
          </Grid>
          <Input
            sx={{ marginTop: 1 }}
            label="State*"
            value={state}
            onChange={handleChange("state")}
            fullWidth
          />
        </Box>
      </>
    );
  }
);
