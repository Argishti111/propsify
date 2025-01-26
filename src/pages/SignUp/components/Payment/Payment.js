import { Box, Typography } from "@mui/material";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router";
import { clearErrors, fetchPayment } from "../../../../redux";
import {
  CustomButton,
  ErrorBox,
  TariffPlan,
} from "../../../../shared/components";
import { Input, InputWithInfo } from "../../../../shared/components/Form";
import {
  formatCardNumber,
  formatExpDate,
  removeAllExceptNumbers,
} from "../../../../shared/helpers";
import {
  useNavigateWithCurrentSearch,
  useQuery,
} from "../../../../shared/hooks";

const mapDispatchToProps = (dispatch) => {
  return {
    clearErrors: () => dispatch(clearErrors()),
    addPayment: (data, callback) => dispatch(fetchPayment(data, callback)),
  };
};

const mapStateToProps = (state) => {
  return {
    id: state.user.id,
    loading: state.user.paymentLoading,
    error: state.user.paymentError,
  };
};

const reducer = (state, action) => {
  switch (action.type) {
    case "change":
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    default:
      return state;
  }
};

export const Payment = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ addPayment, loading, error, clearErrors, id }) => {
  const query = useQuery();
  const navigate = useNavigate();
  const navigateWithCurrentSearch = useNavigateWithCurrentSearch();
  const [subscriptionPlan, setSubscriptionPlan] = useState({});
  const [state, dispatch] = useReducer(reducer, {
    cardHolderName: "",
    cardNumber: "",
    expDate: "",
    code: "",
    zipCode: "",
  });

  useEffect(() => {
    if (!localStorage.getItem("token") && !id) {
      navigateWithCurrentSearch("/sign-in", { replace: true });
    }
    return clearErrors;
  }, []);
  const handleChange = (key) => {
    return (e) => {
      dispatch({ type: "change", payload: { key, value: e.target.value } });
    };
  };

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      state.cardNumber = state.cardNumber.replaceAll(" ", "");
      state.planId = subscriptionPlan.id;
      addPayment(state, () => {
        const returnUrl = query.get("returnUrl");
        if (returnUrl) {
          navigate(returnUrl);
          return;
        }
        navigate("/home");
      });
    },
    [state]
  );

  const disabled = useMemo(() => {
    if (
      !(
        state.cardHolderName &&
        state.cardNumber &&
        state.expDate &&
        state.code &&
        state.zipCode
      )
    ) {
      return true;
    }
    if (removeAllExceptNumbers(state.cardNumber).length < 12) {
      return true;
    }
    return false;
  }, [state]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          className="opacity-500ms-anim"
          px={2}
          py={2}
        >
          <Typography
            fontSize="2.125rem"
            textAlign="center"
            variant="h3"
            fontFamily="MinervaModern-Regular"
          >
            START FINDING LEADS TODAY
          </Typography>

          <TariffPlan
            disabled={loading}
            subscriptionPlan={subscriptionPlan}
            setSubscriptionPlan={setSubscriptionPlan}
          />
          <ErrorBox
            mb={2}
            width={400}
            title="Subscription Error:"
            message={error}
          />
          <Input
            value={state.cardHolderName}
            onChange={handleChange("cardHolderName")}
            disabled={loading}
            style={{ width: "100%", maxWidth: 400, marginBottom: 5 }}
            label="Name on the card*"
          />
          <Input
            value={state.cardNumber}
            onChange={(e) => handleChange("cardNumber")(formatCardNumber(e))}
            disabled={loading}
            style={{ width: "100%", maxWidth: 400, marginBottom: 5 }}
            label="Card Number*"
          />
          <Box
            marginBottom={1.2}
            maxWidth={400}
            width="100%"
            display="flex"
            justifyContent="space-between"
          >
            <Box marginRight={1.25}>
              <InputWithInfo
                value={state.code}
                onChange={handleChange("code")}
                disabled={loading}
                required
                info="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
                label="Security code"
              />
            </Box>
            <Box>
              <Input
                onChange={(e) => handleChange("expDate")(formatExpDate(e))}
                value={state.expDate}
                required
                disabled={loading}
                placeholder="MM/YY"
                label="Expiration date"
              />
            </Box>
          </Box>
          <Input
            onChange={handleChange("zipCode")}
            value={state.zipCode}
            disabled={loading}
            style={{ width: "100%", maxWidth: 400, marginBottom: 5 }}
            label="Billing ZIP Code*"
          />

          <Box
            maxWidth={560}
            width="100%"
            marginTop={1}
            display="flex"
            alignItems="center"
            flexDirection="column"
            justifyContent="space-between"
          >
            <Box
              position="relative"
              maxWidth={400}
              width="100%"
              mb={3}
              ml="auto"
              mr="auto"
              display="flex"
              alignItems="center"
              justifyContent="space-around"
            >
              <img
                height={20}
                width={62}
                alt=""
                src={require("../../../../shared/static/images/visa.png")}
              />
              <img
                height={36}
                width={60}
                alt=""
                src={require("../../../../shared/static/images/mastercard.png")}
              />
              <img
                height={20}
                width={72}
                alt=""
                src={require("../../../../shared/static/images/amex.png")}
              />
              <img
                height={13}
                width={80}
                alt=""
                src={require("../../../../shared/static/images/discover.png")}
              />
            </Box>
            <Typography
              textAlign="center"
              maxWidth={400}
              fontSize={12}
              variant="p"
            >
              By clicking "Agree & Subscribe," you are enrolling in automatic
              payments of the subscription fee (currently&nbsp;
              {subscriptionPlan.price}/{subscriptionPlan.period} (plus tax where
              applicable) that will continue until you cancel. You can cancel at
              any time, through your account settings or by contacting us,
              effective at the end of the relevant billing period. There are no
              refunds or credits for partial months or years.
            </Typography>
          </Box>
          <CustomButton
            disabled={loading || disabled}
            type="submit"
            className="continue-button"
            sx={buttonSX}
          >
            AGREE & SUBSCRIBE
          </CustomButton>
        </Box>
      </form>
    </>
  );
});

const buttonSX = {
  mb: 5,
  fontSize: 20,
  letterSpacing: 2,
  width: "100%",
  maxWidth: 400,
};
