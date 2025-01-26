import { register } from "../../../services";
import store from "../../store";
import { REGISTER, SET_REGISTER_LOADING } from "../types";

export const fetchRegister = (
  { email, password, firstName, lastName },
  callback
) => {
  return (dispatch) => {
    dispatch(registerRequest());
    register({ email, password, firstName, lastName })
      .then((res) => {
        if (res.success) {
          dispatch(registerSuccess(res.data));
          setTimeout(() => {
            callback(res);
          }, 100);
          return;
        }
        dispatch(registerFail(res.errorMessage));
      })
      .catch((e) => {
        dispatch(registerFail("Failed to sign up"));
      });
  };
};

export const setRegisterLoading = (loading) => {
  return {
    type: SET_REGISTER_LOADING,
    payload: { loading },
  };
};
const registerRequest = () => {
  return {
    type: REGISTER,
    payload: {
      registerLoading: true,
      registerError: false,
    },
  };
};

const registerFail = (errorMessage) => {
  return {
    type: REGISTER,
    payload: {
      auth: false,
      registerLoading: false,
      registerError: errorMessage,
    },
  };
};

const registerSuccess = (data) => {
  return {
    type: REGISTER,
    payload: {
      registerLoading: false,
      hasPayment: true,
      ...data,
    },
  };
};
