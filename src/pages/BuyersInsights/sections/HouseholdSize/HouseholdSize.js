import { Grid } from "@mui/material";
import React from "react";
import { BarChart, CardContainer } from "../../../../shared/components";
import { cardWidth } from "../../BuyersInsights";
import { BuyerInsightsItem } from "../../components";

export function HouseholdSize({ data }) {
  return (
    <Grid pt={2} mt={-2} id="householdSize" component="section">
      <CardContainer
        px={{ lg: 7, md: 7, sm: 4, xs: 4 }}
        width={cardWidth}
        mb={7}
        legend="Household size"
      >
        <BuyerInsightsItem
          data={data}
          names={["Family size"]}
          title="Percentage of families"
          subtitle="Number of persons"
          Chart={BarChart}
          chartProps={{ y: { unitOfMeasurement: "%" }, datasetLabels: [] }}
        />
        <BuyerInsightsItem
          data={data}
          names={["Non-family size"]}
          title="Percentage of non-family households"
          subtitle="Number of persons"
          containerStyle={{ border: 0 }}
          Chart={BarChart}
          chartProps={{ y: { unitOfMeasurement: "%" }, datasetLabels: [] }}
        />
      </CardContainer>
    </Grid>
  );
}
