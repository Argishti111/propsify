import { getBuyerInsights } from "../../../services";
import { SET_BUYER_INSIGHTS } from "../types";
import { setLoading } from "./setLoading";

export const fetchBuyerInsights = (body) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    getBuyerInsights({
      cityId: body.selectedCity.id,
      zipCodeId: body.selectedZipCode.id,
      periodId: body.selectedPeriod.id,
    })
      .then((data) => {
        let result = {
          city: body.selectedCity,
          zipCode: body.selectedZipCode,
          period: body.selectedPeriod,
          market_grade: data.market_grade,
          likelihood_of_sale: data.likelihood_of_sale,
          data: [],
        };

        result.data = data.data.map((item) => {
          item.data = item.data.map((datapoint) => {
            let a = JSON.parse(datapoint);
            return a;
          });
          return item;
        });
        dispatch(setBuyerInsights(result));
        dispatch(setLoading(false));
      })
      .catch((e) => {
        if (e.message !== "canceled") {
          dispatch(setLoading(false));
        }
      });
  };
};

const setBuyerInsights = (buyerInsights) => {
  return {
    type: SET_BUYER_INSIGHTS,
    payload: {
      buyerInsights,
    },
  };
};
