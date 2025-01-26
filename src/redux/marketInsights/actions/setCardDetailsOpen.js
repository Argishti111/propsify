import { SET_CARD_DETAILS_OPEN } from "../types";

export const setCardDetailsOpen = ({ open, selectedCard = {} }) => {
  return {
    type: SET_CARD_DETAILS_OPEN,
    payload: { cardDetailsOpen: open, selectedCard },
  };
};
