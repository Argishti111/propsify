import { Moving } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React from "react";
import { ReactComponent as MonetizationOn } from "../../../../../../../../../../shared/static/icons/icon-value.svg";
import { ValueChangeExpectation } from "../ValueChangeExpectation";

export function PropertyValueData({
  estimated_min_value,
  estimated_max_value,
  estimated_value,
  valuation_date,
  predicted_direction,
}) {
  return (
    <Box
      mb={1}
      borderRadius={1}
      boxShadow="0px 8px 16px #0000001A;"
      display={{ md: "flex", sm: "none", xs: "none" }}
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      bgcolor="#FEFAF6"
      px={4}
      height="calc(100% - 8px)"
    >
      <MonetizationOn fontSize="medium" htmlColor="#BEB082" />
      <Box
        mt={1}
        display="flex"
        alignItems="center"
        width="100%"
        justifyContent="space-between"
      >
        <Typography
          sx={{ width: "100%" }}
          textAlign="center"
          variant="subtitle1"
          color="#666666"
          fontStyle="italic"
        >
          Est. min value
        </Typography>
        <Box display="flex" flexDirection="row">
          <Typography
            sx={{ width: "100%" }}
            textAlign="center"
            variant="subtitle1"
            whiteSpace="nowrap"
            fontStyle="italic"
          >
            Est. value
          </Typography>
          {/* <Info
            style={{ marginLeft: 4, marginTop: 4 }}
            value="Propsify leverages a hyper-local automated valuation model (AVM) that incorporates best-in-class neighborhood boundary data and recent sales transaction data to capture micro-location deviations in the local real estate market. With a few exceptions for rural areas and others with low sales activity, all transactions used in the valuation models have occurred within 24 months of the AVM valuation date."
          /> */}
        </Box>
        <Typography
          sx={{ width: "100%" }}
          textAlign="center"
          variant="subtitle1"
          fontStyle="italic"
          color="#666666"
        >
          Est. max value
        </Typography>
      </Box>
      <Box
        mt={1}
        display="flex"
        width="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography
          sx={{ width: "100%" }}
          textAlign="center"
          variant="body2"
          fontWeight="500"
          fontStyle="italic"
          color="#666666"
        >
          {estimated_min_value}
        </Typography>
        <Typography
          sx={{ width: "100%" }}
          textAlign="center"
          variant="h5"
          fontWeight="500"
          fontStyle="italic"
        >
          {estimated_value}
        </Typography>
        <Typography
          sx={{ width: "100%" }}
          textAlign="center"
          variant="body2"
          fontWeight="500"
          fontStyle="italic"
          color="#666666"
        >
          {estimated_max_value}
        </Typography>
      </Box>
      <ValueChangeExpectation predicted_direction={predicted_direction} />
      <Typography
        pt={1}
        variant="p"
        fontSize={12}
        fontWeight="500"
        fontStyle="italic"
      >
        AVM valuation date: {valuation_date}
      </Typography>
    </Box>
  );
}
