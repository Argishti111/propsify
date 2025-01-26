import { SET_COMPARISON_OPEN } from "../types";

export const setComparisonOpen = ({ open, selectedPlaces = [] }) => {
  return {
    type: SET_COMPARISON_OPEN,
    payload: { comparisonOpen: open, selectedPlaces },
  };
};
