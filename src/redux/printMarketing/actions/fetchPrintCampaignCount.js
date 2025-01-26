import { getPrintCampaignCount } from "../../../services";
import store from "../../store";
import { FETCH_CAMPAIGN_COUNT } from "../types";

export const fetchPrintCampaignCount = () => {
  return (dispatch) => {
    const periodId = store.getState().printMarketing.selectedPeriod.id ?? "";
    getPrintCampaignCount(periodId)
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
