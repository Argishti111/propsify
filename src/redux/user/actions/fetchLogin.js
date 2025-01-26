import { login } from "../../../services";
import { LOGIN } from "../types";

export const fetchLogin = ({ email, password, rememberMe }, callback) => {
  return (dispatch) => {
    dispatch(loginRequest());
    login({ email, password, rememberMe })
      .then((res) => {
        if (res.success) {
          res.data.auth = res.data.hasPayment;
          dispatch(loginSuccess(res.data));

          callback(res);
          return;
        }
        dispatch(loginFail(res.errorMessage));
      })
      .catch((e) => {
        dispatch(loginFail("Failed to sign in"));
      });
  };
};
const loginRequest = () => {
  return {
    type: LOGIN,
    payload: {
      loginLoading: true,
      loginError: false,
    },
  };
};

const loginFail = (errorMessage) => {
  return {
    type: LOGIN,
    payload: {
      auth: false,
      loginLoading: false,
      loginError: errorMessage,
    },
  };
};

const loginSuccess = (data) => {
  return {
    type: LOGIN,
    payload: {
      loginLoading: false,
      ...data,
    },
  };
};
