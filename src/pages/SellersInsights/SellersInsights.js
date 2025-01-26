import React from "react";
import { motion } from "framer-motion";
import { MainContent } from "./components";
import "./SellersInsights.css";
import {
  TopNavbar,
  Summary,
  MarketInsightsNavbar,
  SummaryMobile,
} from "../../layouts/components";

import { FindSellersOrBuyersOptions, Navbar } from "../../shared/components";
import { fetchMarketInsights } from "../../redux";
import { connect } from "react-redux";
import { useNavbarEvents } from "../../shared/hooks";

const sections = [
  { id: "overview", name: "OVERVIEW" },
  { id: "listingTrends", name: "LISTING TRENDS" },
  { id: "salesTrends", name: "SALES TRENDS" },
  { id: "localDNA", name: "LOCAL DNA" },
  { id: "marketActivity", name: "MARKET ACTIVITY" },
];

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMarketInsights: (body) => dispatch(fetchMarketInsights(body)),
  };
};

export const SellersInsights = connect(
  null,
  mapDispatchToProps
)(({ fetchMarketInsights }) => {
  const { handleScroll, currentSection } = useNavbarEvents("overview", 500);

  return (
    <>
      <FindSellersOrBuyersOptions />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 1 }}
        className="main"
      >
        <TopNavbar title="Seller's Insights">
          <MarketInsightsNavbar
            canCompare
            canExport
            fetchMarketInsights={fetchMarketInsights}
          />
          <Navbar
            justifyContent="space-between"
            width={{
              lg: "auto",
              md: "60vw",
              sm: "calc(100vw - 100px)",
              xs: "calc(100vw - 100px)",
            }}
            currentSection={currentSection}
            items={sections}
          />
          <SummaryMobile />
        </TopNavbar>
        <MainContent onScroll={handleScroll} />
      </motion.div>
      <Summary />
    </>
  );
});
