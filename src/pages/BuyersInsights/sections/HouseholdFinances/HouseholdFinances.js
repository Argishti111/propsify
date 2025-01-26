import { Grid } from "@mui/material";
import React from "react";
import { BarChart, CardContainer } from "../../../../shared/components";
import { cardWidth } from "../../BuyersInsights";
import { BuyerInsightsItem } from "../../components";

export function HouseholdFinances({ data }) {
  return (
    <Grid pt={2} mt={-2} id="householdFinances" component="section">
      <CardContainer
        px={{ lg: 7, md: 7, sm: 4, xs: 4 }}
        width={cardWidth}
        mb={7}
        legend="Household finances"
      >
        <BuyerInsightsItem
          data={data}
          names={["Household income"]}
          title="Percentage of population"
          subtitle="Median annual income"
          Chart={BarChart}
          chartProps={{ y: { unitOfMeasurement: "%" }, datasetLabels: [] }}
        />
        <BuyerInsightsItem
          data={data}
          names={["Expenditures"]}
          title="Percentage of expenditures"
          subtitle="Expenditure"
          containerStyle={{ border: 0 }}
          Chart={BarChart}
          chartProps={{ datasetLabels: [] }}
        />
      </CardContainer>
    </Grid>
  );
}
