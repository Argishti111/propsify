import { SET_CAMPAIGN } from "../types";

export const setPrintCampaign = (campaign) => {
  return {
    type: SET_CAMPAIGN,
    payload: campaign,
  };
};
