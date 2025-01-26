import { minimizeNumber } from "../../../../helpers";
import { getOrCreateTooltip } from "./getOrCreateTooltip";

export const externalTooltipHandler = (context) => {
  // Tooltip Element
  const { chart, tooltip } = context;
  const color = tooltip.labelColors[0].backgroundColor;
  const tooltipEl = getOrCreateTooltip(chart, tooltip);

  // Hide if no tooltip
  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = 0;
    return;
  }

  ///
  // Set Text
  let tooltipWidth = 0;
  if (tooltip.body) {
    const bodyLines = tooltip.body.map((b) => b.lines);

    const tableBody = document.createElement("tbody");
    bodyLines.forEach((body) => {
      const tr = document.createElement("tr");
      tr.style.backgroundColor = "inherit";
      tr.style.borderWidth = 0;
      tr.style.display = "inline-block";
      const td = document.createElement("td");
      td.style.borderWidth = 0;
      let [displayValue, value] = body[0].split(": ");

      let numberValue = +value.replaceAll(",", "");

      let textValue = displayValue
        .replace("-", minimizeNumber(numberValue))
        .replace(/ /g, "\u00a0");
      const text = document.createTextNode([textValue]);
      td.style.whiteSpace = "nowrap";
      td.appendChild(text);
      // tr.appendChild(td2);
      tr.appendChild(td);
      tableBody.style.overflow = "hidden";
      tableBody.style.background = "#f5f6f5";
      tableBody.style.borderRadius = "12px";
      tableBody.style.padding = "0 4px";
      tableBody.style.width = "100%";

      // tableBody.style.width = "100px";

      tableBody.appendChild(tr);
    });

    const tableRoot = tooltipEl.querySelector("table");
    tableRoot.style.position = "relative";
    // Remove old children
    while (tableRoot.firstChild) {
      tableRoot.firstChild.remove();
    }

    // Add new children
    tableRoot.appendChild(tableBody);
  }

  tooltipWidth = tooltipEl.getBoundingClientRect().width;
  const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;
  // tooltipEl.style.width = "fit-content";

  // Display, position, and set styles for font
  tooltipEl.style.opacity = 1;
  tooltipEl.style.left = positionX + tooltip.caretX + "px";
  tooltipEl.style.top = positionY + tooltip.caretY + "px";
  tooltipEl.style.font = tooltip.options.bodyFont.string;
  tooltipEl.style.padding =
    tooltip.options.padding + "px " + tooltip.options.padding + "px";

  // check if the tooltip goes out of window
  if (window.innerWidth - chart.tooltip.caretX < tooltipWidth + 100) {
    tooltipEl.style.transform = "translate(-100%, -12px)";
    tooltipEl.style.marginLeft = "-20px";
    tooltipEl.setAttribute("data-end", true);
  } else {
    tooltipEl.style.transform = `translateY(-12px)`;
    tooltipEl.style.marginLeft = "18px";
    tooltipEl.setAttribute("data-end", false);
  }
};
