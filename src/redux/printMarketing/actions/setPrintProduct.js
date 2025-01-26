import { SET_PRINT_PRODUCT } from "../types";

export const setPrintProduct = (product) => {
  return {
    type: SET_PRINT_PRODUCT,
    payload: product,
  };
};
