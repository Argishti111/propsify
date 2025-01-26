import { SET_ZIP_CODE } from "../types";

export const setZipCode = (zipCode) => {
  return {
    type: SET_ZIP_CODE,
    payload: { city: zipCode.city, zipCode },
  };
};
