import { SET_FILTER } from "../types";
/**
 *
 * @param {"selectedPeriod" | "selectedStatus" } key
 * @param {object | string} value
 * @returns {action}
 */
export const setDigitalCampaignFilter = (key, value) => {
  return {
    type: SET_FILTER,
    payload: { [key]: value },
  };
};
