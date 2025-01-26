import { SET_RECIPIENTS_UPLOADED } from "../types";

export const setRecipientsUploaded = (recipientsUploaded) => {
  return {
    type: SET_RECIPIENTS_UPLOADED,
    payload: { recipientsUploaded },
  };
};
