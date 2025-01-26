import { getMarketInsights } from "../../../services";
import { SET_MARKET_INSIGHTS } from "../types";
import { setLoading } from "./setLoading";

export const fetchMarketInsights = (body) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    getMarketInsights({
      cityId: body.selectedCity.id,
      zipCodeId: body.selectedZipCode.id,
      periodId: body.selectedPeriod.id,
    })
      .then((data) => {
        data.city = body.selectedCity;
        data.zipCode = body.selectedZipCode;
        data.period = body.selectedPeriod;
        dispatch(setMarketInsights(data));
        dispatch(setLoading(false));
      })
      .catch((e) => {
        if (e.message !== "canceled") {
          dispatch(setLoading(false));
        }
      });
  };
};

const setMarketInsights = (marketInsights) => {
  return {
    type: SET_MARKET_INSIGHTS,
    payload: {
      marketInsights,
    },
  };
};
