import { SET_CAMPAIGN_NAME } from "../types";

export const setCampaignName = (campaignName) => {
  return {
    type: SET_CAMPAIGN_NAME,
    payload: { campaignName },
  };
};
