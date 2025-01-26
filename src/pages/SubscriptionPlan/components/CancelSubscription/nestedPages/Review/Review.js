import { Box, Typography } from "@mui/material";
import React, { useCallback, useContext, useState } from "react";
import { cancelSubscription } from "../../../../../../services";
import {
  ErrorMessage,
  ModalLoading,
  Success,
} from "../../../../../../shared/components";
import { NavigationContext } from "../../CancelSubscription";
import { PageContainer, PlanDetails } from "../../components";

export function Review({ selectedReasons, onCancel, nextBillingDate }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successOpen, setSuccessOpen] = useState(false);
  const { onClose } = useContext(NavigationContext);

  const handleSubmit = useCallback(() => {
    setLoading(true);
    cancelSubscription(selectedReasons)
      .then((data) => {
        if (data.success) {
          setSuccessOpen(true);
          onCancel();
          setTimeout(() => {
            setSuccessOpen(false);
            onClose();
          }, 3000);
        } else {
          setError(data.errorMessage);
        }
      })
      .catch(() => {
        setError("Couldn't cancel your subscription plan");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <PageContainer
      onNext={handleSubmit}
      secondActionVariant="outlined"
      secondActionStyle={{
        "&:hover": {
          background: "#e55656 !important",
          color: "#fff !important",
        },
        color: "#e55656 !important",
        borderColor: "#e55656",
      }}
      secondActionText="CONFIRM"
    >
      {loading && <ModalLoading />}
      <ErrorMessage
        open={!!error}
        onClose={() => setError("")}
        message={error}
      />
      <Success
        open={successOpen}
        message="Your subscription plan has successfuly canceled"
      />
      <Box display="flex" flexDirection="column">
        <Typography textAlign="center" mt={4} variant="h6" fontStyle="italic">
          Are you sure you want to cancel your subscription?
        </Typography>
        <Box mt={7} alignSelf="center">
          <PlanDetails style={{ marginBottom: 0 }} />
          <Typography mt={2} maxWidth={370} variant="body2">
            Your benefits will continue until {nextBillingDate} after which your
            card will not be charged.
          </Typography>
        </Box>
      </Box>
    </PageContainer>
  );
}
