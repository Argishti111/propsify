import { SET_RECIPIENT_COUNT } from "../types";

export const setRecipientCount = (recipientCount) => {
  return {
    type: SET_RECIPIENT_COUNT,
    payload: { recipientCount },
  };
};
