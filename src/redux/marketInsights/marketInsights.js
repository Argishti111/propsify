import {
  SET_MARKET_INSIGHTS,
  SET_LOADING,
  SET_CARD_DETAILS_OPEN,
  SET_COMPARISON_OPEN,
  SET_COMPARE_OPEN,
  SET_ZIP_CODE,
  SET_CITY,
  SET_SELLERS_OR_BUYERS_OPEN,
  SET_BUYER_INSIGHTS,
} from "./types";

const initialState = {
  selectedCard: {},
  selectedPlaces: { zipCodes: [], cities: [] },
  cardDetailsOpen: false,
  comparisonOpen: false,
  loading: true,
  findSellersOrBuyers: {
    open: false,
    city: "",
    zipCode: "",
    sellers: true,
  },
  data: {},
  buyerInsights: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MARKET_INSIGHTS:
      return {
        ...state,
        data: action.payload.marketInsights,
        city: action.payload.marketInsights.city,
        zipCode: action.payload.marketInsights.zipCode,
      };
    case SET_BUYER_INSIGHTS:
      return {
        ...state,
        buyerInsights: action.payload.buyerInsights.data,
        data: {
          market_grade: action.payload.buyerInsights.market_grade,
          likelihood_of_sale: action.payload.buyerInsights.likelihood_of_sale,
          city: action.payload.buyerInsights.city,
          zipCode: action.payload.buyerInsights.zipCode,
        },
        city: action.payload.buyerInsights.city,
        zipCode: action.payload.buyerInsights.zipCode,
      };
    case SET_LOADING:
      return { ...state, loading: action.payload.loading };
    case SET_CARD_DETAILS_OPEN:
      return { ...state, ...action.payload };
    case SET_COMPARISON_OPEN:
      return { ...state, ...action.payload };
    case SET_SELLERS_OR_BUYERS_OPEN:
      return { ...state, ...action.payload };
    case SET_COMPARE_OPEN:
      return { ...state, ...action.payload };
    case SET_CITY:
      return { ...state, ...action.payload };
    case SET_ZIP_CODE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default reducer;
