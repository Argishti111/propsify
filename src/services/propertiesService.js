import axios from "axios";
import { exportReportEvent } from "../shared/analytics/google/events";
import { HOST } from "./serviceConfig";

export function getPropertyAddresses(value) {
  return axios
    .get(`${HOST}/MarketInsights/propertySearch?searchText=${value}`)
    .then((res) => res.data);
}

export function getPropeties(filters) {
  return axios
    .post(`${HOST}/MarketInsights/properties`, filters)
    .then((res) => res.data);
}

export function getPropertyDetails(id) {
  return axios
    .get(`${HOST}/MarketInsights/propertyDetails?searchText=${id}`)
    .then((res) => res.data);
}

export function exportPropertyReport(data) {
  exportReportEvent(`${data.entityCity?.name ?? ""} `, "property_report");
  data.entityId = data.entityCity.id;
  data.entityCityName = data.entityCity.name;
  data.entityZipCode = "";
  delete data.entityCity;
  return axios
    .post(`${HOST}/propertyReportExport?searchText=${data.propertyId}`, data)
    .then((res) => {
      const link = document.createElement("a");
      link.href = res.data.data.downloadUrl;
      link.setAttribute("download", undefined);
      // link.target = "_blank";
      link.click();

      return res.data;
    });
}
