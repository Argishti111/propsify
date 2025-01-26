import { Grid } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import {
  BarChart,
  CardContainer,
  LineChart,
} from "../../../../shared/components";
import { cardWidth } from "../../BuyersInsights";
import { BuyerInsightsItem } from "../../components";

export function BuyerTrends({ data }) {
  useEffect(() => {
    if (data["Historical buyer median age"]) refactorHistoricalBuyerMedianAge();
  }, []);
  const refactorHistoricalBuyerMedianAge = useCallback(() => {
    data["Historical buyer median age"].data.map((item) => {
      item.value_num = Number(item.display_text);
      return item;
    });
  }, []);
  return (
    <Grid pt={2} mt={-2} id="buyerTrends" component="section">
      <CardContainer
        px={{ lg: 7, md: 7, sm: 4, xs: 4 }}
        width={cardWidth}
        mb={7}
        legend="Buyer trends"
      >
        <BuyerInsightsItem
          data={data}
          names={["Historical buyer median age"]}
          title="Buyer median age"
          subtitle="Month"
          chartDataWrapper={(data) => data[0]}
          Chart={LineChart}
        />
        <BuyerInsightsItem
          data={data}
          names={["Buyer age", "Population age"]}
          title="Percentage of buyers"
          subtitle="Age"
          Chart={BarChart}
          chartProps={{
            datasetLabels: ["Buyer age", "Population age"],
            y: { unitOfMeasurement: "%" },
          }}
        />
        <BuyerInsightsItem
          data={data}
          groupName="Industry"
          names={["Buyer Industry"]}
          title="Percentage of buyers"
          subtitle="Industry"
          containerStyle={{ border: 0 }}
          Chart={BarChart}
          chartProps={{ y: { unitOfMeasurement: "%" }, datasetLabels: [] }}
        />
      </CardContainer>
    </Grid>
  );
}
