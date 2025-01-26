import { SET_TEMPLATE } from "../types";

export const setEmailTemplate = (template) => {
  return {
    type: SET_TEMPLATE,
    payload: { template },
  };
};
