import { SET_MODAL_LOADING } from "../types";

export const setDigitalCampaignModalLoading = (modalLoading) => {
  return {
    type: SET_MODAL_LOADING,
    payload: {
      modalLoading,
    },
  };
};
