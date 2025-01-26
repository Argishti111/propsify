import { addPayment } from "../../../services";
import store from "../../store";
import { PAYMENT } from "../types";

export const fetchPayment = (
  { cardHolderName, cardNumber, expDate, code, zipCode, planId },
  callback
) => {
  return (dispatch) => {
    dispatch(paymentRequest());
    const [expMonth, expYear] = expDate.split("/");
    addPayment({
      userId: store.getState().user.id,
      planId,
      name: cardHolderName,
      cardNumber,
      expMonth: +expMonth,
      expYear: +expYear,
      cvc: code,
      zipcode: zipCode,
    })
      .then((res) => {
        if (res.success) {
          dispatch(paymentSuccess());
          callback(res);
          window.localStorage.setItem("token", res.data.token);
          window.location.reload();
          return;
        }
        dispatch(paymentFail(res.errorMessage));
      })
      .catch((e) => {
        dispatch(paymentFail("Failed to attach card"));
      });
  };
};
const paymentRequest = () => {
  return {
    type: PAYMENT,
    payload: {
      paymentLoading: true,
      paymentError: false,
    },
  };
};

const paymentFail = (errorMessage) => {
  return {
    type: PAYMENT,
    payload: {
      auth: false,
      paymentLoading: false,
      paymentError: errorMessage,
    },
  };
};

const paymentSuccess = () => {
  return {
    type: PAYMENT,
    payload: {
      auth: true,
    },
  };
};
