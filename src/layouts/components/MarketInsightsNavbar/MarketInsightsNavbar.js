import React, { useState } from "react";
import { Box } from "@mui/material";
import "./MarketInsightsNavbar.css";
import { MoreOptions, CitiesAndZipCodes } from "../../../shared/components";
import { connect } from "react-redux";
import { setComparisonOpen, setFindSellersOrBuyers } from "../../../redux";
import { Compare, Comparison } from "./components";
import { withExportReport } from "../../../shared/higherOrderComponents";
import { exportReport } from "../../../services";

const mapStateToProps = (state) => {
  return {
    city: state.marketInsights.city,
    zipCode: state.marketInsights.zipCode,
    period: state.marketInsights.period,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setComparisonOpen: (payload) => dispatch(setComparisonOpen(payload)),
    setFindSellersOrBuyers: (data) => dispatch(setFindSellersOrBuyers(data)),
  };
};
export const MarketInsightsNavbar = withExportReport(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(
    ({
      fetchMarketInsights,
      setComparisonOpen,
      city,
      zipCode,
      period,
      setFindSellersOrBuyers,
      openExportReport,
      canCompare = false,
      canExport = false,
      page = "cities-zip-codes",
    }) => {
      const [compareOpen, setCompareOpen] = useState(false);

      const findBuyers = (e) => {
        e.preventDefault();
        setFindSellersOrBuyers({
          open: true,
          city: city?.name,
          zipCode: zipCode?.code,
          sellers: false,
        });
      };
      const findSellers = (e) => {
        e.preventDefault();
        setFindSellersOrBuyers({
          open: true,
          city: city?.name,
          zipCode: zipCode?.code,
          sellers: true,
        });
      };
      return (
        <div className="navbar flex-row-between">
          {canCompare && (
            <Compare
              open={compareOpen}
              setOpen={setCompareOpen}
              openComarison={setComparisonOpen}
            />
          )}
          {canCompare && <Comparison setCompareOpen={setCompareOpen} />}
          <Box alignItems="center" className="flex-row-between w-100">
            <CitiesAndZipCodes
              hidePeriod
              initialCity={city}
              initialZipCode={zipCode}
              initialPeriod={period}
              onSelect={fetchMarketInsights}
              page={page}
            />
            <MoreOptions
              containerClassName="mi-more"
              placement="left-start"
              style={{ paddingRight: 12, paddingLeft: 12 }}
            >
              <span onClick={findBuyers}>Find buyers</span>
              <span onClick={findSellers}>Find sellers</span>
              {canExport && (
                <span
                  onClick={(e) => {
                    if (city) {
                      openExportReport({
                        entityCity: city,
                        entityZipCode: zipCode,
                      });
                    }
                  }}
                >
                  Export
                </span>
              )}
              {canCompare && (
                <span onClick={() => setCompareOpen(true)}>Compare</span>
              )}
            </MoreOptions>
          </Box>
        </div>
      );
    }
  ),
  true,
  exportReport
);
