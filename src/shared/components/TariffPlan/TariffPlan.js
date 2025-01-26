import { Box, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { NavItem } from "..";
import { getSubscriptionPlans } from "../../../services";
import "./TariffPlan.css";

export function TariffPlan({
  containerClassName = "",
  subscriptionPlan,
  setSubscriptionPlan,
  disabled,
}) {
  const [subscriptionPlans, setSubscriptionPlans] = useState([]);
  useEffect(() => {
    fetchSubscriptionPlans();
  }, []);

  const fetchSubscriptionPlans = useCallback(() => {
    getSubscriptionPlans()
      .then((data) => {
        setSubscriptionPlans(data);
        setSubscriptionPlan(data[0]);
      })
      .catch(() => {
        window.location.reload();
      });
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      marginTop={2.5}
      marginBottom={4}
      className={`tariff-plan ${containerClassName}`}
    >
      <Box height={34}>
        {subscriptionPlans.map((sp, index) => {
          return (
            <NavItem
              key={sp.id}
              disabled={disabled}
              to={`/${sp.name}`}
              onClick={(e) => {
                e.preventDefault();
                if (disabled) {
                  return;
                }
                setSubscriptionPlan(sp);
              }}
              style={{ textTransform: "uppercase" }}
              className={`${
                index + 1 !== subscriptionPlans.length
                  ? "top-nav-item-border-right"
                  : ""
              } ${subscriptionPlan.id === sp.id ? "active" : ""} `}
            >
              {sp.name}
            </NavItem>
          );
        })}
      </Box>
      {subscriptionPlan.id && (
        <Box display="flex">
          <Typography variant="h5">{subscriptionPlan.price}</Typography>
          <Typography alignSelf="end" variant="body1">
            /{subscriptionPlan.period}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
