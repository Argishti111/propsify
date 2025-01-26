import { SET_RECIPIENTS_DATA } from "../types";

export const setEmailCampaignRecipientsData = (data) => {
  return {
    type: SET_RECIPIENTS_DATA,
    payload: data,
  };
};
