import { SET_MODAL_LOADING } from "../types";

export const setEmailCampaignModalLoading = (modalLoading) => {
  return {
    type: SET_MODAL_LOADING,
    payload: {
      modalLoading,
    },
  };
};
