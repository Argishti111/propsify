import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import {
  CheckoutForm,
  Modal,
  StackPagination,
} from "../../../../shared/components";
import { Box } from "@mui/material";
import { getCardDetails } from "../../../../services";
import { removeAllExceptNumbers } from "../../../../shared/helpers";

const initialState = {
  name: "",
  number: "",
  cvc: "",
  expDate: "",
  zip: "",
};

const CHANGE_VALUE = Symbol();
const INIT = Symbol();

const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_VALUE:
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    case INIT:
      return action.payload;

    default:
      return state;
  }
};

export function PaymentMethodModal({ open, onClose, onSubmit, price }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(false);
  const handleSubmit = () => {
    document.getElementById("checkout-form").click();
  };

  useEffect(() => {
    getCardDetails().then((data) => {
      dispatch({ type: INIT, payload: data });
    });
  }, []);

  const handleChange = useCallback((key) => {
    return (e) => {
      dispatch({
        type: CHANGE_VALUE,
        payload: {
          key,
          value: e.target.value,
        },
      });
    };
  }, []);

  const disabled = useMemo(() => {
    if (
      !(state.name && state.number && state.expDate && state.cvc && state.zip)
    ) {
      return true;
    }
    if (removeAllExceptNumbers(state.number).length < 12) {
      return true;
    }
    return false;
  }, [state]);

  return (
    <Modal
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 800, maxWidth: 800 } }}
      maxWidth="lg"
      fullScreenOnSM
      // sx={{ width: "100%" }}
      titleChildren={<div />}
      title=""
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        style={{
          overflow: "hidden",
          minWidth: 300,
          maxWidth: 800,
          height: "calc(100vh - 120px)",
        }}
      >
        <CheckoutForm
          onDone={onClose}
          onSubmit={onSubmit}
          price={price}
          onFieldChange={handleChange}
          state={state}
          loading={loading}
          setLoading={setLoading}
          title="UPDATE YOUR CREDIT OR DEBIT CARD"
          titleProps={{ sx: { mb: 4, width: "100%", maxWidth: 400 } }}
        />
      </Box>
      <StackPagination
        onBack={onClose}
        nextDisabled={disabled || loading}
        onNext={handleSubmit}
        backText="CANCEL"
        nextText="SAVE"
        hideSteps
      />
    </Modal>
  );
}
