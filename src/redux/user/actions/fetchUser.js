import { getUser, getUserCompany } from "../../../services";
import { configUserId } from "../../../shared/analytics/google/events";
import { SET_USER, FETCH_USER, SET_USER_COMPANY } from "../types";

export const fetchUser = () => {
  return (dispatch) => {
    dispatch(fetchUserRequest({ loading: true }));
    getUserCompany().then((data) => dispatch(setUserCompany(data)));
    getUser()
      .then((data) => {
        if (!data.auth) {
          localStorage.clear();
          return window.location.reload();
        }
        if (!data.hasPayment) {
          data.auth = false;
        }
        data.citiesSubscribed = data.citiesSubscribed.map((city, index) => {
          city.index = index;
          return city;
        });
        configUserId(data.id);
        dispatch(setUser(data));
      })
      .catch((e) => {
        if (!(e.message.includes("401") || e.message.includes("402"))) {
          dispatch(setUser({ maintenance: true }));
        }
      })
      .finally(() => {
        dispatch(fetchUserRequest({ loading: false }));
      });
  };
};

const fetchUserRequest = (payload) => {
  return {
    type: FETCH_USER,
    payload,
  };
};

export const setUserCompany = (company) => {
  let allFilled = true;
  for (let value of Object.values(company)) {
    if (!value) {
      allFilled = false;
      break;
    }
  }
  company.allFilled = allFilled;
  return {
    type: SET_USER_COMPANY,
    payload: {
      company,
    },
  };
};

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: {
      user,
    },
  };
};
