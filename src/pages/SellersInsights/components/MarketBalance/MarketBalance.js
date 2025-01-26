import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { Info } from "../../../../shared/components";
import "./MarketBalance.css";

export function MarketBalance({ data = {} }) {
  return (
    <Box
      className="market-balance-container"
      width="100%"
      display="flex"
      flexDirection="row"
      alignItems="self-end"
    >
      <Grid
        className="market-balance-item"
        item
        xl={4}
        lg={4}
        md={6}
        sm={4}
        xs={4}
      >
        <Grid alignItems="center" className="market-balance flex-row-between ">
          <Typography fontSize={17} className="italic " variant="h6">
            Market balance
          </Typography>
          <Info value={data.description} />
        </Grid>
        <Grid
          className={`market-balance-line ${
            data.displayValue === "Buyer's market" ? "with-circle" : ""
          }`}
          style={{ backgroundColor: "#ECD9CC" }}
        />
        <Typography
          whiteSpace="nowrap"
          className="card-subtitle"
          fontSize="1.063rem"
          variant="h6"
          textAlign="center"
        >
          Buyer<span>'s market</span>
        </Typography>
      </Grid>

      <Grid item xl={4} lg={4} md={6} sm={4} xs={4}>
        <Grid
          alignItems="center"
          className="market-balance flex-row-between "
        ></Grid>
        <Grid
          className={`market-balance-line ${
            data.displayValue === "Balanced market" ? "with-circle" : ""
          }`}
          style={{ backgroundColor: "#EFEFEF" }}
        />
        <Typography
          whiteSpace="nowrap"
          className="card-subtitle"
          fontSize="1.063rem"
          variant="h6"
          textAlign="center"
        >
          Balanced <span>market</span>
        </Typography>
      </Grid>

      <Grid item xl={4} lg={4} md={6} sm={4} xs={4}>
        <Grid
          alignItems="center"
          className="market-balance flex-row-between "
        ></Grid>
        <Grid
          className={`market-balance-line ${
            data.displayValue === "Seller's market" ? "with-circle" : ""
          }`}
          style={{ backgroundColor: "#D8CFB4" }}
        />
        <Typography
          whiteSpace="nowrap"
          className="card-subtitle"
          variant="h6"
          fontSize="1.063rem"
          textAlign="center"
        >
          Seller<span>'s market</span>
        </Typography>
      </Grid>
    </Box>
  );
}
