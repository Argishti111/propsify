import axios from "axios";
import { HOST } from "./serviceConfig";
import { formatPhone } from "../shared/helpers";

export function googleAdsLogin() {
  return axios.get(`${HOST}/ppc/googleAdsLogin`).then((res) => {
    return res.data;
  });
}

export function connectGoogleAccount() {
  return window.open(
    `${HOST}/ppc/googleAdsLogin`,
    "popup",
    `width=600,height=600,left=${window.screen.width / 2 - 300},top=200`
  );
}

export function listAccessibleCustomers(token) {
  return axios
    .get(`${HOST}/ppc/listAccessibleCustomers?id=${token}`)
    .then((res) => {
      return res.data;
    });
}

export function addExistingAdAccount(customerId, token) {
  return axios
    .get(`${HOST}/ppc/addExistingAccount?customerId=${customerId}&id=${token}`)
    .then((res) => {
      return res.data;
    });
}

export function addAdAcount(data) {
  return axios.post(`${HOST}/ppc/addAccount`, data).then((res) => res.data);
}

export function unlinkAdAccount(id) {
  return axios
    .get(`${HOST}/ppc/unlinkAccount?id=${id}`)
    .then((res) => res.data);
}

export function getMyAdAccount() {
  return axios.get(`${HOST}/ppc/GetMyAdAccount`).then((res) => res.data);
}

export function getDigitalCampaigns(data) {
  return axios
    .post(`${HOST}/ppc/GetGoogleCampaigns`, data)
    .then((res) => res.data);
}

export function getDigitalDraftCampaigns(data) {
  return axios
    .post(`${HOST}/ppc/GetGoogleDraftCampaigns`, data)
    .then((res) => res.data);
}

export function createGoogleCampaign() {
  return axios.get(`${HOST}/ppc/createGoogleCampaign`).then((res) => res.data);
}

export function updateDigitalCampaignBussiness(id, name, save) {
  return axios
    .put(`${HOST}/ppc/updateBusiness`, { id, businessName: name, save })
    .then((res) => res.data);
}

export function updateDigitalCampaignWebsite(id, name, save) {
  return axios
    .put(`${HOST}/ppc/updateWebsite?id=${id}&website=${name}&save=${save}`)
    .then((res) => res.data);
}

export function updateGoogleAdContent(
  campaignId,
  headline1,
  headline2,
  headline3,
  description1,
  description2,
  country,
  phone,
  savePhone
) {
  return axios
    .put(`${HOST}/ppc/updateContent`, {
      campaignId,
      headline1,
      headline2,
      headline3,
      description1,
      description2,
      country,
      phone: phone?.replaceAll(" ", ""),
      save: savePhone,
    })
    .then((res) => res.data);
}

export function getHeadlineSuggestion(id) {
  return axios
    .get(`${HOST}/ppc/HeadlineSuggestion/${id}`)
    .then((res) => res.data);
}

export function getWebsiteKeywords(campaignId) {
  return axios
    .get(`${HOST}/ppc/smartKeywords/${campaignId}`)
    .then((res) => res.data);
}

export function getSmartKeywords(keyword, showMore) {
  return axios
    .get(
      `${HOST}/ppc/GenerateSmartKeywords?keyword=${keyword}&showMore=${showMore}`
    )
    .then((res) => res.data);
}

export function updateAdKeywords(
  website,
  keywords,
  campaignId,
  customKeywords
) {
  return axios
    .put(`${HOST}/ppc/UpdateSmartKeywords`, {
      website,
      keywords,
      campaignId,
      customKeywords,
    })
    .then((res) => res.data);
}

export function getGeoLocationsByName(name) {
  return axios.get(`${HOST}/ppc/geo?location=${name}`).then((res) => res.data);
}

export function updateLocations(id, locations) {
  return axios
    .put(`${HOST}/ppc/UpdateLocations?id=${id}`, locations)
    .then((res) => res.data);
}

export function getBudgetSuggestion(id) {
  return axios
    .get(`${HOST}/ppc/BudgetSuggestion/${id}`)
    .then((res) => res.data);
}

export function updateBudgetAndDuration(id, budget, startDate, endDate) {
  // startDate = new Date();
  // startDate.setMonth(startDate.getMonth() + 1);
  return axios
    .get(`${HOST}/ppc/UpdateBudgetAndDuration/${id}?budget=${budget}`)
    .then((res) => res.data);
}

export function submitDigitalCampaign(id, name) {
  return axios
    .get(`${HOST}/ppc/AddSmartCampaign/${id}?name=${name}`)
    .then((res) => res.data);
}

export function editDigitalCampaign(id, name) {
  return axios
    .get(`${HOST}/ppc/EditSmartCampaign/${id}?name=${name}`)
    .then((res) => res.data);
}

export function cloneDigitalCampaign(id) {
  return axios
    .get(`${HOST}/ppc/CloneCampaign?id=${id}`)
    .then((res) => res.data);
}

export function changeStatusDigitalCampaign(id, paused) {
  const statusId = paused ? 2 : 3;
  return axios
    .get(`${HOST}/ppc/updateCampaignStatus/${id}?statusId=${statusId}`)
    .then((res) => res.data);
}

export function endDigitalCampaign(id) {
  return axios.get(`${HOST}/ppc/RemoveCampaign/${id}`).then((res) => res.data);
}

export function deleteDigitalCampaign(id) {
  return axios
    .delete(`${HOST}/ppc/RemoveDraftCampaign/${id}`)
    .then((res) => res.data);
}

export function getDigitalCampaignDetails(id) {
  return axios.get(`${HOST}/ppc/GetCampaignDetails?id=${id}`).then((res) => {
    res.data.selectedKeywords = res.data.keywords;
    res.data.selectedPlaces = res.data.locations;
    res.data.country = res.data.countryCode;
    res.data.ownBudget = res.data.budget;
    res.data.selectedBudget = { amount: res.data.budget };
    res.data.phone = formatPhone(res.data.phone);

    return res.data;
  });
}

export function getDigitalDraftCampaignDetails(id) {
  return axios.get(`${HOST}/ppc/GetDraftCampaignDetails/${id}`).then((res) => {
    res.data.selectedKeywords = res.data.keywords;
    res.data.selectedPlaces = res.data.locations;
    res.data.country = res.data.countryCode;
    res.data.ownBudget = res.data.budget;
    res.data.phone = formatPhone(res.data.phone);

    res.data.selectedBudget = { amount: res.data.budget };

    return res.data;
  });
}

export function connectNewGoogleAccount(id) {
  return axios
    .get(`${HOST}/ppc/ConnectNewAccount?accountId=${id}`)
    .then((res) => res.data);
}

export function getDigitalCampaignCount(periodId) {
  return axios
    .get(`${HOST}/ppc/CampaignsCount?period=${periodId}`)
    .then((res) => {
      return res.data;
    });
}

export function screenshotWebsite(website) {
  return axios
    .get(`${HOST}/ppc/WebsiteScreen?website=${website}`)
    .then((res) => res.data);
}

export function getBudgetLimits() {
  return axios.get(`${HOST}/ppc/BudgetLimits`).then((res) => res.data);
}
