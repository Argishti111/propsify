import { SET_COMPARE_OPEN } from "../types";

export const setCompareOpen = (open) => {
  return {
    type: SET_COMPARE_OPEN,
    payload: { open },
  };
};
