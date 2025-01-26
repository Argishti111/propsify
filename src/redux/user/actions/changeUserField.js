import { CHANGE_USER_FIELD } from "../types";

export const changeUserField = (key, value) => {
  return {
    type: CHANGE_USER_FIELD,
    payload: { [key]: value },
  };
};
