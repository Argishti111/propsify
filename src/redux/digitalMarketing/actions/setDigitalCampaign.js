import { SET_CAMPAIGN } from "../types";

export const setDigitalCampaign = (campaign) => {
  return {
    type: SET_CAMPAIGN,
    payload: campaign,
  };
};
