import { SET_CAMPAIGN } from "../types";

export const setEmailCampaign = (campaign) => {
  return {
    type: SET_CAMPAIGN,
    payload: campaign,
  };
};
