import { Grid, Typography, Slider, Box } from "@mui/material";
import React, { useCallback, useEffect, useState, useMemo } from "react";
import { connect } from "react-redux";
import { setRecipientCount } from "../../../../../../../redux";
import { getRoundedPrice } from "../../../../../../helpers";
import "./CampaignCostContainer.css";
import { CardTitle } from "./components";

let timeout = 0;
const mapStateToProps = (state) => {
  return {
    value: state.printMarketing.recipientCount,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setValue: (recipientCount) => dispatch(setRecipientCount(recipientCount)),
  };
};
export const CampaignCostContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ price, value, setValue, count }) => {
  const [totalPrice, setTotalPrice] = useState(price * value);

  useEffect(() => {
    if (price) {
      if (value === count) {
        return handleChangeValue({ target: { value } });
      }
      let newCount = Math.floor(totalPrice / price);
      if (newCount > count) {
        newCount = count;
      }
      handleChangeValue({ target: { value: newCount } });
    }
  }, [price]);

  const handleChangeValue = useCallback(
    (e) => {
      if (price) {
        let v = e.target.value;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          setTotalPrice(getRoundedPrice(v * price));
          setValue(v);
        }, 0);
      }
    },
    [price, timeout]
  );

  const roundValue = useCallback(() => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setTotalPrice(getRoundedPrice(value * price));
      setValue(value);
    }, 0);
  }, [value, price]);
  const handleChangeInputValue = useCallback(
    (e) => {
      if (price) {
        let v = e.target.value;
        const value = Math.floor(v / price);
        if (value > count) return;
        setTotalPrice(v);
        setValue(value);
      }
    },
    [price, count]
  );
  const defaultValue = useMemo(() => value, []);
  const defaultPrice = useMemo(
    () => (price >= 1 ? `$${price}` : `${price * 100}¢`),
    [price]
  );
  return (
    <Grid
      height={{ md: 136, sm: "auto", xs: "auto" }}
      marginTop={4}
      display="flex"
      gap={1}
      flexWrap={{ md: "nowrap", sm: "wrap", xs: "wrap" }}
    >
      <Grid
        className="campaign-cost-card"
        item
        lg={4}
        xl={4}
        md={6}
        sm={12}
        xs={12}
        sx={{ maxHeight: { md: "none", sm: 64, xs: 64 } }}
      >
        <CardTitle
          infoPosition="right"
          title="Recipients"
          info="Impression, sometimes called a view or an ad view, is a term that refers to the point in which an ad is viewed once by a visitor, or displayed once on a web page."
        />
        <Typography
          textAlign="center"
          mt={{ md: 3, sm: 0, xs: 0 }}
          variant="h5"
          fontStyle="italic"
        >
          {value}/{count}
        </Typography>
      </Grid>
      <Grid
        className="campaign-cost-card"
        item
        lg={4}
        xl={4}
        md={6}
        sm={12}
        xs={12}
        sx={{ maxHeight: { md: "none", sm: 64, xs: 64 } }}
      >
        <CardTitle
          title="Cost per recipient"
          info="Cost per recipient is the cost incurred for each view of the advertisement(s)."
        />

        <Typography
          textAlign="center"
          mt={{ md: 3, sm: 0, xs: 0 }}
          variant="h5"
          fontStyle="italic"
        >
          {defaultPrice}
        </Typography>
      </Grid>
      <Grid
        className="campaign-cost-card"
        item
        lg={4}
        xl={4}
        md={6}
        sm={12}
        xs={12}
        sx={{ maxHeight: { md: "none", sm: 64, xs: 64 } }}
      >
        <CardTitle
          mr={{ md: 0, sm: 1, xs: 1 }}
          title="Campaign total"
          info="The estimated cost of a campaign. This amount includes all currently selected products, services, and options."
        />
        <Box
          width={{ md: "auto", sm: "320px", xs: "210px" }}
          mt={{ md: 0, sm: 2, xs: 2 }}
        >
          <Typography
            border="2px solid #BEB08299"
            textAlign="center"
            mt={{ md: 3, sm: 0, xs: 0 }}
            variant="h5"
            fontStyle="italic"
          >
            <input
              className="camapaign-total-input"
              type="number"
              min={0}
              max={count}
              step={price}
              onBlur={roundValue}
              onChange={handleChangeInputValue}
              value={totalPrice}
            />
          </Typography>
          <Slider
            max={count}
            value={value}
            onChange={handleChangeValue}
            getAriaValueText={(v) => {
              return value;
            }}
            size="small"
            color="info"
            defaultValue={defaultValue}
          />
        </Box>
      </Grid>
    </Grid>
  );
});
