import React, { useMemo } from "react";
import {
  CardContainer,
  Card,
  Loading,
  CardDetails,
  CardDisabled,
} from "../../../../shared/components";
import { MarketBalance } from "..";
import "./MainContent.css";
import { connect } from "react-redux";
import { checkMarketInsightsData } from "../../../../shared/helpers";
import { Grid } from "@mui/material";

const mapStateToProps = (state) => {
  return {
    loading: state.marketInsights.loading,
    marketInsights: state.marketInsights.data,
  };
};

export const MainContent = connect(mapStateToProps)(
  ({ marketInsights, loading, onScroll }) => {
    const [Overview, ListingTrends, SalesTrends, LocalDNA, MarketActivity] =
      useMemo(() => {
        return marketInsights
          ? [
              checkMarketInsightsData(marketInsights, [
                "median_days_on_market",
                "ldp_unique_viewers_per_property_vs_us",
                "sale_to_list_price_ratio",
                "market_balance",
              ]),
              checkMarketInsightsData(marketInsights, [
                "new_listing_count",
                "median_listing_price",
                "median_listing_price_per_square_foot",
                "total_listing_count",
                "predicted_new_listings",
                "expiring_listings",
              ]),
              checkMarketInsightsData(marketInsights, [
                "closed_sales",
                "pending_listing_count",
                "median_sale_price",
                "median_sale_price_per_square_foot",
              ]),
              checkMarketInsightsData(marketInsights, [
                "walkability_score",
                "school_rating",
                "crime_rating",
              ]),
              checkMarketInsightsData(marketInsights, [
                "demand_score",
                "refinances",
                "foreclosure",
              ]),
            ]
          : [false, false, false, false, false];
      }, [marketInsights]);

    if (loading || !marketInsights) {
      return <Loading className="market-insights-loading" />;
    }

    return (
      <>
        <CardDetails />
        <div onScroll={onScroll} className="main-content">
          {Overview && (
            <Grid pt={2} mt={-2} id="overview">
              <CardContainer
                mb={7}
                className="flex-row-between flex-wrap"
                legend="Overview"
              >
                <Card
                  id="median_days_on_market"
                  data={marketInsights["median_days_on_market"]}
                  name="Median days on market"
                />
                <Card
                  id="ldp_unique_viewers_per_property_vs_us"
                  data={marketInsights["ldp_unique_viewers_per_property_vs_us"]}
                  name="Viewers per property vs US"
                />
                <Card
                  id="sale_to_list_price_ratio"
                  data={marketInsights["sale_to_list_price_ratio"]}
                  name="Sale-to-list price ratio"
                />
                <MarketBalance data={marketInsights["market_balance"]} />
              </CardContainer>
            </Grid>
          )}
          {ListingTrends && (
            <Grid pt={2} mt={-2} id="listingTrends">
              <CardContainer
                mb={7}
                className="flex-row-between flex-wrap"
                legend="Listing trends"
              >
                <Card
                  xl={6}
                  id="new_listing_count"
                  data={marketInsights["new_listing_count"]}
                  name="New listings"
                />
                <Card
                  xl={6}
                  id="median_listing_price"
                  data={marketInsights["median_listing_price"]}
                  name="Median list price"
                />
                <Card
                  xl={6}
                  id="median_listing_price_per_square_foot"
                  data={marketInsights["median_listing_price_per_square_foot"]}
                  name="Median list price per square foot"
                />
                <Card
                  xl={6}
                  id="total_listing_count"
                  data={marketInsights["total_listing_count"]}
                  name="Housing inventory"
                />

                <Card
                  xl={6}
                  id="new_listing_count"
                  data={marketInsights["predicted_new_listings"]}
                  name="Predicted new listings
              (next 90 days)"
                />
                <CardDisabled
                  xl={6}
                  id="expiring_listings"
                  data={marketInsights["expiring_listings"]}
                  name="Expiring listings (next 30 days)"
                />
              </CardContainer>
            </Grid>
          )}
          {SalesTrends && (
            <Grid pt={2} mt={-2} id="salesTrends">
              <CardContainer
                mb={7}
                className="flex-row-between flex-wrap"
                legend="Sales trends"
              >
                <Card
                  xl={6}
                  id="closed_sales"
                  data={marketInsights["closed_sales"]}
                  name="Closed sales"
                />
                <Card
                  xl={6}
                  id="pending_listing_count"
                  data={marketInsights["pending_listing_count"]}
                  name="Pending sales"
                />
                <Card
                  xl={6}
                  id="median_sale_price"
                  data={marketInsights["median_sale_price"]}
                  name="Median home sale price"
                />
                <Card
                  xl={6}
                  id="median_sale_price_per_square_foot"
                  data={marketInsights["median_sale_price_per_square_foot"]}
                  name="Median home sale price per square foot"
                />
              </CardContainer>
            </Grid>
          )}

          {LocalDNA && (
            <Grid pt={2} mt={-2} id="localDNA">
              <CardContainer
                mb={7}
                className="flex-row-between flex-wrap"
                legend="Local DNA"
              >
                <Card
                  id="walkability_score"
                  data={marketInsights["walkability_score"]}
                  name="Walkability score"
                  maxValue={10}
                  percent=""
                />
                <Card
                  id="school_rating"
                  data={marketInsights["school_rating"]}
                  name="School rating"
                  maxValue={10}
                  percent=""
                />
                <Card
                  id="crime_rating"
                  data={marketInsights["crime_rating"]}
                  name="Crime rating"
                  percent=""
                />
              </CardContainer>
            </Grid>
          )}

          {MarketActivity && (
            <Grid pt={2} mt={-2} id="marketActivity">
              <CardContainer
                className="flex-row-between flex-wrap"
                legend="Market activity"
              >
                <Card
                  id="demand_score"
                  data={marketInsights["demand_score"]}
                  name="Market demand"
                  maxValue={10}
                  percent=""
                />
                <Card
                  id="refinances"
                  data={marketInsights["refinances"]}
                  name="Refinances"
                />
                <Card
                  id="foreclosure"
                  data={marketInsights["foreclosure"]}
                  name="Foreclosures"
                />
              </CardContainer>
            </Grid>
          )}
        </div>
      </>
    );
  }
);
