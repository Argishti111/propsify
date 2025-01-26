import { Box, Grid, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { getCancelationReasons } from "../../../../services";
import { PageTitle } from "../../../../shared/components/Titles";
import { useStackNavigation } from "../../../../shared/hooks";
import { Campaigns, Details, Feedback, Review } from "./nestedPages";

export const NavigationContext = React.createContext();

export function CancelSubscription({
  onClose,
  onCancel,
  nextBillingDate,
  plan,
  planDescription,
}) {
  const { Component, ...rest } = useStackNavigation([
    Feedback,
    Details,
    Campaigns,
    Review,
  ]);
  const [reasons, setReasons] = useState([]);
  const [selectedReasons, setSelectedResons] = useState([]);

  useEffect(() => {
    fetchCancelationReasons();
  }, []);

  const fetchCancelationReasons = useCallback(() => {
    getCancelationReasons().then((res) => {
      setReasons(res);
    });
  }, []);

  return (
    <NavigationContext.Provider
      value={{
        plan,
        planDescription,
        onClose,
        ...rest,
      }}
    >
      <Grid paddingX={2} borderBottom="1px solid #d8cfb4">
        <PageTitle>CANCEL PLAN</PageTitle>
      </Grid>
      <Grid
        fullWidth
        item
        gap={0.5}
        py={{ md: 4, sm: 2, xs: 2 }}
        px={{ md: 1, sm: 0.5, xs: 0.5 }}
        position="relative"
      >
        <Component
          reasons={reasons}
          nextBillingDate={nextBillingDate}
          onCancel={onCancel}
          onReasonSelect={setSelectedResons}
          selectedReasons={selectedReasons}
        />
      </Grid>
    </NavigationContext.Provider>
  );
}
