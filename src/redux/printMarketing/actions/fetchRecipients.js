import { getUploadedPrintRecipient } from "../../../services";
import { FETCH_RECIPIENTS, DELETE_RECIPIENTS } from "../types";
import { setModalLoading } from "./setModalLoading";

export const fetchRecipients = (id) => {
  return (dispatch, getState) => {
    if (!getState().printMarketing.recipients.length) {
      dispatch(setModalLoading(true));
      getUploadedPrintRecipient(id)
        .then((data) => {
          dispatch(setRecipients(data));
        })
        .catch(() => {})
        .finally(() => {
          dispatch(setModalLoading(false));
        });
    }
  };
};

const setRecipients = (payload) => {
  if (!payload.fileName) {
    payload.recipientsUploaded = false;
  }
  return {
    type: FETCH_RECIPIENTS,
    payload,
  };
};

export const deleteRecipients = () => {
  return {
    type: DELETE_RECIPIENTS,
  };
};
