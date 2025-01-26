import { Typography } from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import "./Summary.css";
import {
  CustomButton,
  Info,
  Loading,
  Statistics,
  Statistic,
} from "../../../shared/components";
import { connect } from "react-redux";
import { setFindSellersOrBuyers, setSummaryClosed } from "../../../redux";
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

export const Summary = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ marketInsights, loading, setFindSellersOrBuyers }) => {
  const [showStatistics, setShowStatistics] = useState(false);
  const toggleStatistics = () => setShowStatistics(!showStatistics);
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

  if (loading) {
    return (
      <motion.div
        initial={{ x: "25vw" }}
        animate={{ x: 0 }}
        transition={{ duration: 1, type: "tween", ease: "easeIn" }}
        className="summary score-under-development"
      >
        <div
          className={`summary-header ${
            showStatistics ? "summary-header-open" : ""
          } flex-column-center`}
        >
          <Typography
            variant="h5"
            className="summary-title summary-title-vertical italic"
          >
            S U M M A R Y
          </Typography>
        </div>
        <Loading />
      </motion.div>
    );
  }

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
    <motion.div
      initial={{ x: "25vw" }}
      animate={{ x: 0 }}
      transition={{ duration: 1, type: "tween", ease: "easeIn" }}
      className="summary score-under-development"
    >
      <div
        className={`summary-header ${
          showStatistics || scoreUnderDevelopment ? "summary-header-open" : ""
        } flex-column-center`}
      >
        <Typography
          variant="h6"
          className="summary-title italic summary-closed-item"
        >
          Summary
        </Typography>
        <Typography
          variant="h5"
          className="summary-title summary-title-vertical italic"
        >
          S U M M A R Y
        </Typography>
        <Typography
          variant="p"
          className="summary-subtitle summary-closed-item"
        >
          {marketInsights.city?.name}
          {marketInsights.zipCode?.id ? `/${marketInsights.zipCode?.code}` : ""}
        </Typography>
      </div>
      <div
        // onClick={toggleStatistics}
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
          <>
            <div className="summary-market-title">
              <Typography className="italic" fontWeight="500" variant="p">
                Market grade
              </Typography>
              <Info
                style={{ margin: "0 10px" }}
                value={marketGrade.description}
              />
              {showStatistics ? (
                <KeyboardArrowUp htmlColor="#beb082" fontSize="small" />
              ) : (
                <KeyboardArrowDown htmlColor="#beb082" fontSize="small" />
              )}
            </div>
          </>
        )}
        <Statistics visible={showStatistics || true}>
          {/* TODO: Under development */}
          {statistics.map((statistic) => (
            <Statistic
              key={statistic.key}
              label={statistic.title}
              value={statistic.value}
            />
          ))}
        </Statistics>
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
        fontSize="0.75rem"
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
    </motion.div>
  );
});
