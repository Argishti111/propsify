import { Box, Typography } from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import React, { useMemo, useState } from "react";
import "./SummaryMobile.css";
import { CustomButton, Info } from "../../../shared/components";
import { connect } from "react-redux";
import { Statistic } from "../../../shared/components/Statistics";
import { setFindSellersOrBuyers } from "../../../redux";
import { keyToTitle } from "../../../shared/helpers";

const mapStateToProps = (state) => {
  return {
    loading: state.marketInsights.loading,
    marketInsights: state.marketInsights.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setFindSellersOrBuyers: (data) => dispatch(setFindSellersOrBuyers(data)),
  };
};

const scoreUnderDevelopment = true;
export const SummaryMobile = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ marketInsights, setFindSellersOrBuyers, loading }) => {
  const [closed, setClosed] = useState(true);

  const toggleSummary = () => setClosed((prev) => !prev);
  let { market_grade: marketGrade, likelihood_of_sale: likelihoodOfSale } =
    marketInsights
      ? marketInsights
      : { market_grade: null, likelihood_of_sale: null };
  marketGrade = marketGrade ? marketGrade : { additionalDataJson: "{}" };

  likelihoodOfSale = likelihoodOfSale ? likelihoodOfSale : {};

  const statistics = useMemo(() => {
    if (!marketGrade?.additionalDataJson) {
      return [];
    }
    let json = JSON.parse(marketGrade.additionalDataJson);
    return Object.keys(json).map((key) => {
      return { key, value: json[key], title: keyToTitle(key) };
    });
  }, [marketGrade]);

  if (loading) return null;

  const findBuyers = () => {
    setFindSellersOrBuyers({
      open: true,
      city: marketInsights.city?.name,
      zipCode: marketInsights.zipCode?.code,
      sellers: false,
    });
  };
  const findSellers = () => {
    setFindSellersOrBuyers({
      open: true,
      city: marketInsights.city?.name,
      zipCode: marketInsights.zipCode?.code,
      sellers: true,
    });
  };

  return (
    <Box className="score-under-development">
      <div className={`summary-header-mobile`}>
        <Box>
          <Typography
            variant="h6"
            className="summary-title italic summary-closed-item"
          >
            Summary
          </Typography>
          <Typography
            variant="p"
            fontSize={12}
            className="summary-subtitle summary-closed-item"
          >
            {marketInsights.city?.name}
            {marketInsights.zipCode?.id
              ? `/${marketInsights.zipCode?.code}`
              : ""}
          </Typography>
        </Box>
        <span onClick={toggleSummary}>
          {closed ? (
            <KeyboardArrowDown className="summary-toggle" htmlColor="#BEB082" />
          ) : (
            <KeyboardArrowUp className="summary-toggle" htmlColor="#BEB082" />
          )}
        </span>
      </div>
      <div className={`summary-mobile ${closed ? "summary-closed" : ""} `}>
        <div
          className={`summary-market-conatiner flex-column-center summary-closed-item`}
        >
          <span className="summary-market-value">
            <span>
              {marketGrade.displayValue ? marketGrade.displayValue : "\u00a0"}
            </span>
          </span>
          {scoreUnderDevelopment ? (
            <Typography
              variant="subtitle2"
              fontStyle="italic"
              textAlign="center"
              color="#AFAFAF"
              maxWidth={156}
            >
              The Propsify score is in development...
            </Typography>
          ) : (
            <div className="summary-market-title">
              <Typography className="italic" fontWeight="500" variant="p">
                Market grade
              </Typography>
              <Info
                style={{ margin: "0 10px" }}
                value={marketGrade.description}
              />
              {/* <KeyboardArrowDown htmlColor="#beb082" fontSize="small" /> */}
            </div>
          )}
          <div className="statistics">
            <div>
              {statistics.map((statistic) => (
                <Statistic
                  key={statistic.key}
                  label={statistic.title}
                  value={statistic.value}
                />
              ))}
            </div>
          </div>
        </div>
        <span className="likelihood-percent summary-closed-item flex-column-center">
          {likelihoodOfSale.displayValue}%
        </span>
        <div className="likelihood-label summary-closed-item">
          <Typography
            fontStyle="italic"
            fontWeight="500"
            fontSize={17}
            color="#192231cc"
            variant="p"
            style={{ marginRight: "10px" }}
          >
            Likelihood of sale{" "}
          </Typography>
          <Info value={likelihoodOfSale.description} />
        </div>
        <Typography
          variant="p"
          color="#192231cc"
          paragraph={true}
          className="likelihood-description summary-closed-item"
        >
          {likelihoodOfSale.valueDescription}
        </Typography>
        <div className="summary-actions summary-closed-item">
          <CustomButton
            onClick={findBuyers}
            style={{
              height: 32,
              letterSpacing: "0.08rem",
              fontFamily: "MinervaModern-Regular",
              fontWeight: "500",
            }}
          >
            FIND BUYERS
          </CustomButton>
          <CustomButton
            onClick={findSellers}
            style={{
              marginLeft: 8,
              height: 32,
              letterSpacing: "0.08rem",
              fontFamily: "MinervaModern-Regular",
              fontWeight: "500",
            }}
          >
            FIND SELLERS
          </CustomButton>
        </div>
        <Typography
          variant="p"
          className="actions-text flex-column-center summary-closed-item"
        >
          in this area
        </Typography>
      </div>
    </Box>
  );
});
