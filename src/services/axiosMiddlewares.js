import axios from "axios";
import { Service } from "axios-middleware";
import store, { changeUserField } from "../redux";
const service = new Service(axios);

service.register({
  onRequest(config) {
    config.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
    return config;
  },
  onResponse(res) {
    const token = localStorage.getItem("token");
    if (res.headers["auth"] && token) {
      localStorage.setItem("token", res.headers["auth"]);
    }
    return res;
  },
  onResponseError(error) {
    if (error && error.response && error.response.status === 401) {
      if (localStorage.getItem("token")) {
        localStorage.clear();
      }
      store.dispatch(changeUserField("auth", false));
    }
    if (error && error.response && error.response.status === 402) {
      store.dispatch(changeUserField("auth", false));
      store.dispatch(changeUserField("hasPayment", false));
    }
    throw error;
  },
});
