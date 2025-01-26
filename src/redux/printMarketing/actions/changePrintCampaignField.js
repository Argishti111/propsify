import { CHANGE_PRINT_CAMPAIGN_FIELD } from "../types";

export const changePrintCampaignField = (key, value) => {
  return {
    type: CHANGE_PRINT_CAMPAIGN_FIELD,
    payload: { [key]: value },
  };
};
