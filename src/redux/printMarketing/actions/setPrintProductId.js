import { SET_PRINT_PRODUCT_ID } from "../types";

export const setPrintProductId = (productId) => {
  return {
    type: SET_PRINT_PRODUCT_ID,
    payload: { productId },
  };
};
