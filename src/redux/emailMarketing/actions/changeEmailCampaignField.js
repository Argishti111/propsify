import { CHANGE_EMAIL_CAMPAIGN_FIELD } from "../types";

export const changeEmailCampaignField = (key, value) => {
  return {
    type: CHANGE_EMAIL_CAMPAIGN_FIELD,
    payload: { [key]: value },
  };
};
