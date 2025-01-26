import { SET_CITY } from "../types";

export const setCity = (city) => {
  return {
    type: SET_CITY,
    payload: {
      city: { id: city.id, name: city.name, index: city.index },
      zipCode: { id: "", code: "All ZIP Codes" },
    },
  };
};
