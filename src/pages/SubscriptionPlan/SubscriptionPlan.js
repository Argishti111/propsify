import { Grid, Typography, Box } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { getSubscriptionDetails } from "../../services";
import {
  CustomButton,
  TitleWithEdit,
  TitleWithSubtitle,
} from "../../shared/components";
import { PageTitle } from "../../shared/components/Titles";
import { useQuery } from "../../shared/hooks";
import { CancelSubscription, PaymentMethodModal } from "./components";

export function SubscriptionPlan() {
  const query = useQuery();
  const [changeCardOpen, setChangeCardOpen] = useState(
    query.get("changeCard") === "true"
  );
  const [cancelSubscriptionOpen, setCancelSubscriptionOpen] = useState(false);
  const [details, setDetails] = useState({
    startBillingDate: "-",
    price: "-",
    period: "-",
    plan: "-",
    paymentMethod: "-",
    nextBillingDate: "-",
  });

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = useCallback(() => {
    getSubscriptionDetails().then((data) => {
      setDetails(data);
    });
  }, []);

  const toggleCancelSubscriptionOpen = useCallback(() => {
    setCancelSubscriptionOpen((prev) => !prev);
  }, []);
  return cancelSubscriptionOpen ? (
    <CancelSubscription
      onCancel={fetchDetails}
      onClose={toggleCancelSubscriptionOpen}
      nextBillingDate={details.nextBillingDate}
      plan={details.plan}
      planDescription={`${details.plan} plan - ${details.price}/${details.period}`}
    />
  ) : (
    <>
      <Grid px={2} borderBottom="1px solid #d8cfb4">
        {changeCardOpen && (
          <PaymentMethodModal
            onSubmit={fetchDetails}
            price={`${details.price}/${details.period}`}
            open={changeCardOpen}
            onClose={() => setChangeCardOpen(false)}
          />
        )}
        <PageTitle>SUBSCRIPTION PLAN</PageTitle>
      </Grid>
      <Grid
        fullWidth
        item
        gap={0.5}
        display="flex"
        flexDirection="column"
        height="calc(100vh - 216px)"
        p={{ md: 4, sm: 2, xs: 2 }}
        overflow="auto !important"
      >
        <Typography variant="subtitle2" fontStyle="italic">
          Member since {details.startBillingDate}
        </Typography>
        <Typography mt={4} variant="subtitle2" fontStyle="italic">
          Plan
        </Typography>
        <Typography variant="body1">
          {details.isCanceled
            ? `Your benefits will continue until ${details.nextBillingDate}, after which your card will not be charged`
            : details.plan}
        </Typography>
        <Typography mt={4} variant="subtitle2" fontStyle="italic">
          Price
        </Typography>
        <Typography variant="body1">
          {details.price}/{details.period}
        </Typography>
        <TitleWithEdit
          maxWidth={360}
          mt={4}
          iconStyle={{ marginRight: 24 }}
          title="Payment method"
          type="button"
          onIconClick={() => setChangeCardOpen(true)}
        />
        <Typography variant="body1">{details.paymentMethod ?? "-"}</Typography>

        {/* <TitleWithSubtitle
          mt={4}
          title="Billing ZIP Code"
          subtitle={details.billingZipCode ?? "-"}
          type="button"
        /> */}

        <TitleWithSubtitle
          mt={3.5}
          title="Next billing date"
          subtitle={details.isCanceled ? "-" : details.nextBillingDate}
        />
      </Grid>
      <Box mt={-12} mr={3} alignSelf="flex-end">
        {details.isCanceled ? (
          <CustomButton
            onClick={() => setChangeCardOpen(true)}
            sx={{ px: 4, mt: 4, letterSpacing: "0.08em", height: 32 }}
            color="primary"
            variant="outlined"
          >
            SUBSCRIBE
          </CustomButton>
        ) : (
          <CustomButton
            onClick={toggleCancelSubscriptionOpen}
            sx={{ px: 4, mt: 4, letterSpacing: "0.08em", height: 32 }}
            color="primary"
            variant="outlined"
          >
            CANCEL SUBSCRIPTION
          </CustomButton>
        )}
      </Box>
    </>
  );
}
