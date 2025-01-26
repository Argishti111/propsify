import { useMemo } from "react";
import { minimizeNumber, numberWithCommas } from "../helpers";

export function useLineChartConfig(
  chartData,
  externalTooltipHandler = () => {},
  y = {},
  datasetStyle,
  options,
  datasets
) {
  return useMemo(() => {
    let labels = [];

    const label =
      (!chartData.length ? "-" : chartData[0].displayValue ?? "-") +
      y.unitOfMeasurement;
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
      labels.push(item.datapoint_description);
      _datasets[0].data.push(item.value_num);
    }

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
            display: true,
            borderDash: [3, 3],
            drawTicks: true,
            borderWidth: 1,
            borderColor: "#0000004D",
            tickWidth: 1,
            tickColor: "#0000004D",
          },
          ticks: {
            stepSize: 10,
            color: "#0000004D",
            fontSize: 12,
            font: { family: "Lora", weight: "400" },
            callback: (value) => {
              // move this callback from here
              if (!value) {
                return "";
              }
              if (window.innerWidth < 600) {
                return (
                  minimizeNumber(+value + 1 - 10) +
                  "-" +
                  minimizeNumber(value) +
                  y.unitOfMeasurement +
                  " "
                );
              }
              return (
                numberWithCommas(+value + 1 - 10) +
                "-" +
                numberWithCommas(value) +
                y.unitOfMeasurement +
                " "
              );
            },
          },
          ...y,
        },
        x: {
          beginAtZero: true,
          ticks: {
            maxRotation: 90,
            minRotation: 0,
            padding: 10,
            callback: (_, index) => {
              if (window.innerWidth < 600 && (index + 1) % 3 !== 1) {
                return "";
              }
              return labels[index];
            },
            autoSkip: false,
            fontSize: 12,
            color: "#0000004D",
            font: { family: "Lora", weight: "400", size: 12 },
          },
          offset: true,
          grid: {
            borderWidth: 1,
            borderColor: "#0000004D",
            drawTicks: true,
            tickWidth: 1,
            tickColor: "#0000004D",
            drawOnChartArea: false,
          },
        },
      },
    };
    return { labels, datasets: _datasets, options: _options };
  }, [chartData, externalTooltipHandler, y, datasetStyle, options, datasets]);
}
