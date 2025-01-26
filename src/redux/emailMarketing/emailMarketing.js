import {
  CHANGE_EMAIL_CAMPAIGN_FIELD,
  SET_INITIAL,
  SET_MODAL_LOADING,
  SET_CAMPAIGN,
  SET_FILTER,
  FETCH_CAMPAIGN_COUNT,
  SET_RECIPIENTS_DATA,
  DELETE_RECIPIENTS,
  SET_TEMPLATE,
  SET_EMAIL_ADDRESS_MANAGER_OPEN,
  SET_TEMPLATE_MANAGER_OPEN,
} from "./types";

const initialState = {
  campaign: {
    id: 0,
    name: "",
    fromEmail: "",
    fromEmailId: 0,
    senderDisplayName: "",
    subject: "",
    recipients: [],
    template: "",
    selectedTemplate: null,
    selectedRecipientId: 0,
    fileName: "",
    duplicateRecipientsCount: 0,
    uniqueRecipientsCount: 0,
  },
  emailAddressManagerOpen: false,
  templateManagerOpen: false,
  selectedPeriod: { id: "last30Days", name: "Last 30 days" },
  selectedStatus: { id: null, name: "All statuses" },
  campaignCount: 0,
  draftCount: 0,
  isEmpty: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_EMAIL_CAMPAIGN_FIELD:
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
        campaign: {
          ...initialState.campaign,
          ...action.payload,
        },
      };
    case SET_RECIPIENTS_DATA:
      return {
        ...state,
        campaign: { ...state.campaign, ...action.payload },
      };
    case DELETE_RECIPIENTS:
      return {
        ...state,
        campaign: { ...state.campaign, recipients: [] },
      };
    case SET_TEMPLATE:
      return {
        ...state,
        campaign: {
          ...state.campaign,
          template: action.payload.template.content,
          selectedTemplate: action.payload.template,
        },
      };
    case SET_EMAIL_ADDRESS_MANAGER_OPEN:
      return {
        ...state,
        emailAddressManagerOpen: action.payload.open,
      };
    case SET_TEMPLATE_MANAGER_OPEN:
      return {
        ...state,
        templateManagerOpen: action.payload.open,
      };
    default:
      return state;
  }
};

export default reducer;
