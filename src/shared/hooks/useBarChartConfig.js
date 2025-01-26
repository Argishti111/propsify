import { useMemo } from "react";
import { minimizeNumber, numberWithCommas } from "../helpers";

const colors = ["#ECD9CC", "#BEB082"];

export function useBarChartConfig(
  chartData = [],
  externalTooltipHandler = () => {},
  y = {},
  stacked = false,
  datasetStyle,
  options,
  datasets
) {
  return useMemo(() => {
    const labels = [];
    let _datasets =
      datasets ||
      chartData.map((data, index) => {
        const color = colors[index];
        return {
          label:
            (!data.length ? "-" : data[index].displayValue ?? "-") +
            (stacked ? "" : y.unitOfMeasurement),
          data: [],
          backgroundColor: color,
          borderColor: color,
          hoverBorderColor: color,
          borderWidth: 0,
          hoverBackgroundColor: color,
          borderSkipped: true,
          pointRadius: 0,
          pointHoverBackgroundColor: "#FFF",
          pointHoverRadius: 7,
          pointBackgroundColor: "#FFF",

          maxBarThickness: 100,
          ...datasetStyle,
        };
      });

    if (stacked) {
      for (let item of chartData[0]) {
        _datasets[0].data.push(item.value_num);
      }
      for (let item of chartData) {
        labels.push(textWrapLabel(item[0].datapoint_description));
      }
    } else {
      for (let item of chartData[0]) {
        labels.push(textWrapLabel(item.datapoint_description));
        _datasets[0].data.push(item.value_num);
      }
    }
    for (let i = 1; i < chartData.length; i++) {
      for (let item of chartData[i]) {
        _datasets[i].data.push(item.value_num);
      }
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
          stacked,
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
            color: "#0000004D",
            fontSize: 12,
            font: { family: "Lora", weight: "400" },

            callback: (value) => {
              if (!value) {
                return "";
              }
              if (window.innerWidth < 600) {
                return minimizeNumber(value) + y.unitOfMeasurement + " ";
              }
              return numberWithCommas(value) + y.unitOfMeasurement + " ";
            },
          },
          ...y,
        },
        x: {
          stacked,
          beginAtZero: true,
          ticks: {
            maxRotation: 90,
            minRotation: 0,
            padding: 10,
            callback: (_, index) => {
              if (window.innerWidth < 600 && (index + 1) % 2 !== 1) {
                return "";
              }
              return labels[index];
            },
            autoSkip: false,
            color: "#0000004D",
            font: { family: "Lora", weight: "400", size: 12 },
          },
          offset: true,
          grid: {
            offset: false,
            drawTicks: true,
            tickWidth: 1,
            tickColor: "#0000004D",
            borderWidth: 1,
            borderColor: "#0000004D",
            drawOnChartArea: false,
          },
        },
      },
    };
    return { labels, datasets: _datasets, options: _options, colors };
  }, [chartData]);
}

function textWrapLabel(label) {
  if (label.length > 16) {
    return label.split(" ").reduce((acc, next, index) => {
      if (index && next.length < 4) {
        acc[index - 1] = acc[index - 1] + " " + next;
      } else {
        acc.push(next);
      }
      return acc;
    }, []);
  }
  return label;
}
