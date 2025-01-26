import {
  CHANGE_DIGITAL_CAMPAIGN_FIELD,
  SET_INITIAL,
  SET_MODAL_LOADING,
  SET_CAMPAIGN,
  SET_FILTER,
  FETCH_CAMPAIGN_COUNT,
  SET_BUYERS_KEYWORDS,
  SET_DEFAULT_KEYWORDS,
  SET_SELLERS_KEYWORDS,
  SET_DEFAULT_PLACE,
} from "./types";

const initialState = {
  campaign: {
    id: null,
    name: "",
    saveBusinessName: false,
    website: "",
    saveWebsite: false,
    businessName: "",
    headline1: "",
    headline2: "",
    headline3: "",
    description1: "",
    description2: "",
    country: "US",
    phone: "",
    savePhone: false,
    selectedKeywords: [],
    selectedPlaces: [],
    startDate: new Date(),
    endDate: "",
    runContinously: true,
    ownBudget: "",
    isOwnBudget: false,
    selectedBudget: {
      id: 2,
      price: "$15.00",
      value: 15.0,
      recomended: true,
    },
  },
  selectedPeriod: { id: null, name: "All dates" },
  selectedStatus: { id: null, name: "All statuses" },
  defaultBuyersKeywords: [
    { resourceName: 1, displayName: "houses for sale", userDefined: true },
    { resourceName: 2, displayName: "properties for sale", userDefined: true },
    { resourceName: 3, displayName: "real estate agent", userDefined: true },
    { resourceName: 4, displayName: "mls", userDefined: true },
  ],
  defaultSellersKeywords: [
    { resourceName: 5, displayName: "sell my home", userDefined: true },
    { resourceName: 6, displayName: "real estate agent", userDefined: true },
    { resourceName: 7, displayName: "mls", userDefined: true },
  ],
  defaultKeywords: [
    { resourceName: 8, displayName: "realtor", userDefined: true },
    { resourceName: 9, displayName: "real estate agent", userDefined: true },
    { resourceName: 10, displayName: "mls", userDefined: true },
  ],
  campaignCount: 0,
  draftCount: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_DIGITAL_CAMPAIGN_FIELD:
      return {
        ...state,
        campaign: {
          ...state.campaign,
          ...action.payload,
        },
      };
    case SET_INITIAL:
      return {
        ...state,
        campaign: initialState.campaign,
      };
    case SET_DEFAULT_PLACE:
      state.campaign.selectedPlaces = [action.payload.place];
      return state;
    case SET_BUYERS_KEYWORDS:
      state.campaign.selectedKeywords = state.defaultBuyersKeywords;
      return state;
    case SET_SELLERS_KEYWORDS:
      state.campaign.selectedKeywords = state.defaultSellersKeywords;
      return state;
    case SET_DEFAULT_KEYWORDS:
      state.campaign.selectedKeywords = state.defaultKeywords;
      return state;
    case SET_MODAL_LOADING:
      return {
        ...state,
        ...action.payload,
      };
    case FETCH_CAMPAIGN_COUNT:
      return {
        ...state,
        ...action.payload,
        isEmpty: !action.payload.existsAny,
      };
    case SET_FILTER:
      return { ...state, ...action.payload };
    case SET_CAMPAIGN:
      return {
        ...state,
        campaign: { ...initialState.campaign, ...action.payload },
      };
    default:
      return state;
  }
};

export default reducer;
