export const getOrCreateTooltip = (chart, tooltip) => {
  let tooltipEl = chart.canvas.parentNode.querySelector("div");

  if (!tooltipEl) {
    tooltipEl = document.createElement("div");
    tooltipEl.style.opacity = 1;
    tooltipEl.style.pointerEvents = "none";
    tooltipEl.style.position = "absolute";
    // tooltipEl.style.transform = "translate(20%, -50%)";
    tooltipEl.style.transition = "all .1s ease";
    tooltipEl.classList.add("chart-tooltip-text");

    const table = document.createElement("table");
    table.style.margin = "0px";

    tooltipEl.appendChild(table);
    chart.canvas.parentNode.appendChild(tooltipEl);
  }
  return tooltipEl;
};
