import { getEmailCampaignCount } from "../../../services";
import store from "../../store";
import { FETCH_CAMPAIGN_COUNT } from "../types";

export const fetchEmailCampaignCount = () => {
  return (dispatch) => {
    const periodId = store.getState().emailMarketing.selectedPeriod.id ?? "";
    getEmailCampaignCount(periodId)
      .then((data) => {
        dispatch(setCampaignCount(data));
      })
      .catch(() => {});
  };
};

const setCampaignCount = (payload) => {
  return {
    type: FETCH_CAMPAIGN_COUNT,
    payload,
  };
};
