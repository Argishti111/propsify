import store from "../../../redux";
function getUserId() {
  return store.getState().user.id;
}
export function loginEvent(res) {
  window.gtag("event", "login", {
    user_id: res.data.id,
    success: res.success,
  });
}

export function exportReportEvent(address, type) {
  window.gtag("event", "export_report", {
    user_id: getUserId(),
    event_name: "export_report",
    address,
    type,
  });
}

export function configUserId(id) {
  window.gtag("config", process.env.REACT_APP_GTM_ID, {
    user_id: id,
  });
}

export function actionEvent(page_category, page_subcategory, page_title) {
  window.gtag("event", "page_view", {
    user_id: getUserId(),
    event_name: "page_view",
    page_category,
    page_location: window.location.pathname,
    page_title,
    page_subcategory,
  });
}
