import { SET_SELLERS_OR_BUYERS_OPEN } from "../types";

export const setFindSellersOrBuyers = ({ open, city, zipCode, sellers }) => {
  return {
    type: SET_SELLERS_OR_BUYERS_OPEN,
    payload: {
      findSellersOrBuyers: {
        open,
        city,
        zipCode,
        sellers,
      },
    },
  };
};
