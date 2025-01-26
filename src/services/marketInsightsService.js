import axios from "axios";
import { exportReportEvent } from "../shared/analytics/google/events";
import { HOST } from "./serviceConfig";

let abortController = null;

export function getMarketInsights({ cityId, zipCodeId = "", periodId }) {
  if (abortController) {
    abortController.abort();
  }
  abortController = new AbortController();

  return axios
    .get(
      `${HOST}/MarketInsights?cityId=${cityId}&zipcodeId=${zipCodeId}&period=${periodId}`,
      {
        signal: abortController.signal,
      }
    )
    .then((res) => {
      abortController = null;
      return res.data;
    });
}

export function getBuyerInsights({ cityId, zipCodeId = "", periodId }) {
  if (abortController) {
    abortController.abort();
  }
  abortController = new AbortController();

  return axios
    .get(
      `${HOST}/MarketInsights/BuyersInsightsData?cityId=${cityId}&zipcodeId=${zipCodeId}&period=${periodId}`,
      {
        signal: abortController.signal,
      }
    )
    .then((res) => {
      abortController = null;
      return res.data;
    });
}

export function getMetricData({ datapointId, entityId }) {
  return axios
    .get(`${HOST}/MetricData?datapointId=${datapointId}&entityId=${entityId}`)
    .then((res) => {
      return res.data;
    });
}

export function getMarketComparison(data) {
  return axios.post(`${HOST}/MarketComparison`, data).then((res) => res.data);
}

export function exportReport(data) {
  exportReportEvent(
    `${data.entityCity.name} ${data.entityZipCode.code ?? ""}`,
    "market_report"
  );
  data.entityId = data.entityZipCode.id
    ? data.entityZipCode.id
    : data.entityCity.id;
  data.entityZipCode = data.entityZipCode.code;
  data.entityCityName = data.entityCity.name;

  delete data.entityCity;

  return axios({
    url: `${HOST}/ExportReport`,
    method: "POST",
    data,
  }).then((res) => {
    const link = document.createElement("a");
    link.href = res.data.data.downloadUrl;
    link.setAttribute("download", undefined);
    // link.target = "_blank";
    link.click();

    return res.data;
  });
}

// home

export function getCitiesMarketInsights() {
  return axios
    .get(`${HOST}/MarketInsights/MarketInsightsHome`, { timeout: 80000 })
    .then((res) => {
      return res.data;
    });
}

export function getLeadGenerationCounts() {
  return axios.get(`${HOST}/ppc/CampaignsStat`).then((res) => res.data);
}
