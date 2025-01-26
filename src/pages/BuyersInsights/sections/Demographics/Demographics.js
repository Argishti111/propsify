import { Grid } from "@mui/material";
import React from "react";
import {
  BarChart,
  CardContainer,
  DoughnutChart,
  StackedBarChart,
} from "../../../../shared/components";
import { cardWidth } from "../../BuyersInsights";
import { BuyerInsightsItem } from "../../components";

export function Demographics({ data }) {
  return (
    <Grid pt={2} mt={-2} id="demographics" component="section">
      <CardContainer
        px={{ lg: 7, md: 7, sm: 4, xs: 4 }}
        width={cardWidth}
        mb={7}
        legend="Demographics"
      >
        <BuyerInsightsItem
          data={data}
          names={["Gender"]}
          title=""
          subtitle=""
          Chart={DoughnutChart}
          chartProps={{
            y: { unitOfMeasurement: "%" },
          }}
        />
        <BuyerInsightsItem
          data={data}
          names={["Primary language spoken"]}
          title="Percentage of population"
          subtitle="Primary language"
          Chart={BarChart}
          chartProps={{ y: { unitOfMeasurement: "%" }, datasetLabels: [] }}
        />
        <BuyerInsightsItem
          data={data}
          names={["Race"]}
          title="Percentage of population"
          subtitle="Race"
          Chart={BarChart}
          chartProps={{ y: { unitOfMeasurement: "%" }, datasetLabels: [] }}
        />
        <BuyerInsightsItem
          data={data}
          names={["Ethnicity"]}
          title="Percentage of population"
          subtitle="Ethnicity"
          chartDataWrapper={chartDataEthnicityWrapper}
          Chart={StackedBarChart}
          chartProps={{
            y: { unitOfMeasurement: "%" },
            datasetLabels: [],
          }}
        />
        <BuyerInsightsItem
          data={data}
          names={["Education"]}
          title="Percentage of population"
          subtitle="Highest degree attained"
          Chart={BarChart}
          chartProps={{ y: { unitOfMeasurement: "%" }, datasetLabels: [] }}
        />
        <BuyerInsightsItem
          data={data}
          names={["Occupation"]}
          title="Percentage of population"
          subtitle=""
          Chart={DoughnutChart}
          chartProps={{
            y: { unitOfMeasurement: "%" },
          }}
        />
        <BuyerInsightsItem
          data={data}
          names={["Industry"]}
          title="Percentage of population"
          subtitle="Industry"
          containerStyle={{ border: 0 }}
          Chart={BarChart}
          chartProps={{ y: { unitOfMeasurement: "%" }, datasetLabels: [] }}
        />
      </CardContainer>
    </Grid>
  );
}

const chartDataEthnicityWrapper = (data) => {
  let result = data[0].reduce((acc, next) => {
    let ethnicityIndex = next.datapoint_name.includes("non_white") ? 0 : 1;
    let datapointIndex = next.datapoint_name.includes("non_hispanic") ? 0 : 1;

    let datapoint_description =
      datapointIndex === 0 && ethnicityIndex === 0
        ? "Non Hispanic"
        : "Hispanic";
    let displayValue = ethnicityIndex === 0 ? "-% Non white" : "-% White";

    let item = {
      ...next,
      datapoint_description,
      displayValue,
    };
    if (!acc[ethnicityIndex]) {
      acc[ethnicityIndex] = [];
    }
    acc[ethnicityIndex][datapointIndex] = item;

    return acc;
  }, []);
  return result.map((item) =>
    item.sort((a, b) => a.displayValue?.localeCompare(b.displayValue))
  );
};
