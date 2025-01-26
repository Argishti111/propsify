import { Grid } from "@mui/material";
import React from "react";
import {
  BarChart,
  CardContainer,
  DoughnutChart,
} from "../../../../shared/components";
import { cardWidth } from "../../BuyersInsights";
import { BuyerInsightsItem } from "../../components";

export function Commute({ data }) {
  return (
    <Grid pt={2} mt={-2} id="commute" component="section">
      <CardContainer
        px={{ lg: 7, md: 7, sm: 4, xs: 4 }}
        width={cardWidth}
        legend="Commute"
      >
        <BuyerInsightsItem
          data={data}
          names={["Work from home"]}
          title="Percentage of population"
          subtitle=""
          Chart={DoughnutChart}
          chartProps={{
            y: { unitOfMeasurement: "%" },
          }}
        />
        <BuyerInsightsItem
          data={data}
          names={["Commute"]}
          title="Percentage of population"
          subtitle="Travel time, in minutes"
          Chart={BarChart}
          chartProps={{ y: { unitOfMeasurement: "%" }, datasetLabels: [] }}
        />
        <BuyerInsightsItem
          data={data}
          names={["Transportation type"]}
          title="Percentage of population"
          subtitle="Type of transportation"
          containerStyle={{ border: 0 }}
          Chart={BarChart}
          chartDataWrapper={(data) => data}
          chartProps={{ y: { unitOfMeasurement: "%" }, datasetLabels: [] }}
        />
      </CardContainer>
    </Grid>
  );
}
