import { useMemo } from "react";
import { minimizeNumber, numberWithCommas } from "../helpers";

export function useChartConfig(
  chartData,
  externalTooltipHandler = () => {},
  y = {},
  datasetStyle,
  options,
  datasets
) {
  return useMemo(() => {
    let labels = [];

    const label = !chartData.length ? "-" : chartData[0].displayValue;
    let _datasets = datasets || [
      {
        label,
        data: [],
        borderColor: "#BEB082",
        borderWidth: 4,

        borderSkipped: false,
        hoverBorderWidth: 4,
        pointRadius: 0,
        pointHoverBackgroundColor: "#FFF",
        pointHoverRadius: 7,
        pointBackgroundColor: "#FFF",
        ...datasetStyle,
      },
    ];

    for (let item of chartData) {
      labels.push(item.date);
      _datasets[0].data.push(item.value);
    }
    const maxValue = Math.max(..._datasets[0].data);
    const _options = options || {
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
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            display: false,
          },
          fontSize: 12,
          font: { family: "Lora", weight: "500", style: "italic" },
          ticks: {
            stepSize: maxValue < 10 ? 1 : undefined,
            callback: (value) => {
              if (window.innerWidth < 600) {
                return minimizeNumber(value);
              }
              return numberWithCommas(value);
            },
          },
          ...y,
        },
        x: {
          beginAtZero: true,
          ticks: {
            maxRotation: 90,
            minRotation: 60,
            padding: 10,
            callback: (_, index) => {
              if (window.innerWidth < 600 && (index + 1) % 3 !== 1) {
                return "";
              }
              return labels[index];
            },
            autoSkip: false,
            fontSize: 12,
            font: { family: "Lora", weight: "500", style: "italic" },
          },
          offset: true,
          grid: {
            display: false,
          },
        },
      },
    };
    return { labels, datasets: _datasets, options: _options };
  }, [chartData, externalTooltipHandler, y, datasetStyle, options, datasets]);
}
