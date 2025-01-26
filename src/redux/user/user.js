import {
  LOGIN,
  SET_USER,
  FETCH_USER,
  REGISTER,
  CHANGE_USER_FIELD,
  PAYMENT,
  SET_CAMPAIGN_ADDED_OR_EDITED,
  CLEAR_ERRORS,
  SET_REGISTER_LOADING,
  SET_USER_COMPANY,
} from "./types";

const initialState = {
  firstName: "",
  lastName: "",
  picture: "",
  email: "",
  citiesSubscribed: [],
  auth: !!localStorage.getItem("token"),
  loginLoading: false,
  loginError: "",
  paymentLoading: false,
  paymentError: "",
  registerLoading: false,
  registerError: "",
  loading: true,
  campaignAddedOrEdited: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_ERRORS:
      return { ...state, loginError: "", registerError: "", paymentError: "" };
    case SET_USER:
      return { ...state, ...action.payload.user };
    case SET_USER_COMPANY:
      return { ...state, company: action.payload.company };
    case CHANGE_USER_FIELD:
      return { ...state, ...action.payload };
    case FETCH_USER:
      return { ...state, ...action.payload };
    case LOGIN:
      return { ...state, ...action.payload };
    case REGISTER:
      return { ...state, ...action.payload };
    case PAYMENT:
      return { ...state, ...action.payload };
    case SET_CAMPAIGN_ADDED_OR_EDITED:
      return {
        ...state,
        campaignAddedOrEdited: Date.now(),
      };
    case SET_REGISTER_LOADING:
      return {
        ...state,
        registerLoading: action.payload.loading,
      };
    default:
      return state;
  }
};

export default reducer;
