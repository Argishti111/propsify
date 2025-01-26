import React from "react";
import {
  TopNavbar,
  Summary,
  MarketInsightsNavbar,
  SummaryMobile,
} from "../../layouts/components";
import { motion } from "framer-motion";
import { MainContent } from "./components";
import { fetchBuyerInsights } from "../../redux";
import { connect } from "react-redux";
import { FindSellersOrBuyersOptions, Navbar } from "../../shared/components";
import { useNavbarEvents } from "../../shared/hooks";
import { EmailAddressManager } from "../EmailMarketing/components";
export const cardWidth = "calc(100% - 8px)";

const sections = [
  { id: "buyerTrends", name: "BUYER TRENDS" },
  { id: "demographics", name: "DEMOGRAPHICS" },
  { id: "householdSize", name: "HOUSEHOLD SIZE" },
  { id: "householdFinances", name: "HOUSEHOLD FINANCES" },
  { id: "commute", name: "COMMUTE" },
];

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBuyerInsights: (body) => dispatch(fetchBuyerInsights(body)),
  };
};

export const BuyersInsights = connect(
  null,
  mapDispatchToProps
)(({ fetchBuyerInsights }) => {
  const { handleScroll, currentSection } = useNavbarEvents("buyerTrends", 500);
  return (
    <>
      <FindSellersOrBuyersOptions />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 1 }}
        className="main"
      >
        <TopNavbar title="Buyer's Insights">
          <MarketInsightsNavbar
            page="buyers-insights"
            fetchMarketInsights={fetchBuyerInsights}
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
