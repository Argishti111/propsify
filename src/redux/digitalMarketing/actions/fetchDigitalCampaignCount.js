import { getDigitalCampaignCount } from "../../../services";
import store from "../../store";
import { FETCH_CAMPAIGN_COUNT } from "../types";

export const fetchDigitalCampaignCount = () => {
  return (dispatch) => {
    const periodId = store.getState().digitalMarketing.selectedPeriod.id ?? "";
    getDigitalCampaignCount(periodId)
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
