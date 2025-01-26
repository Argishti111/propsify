import { Box, Grid, Typography } from "@mui/material";
import React, { useCallback, useState } from "react";
import { Checkbox } from "../../../../../../shared/components/Form";
import { PageContainer, PlanDetails } from "../../components";

export function Feedback({ reasons, selectedReasons, onReasonSelect, goNext }) {
  const [, forceRender] = useState(false);

  const handleCheck = useCallback((id) => {
    onReasonSelect((prev) => {
      const reasonIndex = prev.findIndex((reasonId) => reasonId === id);
      if (reasonIndex > -1) {
        prev.splice(reasonIndex, 1);
      } else {
        prev.push(id);
      }
      return prev;
    });
    forceRender((prev) => !prev);
  }, []);

  return (
    <PageContainer
      onNext={goNext}
      secondActionDisabled={!selectedReasons.length}
    >
      <Box>
        <Typography textAlign="center" mt={3} variant="h6" fontStyle="italic">
          Samantha, we're sorry to see you go.
        </Typography>
        <Grid mt={4} container>
          <Grid item lg={6} md={6} sm={6}>
            <Typography mb={3} variant="subtitle1" fontStyle="italic">
              Why do you want to cancel?
            </Typography>
            <Box display="flex" flexDirection="column">
              {reasons.map((reason) => (
                <Checkbox
                  checked={selectedReasons.some(
                    (reasonId) => reasonId === reason.id
                  )}
                  onChange={handleCheck}
                  key={reason.id}
                  value={reason.id}
                  label={reason.name}
                  labelProps={{ fontWeight: "400" }}
                />
              ))}
            </Box>
          </Grid>
          <Grid item lg={6} md={6} sm={6}>
            <Typography mb={3} variant="subtitle1" fontStyle="italic">
              Your plan details
            </Typography>
            <PlanDetails />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}
