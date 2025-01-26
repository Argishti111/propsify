import {
  SET_PRINT_PRODUCT_ID,
  SET_RECIPIENT_COUNT,
  SET_RECIPIENTS_UPLOADED,
  SET_RECIPIENT_TOTAL_COUNT,
  DELETE_RECIPIENTS,
  SET_FILTER,
  SET_CAMPAIGN_NAME,
  SET_CAMPAIGN,
  FETCH_RECIPIENTS,
  SET_MODAL_LOADING,
  SET_INITIAL,
  CHANGE_PRINT_CAMPAIGN_FIELD,
  SET_PRINT_PRODUCT,
  FETCH_CAMPAIGN_COUNT,
} from "./types";

const initialState = {
  recipients: [],
  fileName: "",
  recipientCount: 0,
  recipientTotalCount: 0,
  recipientsUploaded: false,
  campaignName: "",
  selectedPeriod: { id: "last30Days", name: "Last 30 days" },
  selectedStatus: { id: null, name: "All statuses" },
  selectedCampaign: { id: null },
  campaignCount: 0,
  draftCount: 0,
  testCount: 0,
  isEmpty: false,
  campaignAddedOrEdited: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CAMPAIGN_NAME:
      return {
        ...state,
        ...action.payload,
      };
    case CHANGE_PRINT_CAMPAIGN_FIELD:
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
    case SET_RECIPIENT_TOTAL_COUNT:
      return { ...state, ...action.payload };
    case SET_RECIPIENT_COUNT:
      return { ...state, ...action.payload };
    case SET_RECIPIENTS_UPLOADED:
      return { ...state, ...action.payload };
    case SET_PRINT_PRODUCT_ID:
      return { ...state, ...action.payload };
    case SET_PRINT_PRODUCT:
      return { ...state, ...action.payload };
    case SET_MODAL_LOADING:
      return { ...state, ...action.payload };
    case FETCH_RECIPIENTS:
      return { ...state, ...action.payload };
    case DELETE_RECIPIENTS:
      return { ...state, recipients: [], fileName: "" };
    case SET_CAMPAIGN:
      return { ...state, ...action.payload };
    case SET_INITIAL:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
