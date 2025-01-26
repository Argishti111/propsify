import axios from "axios";
import { loginEvent } from "../shared/analytics/google/events";
import { formatPhone } from "../shared/helpers";
import { HOST } from "./serviceConfig";

export function getUser() {
  return axios.get(`${HOST}/userProfile`).then((res) => res.data);
}

export function login(data) {
  localStorage.clear();
  return axios
    .post(`${HOST}/login`, data, {
      withCredentials: true,
    })
    .then((res) => {
      if (res.headers["auth"]) {
        localStorage.setItem("token", res.headers["auth"]);
      }
      loginEvent(res.data);
      return res.data;
    });
}

export function createPayment(data) {
  return axios
    .post(`${HOST}/Payment/CreatePayment`, data)
    .then((res) => res.data);
}
export function updatePaymentMethod(data) {
  return axios
    .post(`${HOST}/Payment/UpdatePaymentMethod`, data)
    .then((res) => res.data);
}

export function addPayment(data) {
  return axios.post(`${HOST}/AddPayment`, data).then((res) => res.data);
}

export function getSubscriptionPlans() {
  return axios.get(`${HOST}/Payment/SubscriptionPlans`).then((res) => res.data);
}

export function getCardDetails() {
  return axios.get(`${HOST}/Payment/GetCardDetails`).then((res) => {
    if (res.data.expMonth && res.data.expYear)
      res.data.expDate = `${res.data.expMonth}/${res.data.expYear % 100}`;
    if (res.data.number) res.data.number = " **** **** **** " + res.data.number;

    return res.data;
  });
}

export function getSubscriptionDetails() {
  return axios
    .get(`${HOST}/Payment/SubscriptionDetails`)
    .then((res) => res.data);
}

export function register(data) {
  return axios.post(`${HOST}/register`, data).then((res) => {
    if (res.headers["auth"]) {
      localStorage.setItem("token", res.headers["auth"]);
    }
    return res.data;
  });
}

export function sendPasswordRecover(email) {
  return axios
    .post(`${HOST}/forgotPassword`, { email })
    .then((res) => res.data);
}

export function recoverPassword(password, token) {
  return axios
    .post(`${HOST}/PasswordRecovery`, { password, token })
    .then((res) => res.data);
}

export function getUserCompany() {
  return axios.get(`${HOST}/GetUserCompany`).then((res) => {
    res.data.phone = formatPhone(res.data.phone);
    return res.data;
  });
}

export function editCompany(data) {
  return axios.post(`${HOST}/EditCompany`, data).then((res) => {
    return res.data;
  });
}

export function uploadCompanyLogoForReport({ file }) {
  let formData = new FormData();
  formData.append("file", file);
  return axios
    .post(`${HOST}/marketinsights/Export/logo`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);
}

export function uploadCompanyLogo({ file }) {
  let formData = new FormData();
  formData.append("file", file);
  return axios
    .post(`${HOST}/UploadCompanyLogo`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);
}

export function removeCompanyLogo() {
  return axios.get(`${HOST}/RemoveCompanyLogo`).then((res) => res.data);
}

export function uploadProfilePicture({ file }) {
  let formData = new FormData();
  formData.append("file", file);
  return axios
    .post(`${HOST}/UploadProfilePicture`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);
}
export function removeProfilePicture() {
  return axios.get(`${HOST}/RemoveProfilePicture`).then((res) => res.data);
}

let abortController;
export function editUserProfile(data) {
  if (abortController) {
    abortController.abort();
  }
  abortController = new AbortController();
  return axios
    .post(`${HOST}/EditUserProfile`, data, {
      signal: abortController.signal,
    })
    .then((res) => {
      abortController = null;
      return res.data;
    });
}

export function editUserPassword(oldPassword, newPassword) {
  return axios
    .post(`${HOST}/EditPassword`, { oldPassword, newPassword })
    .then((res) => res.data);
}

export function editUserEmail(oldPassword, email) {
  return axios
    .post(`${HOST}/EditEmail`, { oldPassword, email })
    .then((res) => res.data);
}

export function checkEmailAccess(email) {
  return axios
    .get(`${HOST}/CheckEmailAccess?email=${email}`)
    .then((res) => res.data);
}

export function joinTheWaitlist(email) {
  return axios
    .get(`${HOST}/JoinWaitList?email=${email}`)
    .then((res) => res.data);
}

export function getCancelationReasons() {
  return axios.get(`${HOST}/cancellationReasoms`).then((res) => res.data);
}

export function cancelSubscription(reasons) {
  return axios
    .get(`${HOST}/Payment/CancelSubscription?reasons=${reasons.toString()}`)
    .then((res) => res.data);
}

export function checkRecoveryToken(token) {
  return axios
    .get(`${HOST}/PasswordRecoveryCheck?token=${token}`)
    .then((res) => res.data);
}
