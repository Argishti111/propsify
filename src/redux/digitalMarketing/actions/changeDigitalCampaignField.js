import { CHANGE_DIGITAL_CAMPAIGN_FIELD } from "../types";

export const changeDigitalCampaignField = (key, value) => {
  return {
    type: CHANGE_DIGITAL_CAMPAIGN_FIELD,
    payload: { [key]: value },
  };
};
