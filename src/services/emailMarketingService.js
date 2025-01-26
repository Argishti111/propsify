import axios from "axios";
import { HOST } from "./serviceConfig";

export function emailSendingIsBlockedCheck() {
  return axios
    .get(`${HOST}/EmailMarketing/emailSendingIsBlocked`)
    .then((res) => {
      return res.data;
    });
}

export function getEmailCampaignCount(periodId) {
  return axios
    .get(`${HOST}/EmailMarketing/CampaignsCount?period=${periodId}`)
    .then((res) => {
      return res.data;
    });
}

export function getVerifiedSenderEmails() {
  return axios.get(`${HOST}/EmailMarketing/VerifiedEmails`).then((res) => {
    return res.data;
  });
}

export function sendVerificationRequest(email) {
  return axios
    .get(`${HOST}/EmailMarketing/EmailVerificationRequest?email=${email}`)
    .then((res) => {
      return res.data;
    });
}

export function addEmailCampaign() {
  return axios.get(`${HOST}/EmailMarketing/AddEmailCampaign`).then((res) => {
    return res.data;
  });
}

export function updateEmailCampaignSettings(data) {
  return axios
    .put(`${HOST}/EmailMarketing/UpdateCampaignSettings`, data)
    .then((res) => {
      return res.data;
    });
}

export function uploadEmailCampaignRecipients({ file, id }) {
  let formData = new FormData();
  formData.append("file", file);
  return axios
    .post(`${HOST}/EmailMarketing/UploadRecipient/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);
}

export function deleteEmailCampaignRecipientFile(id) {
  return axios
    .delete(`${HOST}/EmailMarketing/DeleteAttachedRecipientFile/${id}`)
    .then((res) => {
      return res.data;
    });
}

export function getEmailRecipients(id) {
  return axios
    .get(`${HOST}/EmailMarketing/EmailRecipients/${id}`)
    .then((res) => {
      return res.data;
    });
}

export function getTemplateLibraryData() {
  return axios.get(`${HOST}/EmailMarketing/TemplateLibrary`).then((res) => {
    return res.data;
  });
}

export function getMyTemplates() {
  return axios.get(`${HOST}/EmailMarketing/MyTemplates`).then((res) => {
    return res.data;
  });
}

export function sendTestEmail(data) {
  return axios
    .post(`${HOST}/EmailMarketing/SendTestEmail`, data)
    .then((res) => res.data);
}

export function getRemainedEmails() {
  return axios
    .get(`${HOST}/EmailMarketing/EmailsRemained`)
    .then((res) => res.data);
}

export function getEmailCampaigns(data) {
  data.timeZone = new Date().getTimezoneOffset();
  return axios
    .post(`${HOST}/EmailMarketing/Campaigns`, data)
    .then((res) => res.data);
}

export function getEmailDraftCampaigns(data) {
  return axios
    .post(`${HOST}/EmailMarketing/DraftCampaigns`, data)
    .then((res) => res.data);
}

export function getEmailCampaignDetails(id) {
  return axios
    .get(`${HOST}/EmailMarketing/CampaignDetails/${id}`)
    .then((res) => {
      return res.data;
    });
}

export function updateEmailCampaignTemplate(id, text) {
  const config = { headers: { "Content-Type": "application/json" } };
  return axios
    .put(`${HOST}/EmailMarketing/UpdateCampaignTemplate/${id}`, text, config)
    .then((res) => res.data);
}

export function updateEmailCampaignSchedule(id, datetime) {
  return axios
    .put(
      `${HOST}/EmailMarketing/UpdateCampaignSchedule/${id}?scheduleDate=${datetime}`
    )
    .then((res) => res.data);
}

export function getAllSendersEmails() {
  return axios.get(`${HOST}/EmailMarketing/AllEmails`).then((res) => res.data);
}

export function deleteSendersEmail(id) {
  return axios
    .delete(`${HOST}/EmailMarketing/DeleteEmail/${id}`)
    .then((res) => res.data);
}

export function deleteEmailCampaign(id) {
  return axios
    .delete(`${HOST}/EmailMarketing/DeleteCampaign/${id}`)
    .then((res) => res.data);
}

export function cancelEmailCampaign(id) {
  return axios
    .get(`${HOST}/EmailMarketing/CancelCampaign/${id}`)
    .then((res) => res.data);
}

export function cloneEmailCampaign(id) {
  return axios
    .get(`${HOST}/EmailMarketing/clonecampaign/${id}`)
    .then((res) => res.data);
}

export function pauseEmailCampaign(id) {
  return axios
    .get(`${HOST}/EmailMarketing/pausecampaign/${id}`)
    .then((res) => res.data);
}

export function resumeEmailCampaign(id) {
  return axios
    .get(`${HOST}/EmailMarketing/resumecampaign/${id}`)
    .then((res) => res.data);
}

export function downloadOptOutList(id) {
  return axios({
    url: `${HOST}/EmailMarketing/DownloadOptOutList/${id}`,
    method: "GET",
    resType: "blob",
  }).then((res) => {
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `opt-out list ${new Date().toDateString()}.csv`
    );
    link.click();
  });
}

export function unsubscribeFromEmails(id) {
  return axios
    .get(`${HOST}/EmailMarketing/EmailUnsubscribe?recipientId=${id}`)
    .then((res) => res.data);
}

/** region templates
 *
 */
export function deleteTemplate(id) {
  return axios
    .delete(`${HOST}/EmailMarketing/DeleteTemplate/${id}`)
    .then((res) => res.data);
}

export function createTemplate(data) {
  return axios
    .post(`${HOST}/EmailMarketing/CreateTemplate`, data)
    .then((res) => res.data);
}

export function updateTemplate(data) {
  return axios
    .put(`${HOST}/EmailMarketing/UpdateTemplate/${data.id}`, data)
    .then((res) => res.data);
}

// end
