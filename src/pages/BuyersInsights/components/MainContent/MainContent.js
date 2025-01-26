import React, { useMemo } from "react";
import { CardContainer, Loading } from "../../../../shared/components";
import "./MainContent.css";
import { connect } from "react-redux";
import { checkBuyerInsightsData } from "../../../../shared/helpers";
import {
  BuyerTrends,
  Commute,
  Demographics,
  HouseholdFinances,
  HouseholdSize,
} from "../../sections";

const mapStateToProps = (state) => {
  return {
    loading: state.marketInsights.loading,
    marketInsights: state.marketInsights.buyerInsights,
  };
};

export const MainContent = connect(mapStateToProps)(
  ({ marketInsights, loading, onScroll }) => {
    const [
      BuyerTrendsData,
      DemographicsData,
      HouseholdSizeData,
      HouseholdFinancesData,
      CommuteData,
    ] = useMemo(() => {
      return marketInsights
        ? [
            checkBuyerInsightsData(marketInsights, [
              "Historical buyer median age",
              "Buyer age",
              "Population age",
              "Buyer Industry",
            ]),
            checkBuyerInsightsData(marketInsights, [
              "Gender",
              "Primary language spoken",
              "Race",
              "Ethnicity",
              "Education",
              "Occupation",
              "Industry",
            ]),
            checkBuyerInsightsData(marketInsights, [
              "Family size",
              "Non-family size",
            ]),
            checkBuyerInsightsData(marketInsights, [
              "Household income",
              "Expenditures",
            ]),
            checkBuyerInsightsData(marketInsights, [
              "Work from home",
              "Commute",
              "Transportation type",
            ]),
          ]
        : [false, false, false, false, false];
    }, [marketInsights]);

    if (loading || !marketInsights) {
      return <Loading className="market-insights-loading" />;
    }

    return (
      <div onScroll={onScroll} className="main-content">
        {!!BuyerTrendsData && <BuyerTrends data={BuyerTrendsData} />}
        {!!DemographicsData && <Demographics data={DemographicsData} />}
        {!!HouseholdSizeData && <HouseholdSize data={HouseholdSizeData} />}
        {!!HouseholdFinancesData && (
          <HouseholdFinances data={HouseholdFinancesData} />
        )}
        {!!CommuteData && <Commute data={CommuteData} />}
      </div>
    );
  }
);
