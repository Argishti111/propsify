import { Box, Typography } from "@mui/material";
import React from "react";
import { ReactComponent as MonetizationOn } from "../../../../../../../../../../shared/static/icons/icon-value.svg";
import { ValueChangeExpectation } from "../ValueChangeExpectation";

export function PropertyValueDataSmall({
  estimated_min_value,
  estimated_max_value,
  estimated_value,
  valuation_date,
  predicted_direction,
}) {
  return (
    <Box
      mb={1}
      display={{ md: "none", sm: "flex", xs: "flex" }}
      borderRadius={1}
      boxShadow="0px 8px 16px #0000001A;"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      bgcolor="#FEFAF6"
      px={1}
      py={2}
    >
      <table>
        <tbody>
          <tr>
            <td>
              <Typography
                color="#192231cc"
                variant="p"
                fontSize={16}
                fontWeight="500"
                fontStyle="italic"
              >
                Est. min value
              </Typography>
            </td>
            <td align="right">
              <Typography color="#192231" variant="p" fontSize={14}>
                {estimated_min_value}
              </Typography>
            </td>
          </tr>
          <tr style={{ marginTop: 6 }}>
            <td style={{ display: "flex", alignItems: "center" }}>
              <Typography
                color="#192231cc"
                variant="p"
                fontSize={16}
                mr={1}
                fontWeight="500"
                fontStyle="italic"
              >
                Est. value
              </Typography>
              {/* <Info
                style={{ marginLeft: -4, marginTop: 4 }}
                defaultPosition="left"
                value="Propsify leverages a hyper-local automated valuation model (AVM) that incorporates best-in-class neighborhood boundary data and recent sales transaction data to capture micro-location deviations in the local real estate market. With a few exceptions for rural areas and others with low sales activity, all transactions used in the valuation models have occurred within 24 months of the AVM valuation date."
              /> */}
            </td>
            <td align="right">
              <Typography color="#192231" variant="p" fontSize={20}>
                {estimated_value}
              </Typography>
            </td>
          </tr>
          <tr style={{ marginTop: 2 }}>
            <td>
              <Typography
                variant="p"
                color="#192231cc"
                fontSize={16}
                fontWeight="500"
                fontStyle="italic"
              >
                Est. max value
              </Typography>
            </td>
            <td align="right">
              <Typography color="#192231" variant="p" fontSize={14}>
                {estimated_max_value}
              </Typography>
            </td>
          </tr>
          <tr style={{ marginTop: 8 }}>
            <td>
              <Typography
                color="#192231cc"
                variant="p"
                fontSize={12}
                fontWeight="500"
                fontStyle="italic"
              >
                AVM valuation date: {valuation_date}
              </Typography>
            </td>
            <td align="right" style={{ fontSize: 46 }}>
              <MonetizationOn
                fontSize="inherit"
                sx={{
                  outline: "6px solid #BEB082",
                  outlineOffset: -5,
                  borderRadius: "50%",
                }}
                htmlColor="#BEB082"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <ValueChangeExpectation predicted_direction={predicted_direction} />
    </Box>
  );
}
