import axios from "axios";
import { HOST } from "./serviceConfig";

export function uploadPrintCampaignRecipients({ file, id }) {
  let formData = new FormData();
  formData.append("file", file);
  return axios
    .post(`${HOST}/PrintMarketing/UploadRecipient/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);
}

export function addPrintCampaign() {
  return axios.get(`${HOST}/addprintcampaign`).then((res) => {
    return res.data;
  });
}

export function getUploadedPrintRecipient(id) {
  return axios
    .get(`${HOST}/PrintMarketing/PrintRecipient/${id}`)
    .then((res) => {
      return res.data;
    });
}

export function getPrintCampaignDetails(id) {
  return axios
    .get(`${HOST}/PrintMarketing/PrintCampaignDetails/${id}`)
    .then((res) => {
      return res.data;
    });
}

export function getPrintProducts() {
  return axios.get(`${HOST}/PrintMarketing/PrintProduct`).then((res) => {
    return res.data;
  });
}

export function getPrintCampaigns(data) {
  data.timeZone = new Date().getTimezoneOffset();
  return axios
    .post(`${HOST}/PrintMarketing/PrintCampaign`, data)
    .then((res) => {
      return res.data;
    });
}

export function updatePrintCampaignBudget({ id, productId, name, budget }) {
  return axios
    .post(`${HOST}/PrintMarketing/UpdatePrintCampaignBudget/${id}`, {
      productId,
      name,
      budget,
    })
    .then((res) => {
      return res.data;
    });
}

export function removeArtwork({ id, type }) {
  return axios
    .get(`${HOST}/PrintMarketing/RemoveArtwork/${id}?type=${type}`)
    .then((res) => {
      return res.data;
    });
}

export function uploadFrontArtwork({ file, id }) {
  let formData = new FormData();
  formData.append("file", file);
  return axios
    .post(`${HOST}/PrintMarketing/UploadArtWork/${id}?type=front`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);
}

export function uploadBackArtwork({ file, id }) {
  let formData = new FormData();
  formData.append("file", file);
  return axios
    .post(`${HOST}/PrintMarketing/UploadArtWork/${id}?type=back`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);
}

const statuses = [
  { id: 1, name: "Scheduled" },
  { id: 2, name: "Sending" },
  { id: 3, name: "Completed" },
  { id: 4, name: "Canceled" },
];

export function getPrintCampaignStatuses() {
  return new Promise((resolve) => {
    resolve(statuses);
  });
  return axios.get(`${HOST}/PrintMarketing/Statuses`).then((res) => {
    return res.data;
  });
}

export function getPrintCampaignCount(periodId) {
  return axios
    .get(`${HOST}/PrintMarketing/CampaignsCount?period=${periodId}`)
    .then((res) => {
      return res.data;
    });
}

const periods = [
  { id: "today", name: "Today" },
  { id: "yesterday", name: "Yesterday" },
  { id: "thisWeek", name: "This week" },
  { id: "lastWeek", name: "Last week" },
  { id: "last7Days", name: "Last 7 days" },
  { id: "lastMonth", name: "Last month" },
  { id: "last30Days", name: "Last 30 days" },
  { id: "last3Months", name: "Last 3 months" },
  { id: "thisQuarter", name: "This quarter" },
  { id: "lastQuarter", name: "Last quarter" },
  { id: "thisYear", name: "This year" },
];

export function getPeriods() {
  return new Promise((resolve) => resolve(periods));
}

export function deletePrintCampaignFile(id) {
  return axios
    .delete(`${HOST}/PrintMarketing/DeleteAttachedFile/${id}`)
    .then((res) => {
      return res.data;
    });
}

export function deletePrintCampaign(id) {
  return axios
    .delete(`${HOST}/PrintMarketing/DeleteCampaign/${id}`)
    .then((res) => {
      return res.data;
    });
}

export function cancelPrintCampaign(id) {
  return axios
    .put(`${HOST}/PrintMarketing/CancelCampaign/${id}`)
    .then((res) => {
      return res.data;
    });
}

export function updatePrintCampaignSchedule(id, data) {
  return axios
    .post(`${HOST}/PrintMarketing/UpdatePrintCampaignSchedule/${id}`, data)
    .then((res) => {
      return res.data;
    });
}

export function sendPostcard(id, finalize = false) {
  return axios
    .get(`${HOST}/PrintMarketing/SendPostcard/${id}?finalize=${finalize}`)
    .then((res) => {
      return res.data;
    });
}

export function cloneCampaign(id) {
  return axios
    .get(`${HOST}/PrintMarketing/ClonePrintCampaign/${id}`)
    .then((res) => {
      return res.data;
    });
}

export function downloadFile(url, ext) {
  axios({
    url,
    method: "GET",
    resType: "blob",
  }).then((res) => {
    const url = res.data;
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", undefined);
    link.click();
  });
}

export function downloadPdfProof(id) {
  return axios
    .get(`${HOST}/PrintMarketing/DownloadProof/${id}`)
    .then((res) => res.data);
}

export function downloadProductTemplate(id) {
  axios({
    url: `${HOST}/PrintMarketing/ProductTemplate/${id}`,
    method: "GET",
    resType: "blob",
  }).then((res) => {
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `template.pdf`);
    link.click();
  });
}
