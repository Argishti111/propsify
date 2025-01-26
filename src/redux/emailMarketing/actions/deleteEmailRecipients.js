import { DELETE_RECIPIENTS } from "../types";

export const deleteEmailRecipients = () => {
  return {
    type: DELETE_RECIPIENTS,
  };
};
