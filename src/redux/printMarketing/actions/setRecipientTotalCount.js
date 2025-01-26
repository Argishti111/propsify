import { SET_RECIPIENT_TOTAL_COUNT } from "../types";

export const setRecipientTotalCount = (recipientTotalCount) => {
  return {
    type: SET_RECIPIENT_TOTAL_COUNT,
    payload: { recipientTotalCount },
  };
};
