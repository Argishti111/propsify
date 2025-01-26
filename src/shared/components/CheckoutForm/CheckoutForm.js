import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { Input, InputWithInfo } from "../Form";
import "./CheckoutForm.css";
import { updatePaymentMethod } from "../../../services";
import { formatExpDate, formatCardNumber } from "../../helpers";
import { ErrorBox } from "../ErrorBox";

export function CheckoutForm({
  loading,
  onSubmit = () => {},
  title = "START FINDING LEADS TODAY",
  titleProps,
  price,
  onDone,
  state,
  onFieldChange,
  setLoading,
}) {
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const [expMonth, expYear] = e.target.expDate.value.split("/");
    setLoading(true);
    setError("");
    await updatePaymentMethod({
      name: e.target.name.value,
      number: e.target.number.value.replaceAll(" ", ""),
      cvc: e.target.cvc.value,
      expMonth: +expMonth,
      expYear: +expYear,
      zip: e.target.zip.value,
    })
      .then((data) => {
        if (data.success) {
          onDone();
          onSubmit(e);
          return;
        }
        setError("Failed to update credit card");
      })
      .catch(() => setError("Failed to update credit card"))
      .finally(() => {
        setLoading(false);
        setTimeout(() => {
          setError("");
        }, 3000);
      });
  };

  return (
    <form style={{ overflowY: "auto" }} onSubmit={handleSubmit}>
      <button id="checkout-form" hidden></button>
      <Box
        mx={2}
        display="flex"
        flexDirection="column"
        alignItems="center"
        className="opacity-500ms-anim"
      >
        <Typography
          fontSize="2.125rem"
          textAlign="center"
          variant="h3"
          fontFamily="MinervaModern-Regular"
          {...titleProps}
        >
          {title}
        </Typography>
        <ErrorBox
          title="Update Error"
          message={error}
          sx={{ width: "100%", maxWidth: 400 }}
          mb={2}
        />
        <Input
          name="name"
          value={state.name}
          required
          onChange={onFieldChange("name")}
          disabled={loading}
          style={{ width: "100%", maxWidth: 400, marginBottom: 5 }}
          label="Name on the card"
        />
        <Input
          name="number"
          value={state.number}
          required
          onChange={(e) => onFieldChange("number")(formatCardNumber(e))}
          disabled={loading}
          style={{ width: "100%", maxWidth: 400, marginBottom: 5 }}
          label="Card Number"
        />
        <Box
          marginBottom={1.2}
          style={{ width: "100%", maxWidth: 400 }}
          display="flex"
          justifyContent="space-between"
        >
          <Box marginRight={1.25} sx={{ width: "100%" }}>
            <InputWithInfo
              name="cvc"
              value={state.cvc}
              required
              onChange={onFieldChange("cvc")}
              fullWidth
              disabled={loading}
              info="Lorem Ipsum s is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
              label="Security code"
            />
          </Box>
          <Box sx={{ width: "100%" }}>
            <Input
              name="expDate"
              fullWidth
              value={state.expDate}
              required
              onChange={(e) => onFieldChange("expDate")(formatExpDate(e))}
              disabled={loading}
              placeholder="MM/YY"
              label="Expiration date"
            />
          </Box>
        </Box>
        <Input
          name="zip"
          value={state.zip}
          onChange={onFieldChange("zip")}
          required
          disabled={loading}
          style={{ width: "100%", maxWidth: 400, marginBottom: 5 }}
          label="Billing ZIP Code"
        />

        <Box
          maxWidth={560}
          marginTop={1}
          display="flex"
          alignItems="center"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Box
            position="relative"
            maxWidth={400}
            marginBottom={3}
            marginLeft="auto"
            marginRight="auto"
            display="flex"
            flexWrap="wrap"
            alignItems="center"
            gap={1}
            justifyContent="space-around"
          >
            <img
              height={20}
              width={62}
              alt=""
              src={require("../../static/images/visa.png")}
            />
            <img
              height={36}
              width={60}
              alt=""
              src={require("../../static/images/mastercard.png")}
            />
            <img
              height={20}
              width={72}
              alt=""
              src={require("../../static/images/amex.png")}
            />
            <img
              height={13}
              width={80}
              alt=""
              src={require("../../static/images/discover.png")}
            />
          </Box>
          <Typography
            textAlign="center"
            maxWidth={400}
            fontSize={12}
            variant="p"
          >
            By clicking "Save", you agree that Propsify will automatically
            continue your membership and charge the membership fee (currently{" "}
            {price}) to your chosen payment method until you cancel. You can
            cancel at any time to avoid future charges.
          </Typography>
        </Box>
      </Box>
    </form>
  );
}
