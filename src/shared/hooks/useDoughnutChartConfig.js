import { useMemo } from "react";

const colors = ["#ECD9CC", "#BEB082", "#FFFFFF"];

export function useDoughnutChartConfig(
  chartData = [],
  externalTooltipHandler = () => {},
  y = {},
  datasetStyle,
  options,
  datasets
) {
  return useMemo(() => {
    const labels = [];
    let _datasets =
      datasets ||
      chartData.map((data) => {
        return {
          label:
            (!data.length ? "-" : data[0].displayValue ?? "-") +
            y.unitOfMeasurement,
          data: [],
          backgroundColor: colors,
          borderColor: "#f2efe6",
          borderWidth: 0,
          ...datasetStyle,
        };
      });

    for (let item of chartData[0]) {
      labels.push(item.datapoint_description);
      _datasets[0].data.push(item.value_num);
    }

    for (let i = 1; i < chartData.length; i++) {
      for (let item of chartData[i]) {
        _datasets[i].data.push(item.value_num);
      }
    }

    const _options = options || {
      cutout: 90,

      responsive: true,
      hover: {
        intersect: false,
      },
      plugins: {
        tooltip: {
          enabled: false,
          bodyAlign: "right",
          external: externalTooltipHandler,
        },
        legend: {
          display: false,
        },
      },
      interaction: {
        mode: "nearest",
        intersect: false,
      },
      maintainAspectRatio: false,
    };
    return { labels, datasets: _datasets, options: _options, colors };
  }, [chartData]);
}
