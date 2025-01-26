import { Box, FormControl, RadioGroup, Typography } from "@mui/material";
import React, { useCallback, useMemo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeDigitalCampaignField } from "../../../../../redux";
import { StackPagination } from "../../../../components";
import { BudgetOptions, Duration } from "./components";
import { updateBudgetAndDuration } from "../../../../../services";
import { validateBudget } from "../../../../validators";
import { useForceRender } from "../../../../hooks";
import DigitalMarketingEventRecorder from "../../../../analytics/google/DigitalMarketingEventRecoder";

export function Budget({ goNext, goBack, page, pageCount }) {
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();

  useEffect(DigitalMarketingEventRecorder.setBudget, []);

  const {
    id,
    selectedBudget,
    ownBudget,
    isOwnBudget,
    startDate,
    endDate,
    runContinously,
  } = useSelector((state) => state.digitalMarketing.campaign);
  const [error, setError] = useState("");
  const forceRender = useForceRender();
  const allFilled = useMemo(() => {
    return !(isOwnBudget ? !validateBudget(ownBudget) : selectedBudget.amount);
  }, [
    selectedBudget,
    ownBudget,
    isOwnBudget,
    startDate,
    endDate,
    runContinously,
  ]);

  const handleChange = useCallback((e) => {
    dispatch(changeDigitalCampaignField("ownBudget", ""));
    dispatch(changeDigitalCampaignField("isOwnBudget", e.target.value === "2"));
  }, []);

  const handleNextAction = useCallback(() => {
    setUploading(true);
    setError("");
    updateBudgetAndDuration(
      id,
      isOwnBudget ? +ownBudget : selectedBudget.amount,
      startDate,
      runContinously ? null : endDate
    )
      .then((data) => {
        if (data.success) {
          goNext();
        } else {
          setError(data.errorMessage);
        }
      })
      .catch(() => {
        setError("Failed to set budget");
      })
      .finally(() => setUploading(false));
  }, [selectedBudget, isOwnBudget, ownBudget, startDate, endDate]);

  return (
    <>
      <Box
        display="flex"
        px={{ md: 8, sm: 1, xs: 1 }}
        flexDirection="column"
        overflow="auto"
        style={{
          overflowX: "hidden",
          minWidth: 300,
          maxWidth: 800,
          height: "100%",
          marginBottom: 6,
        }}
      >
        <Typography width={800} />
        <Typography
          mt={4}
          textAlign="center"
          variant="h4"
          fontFamily="MinervaModern-Regular"
        >
          SET A BUDGET TO GET THE RESULTS <br /> YOU WANT
        </Typography>
        <Typography mt={2} textAlign="center" variant="body1">
          For the month, you won't pay more than your daily average budget times
          the average number of days in a month. Some days you might spend less
          than you daily average budget, and on others you might spend up to
          twice as much.
        </Typography>
        <Typography mt={4} variant="body2">
          Budget
        </Typography>
        <FormControl>
          <RadioGroup
            onChange={handleChange}
            value={isOwnBudget ? "2" : "1"}
            defaultValue={isOwnBudget ? "2" : "1"}
          >
            <BudgetOptions error={error} onChange={forceRender} />
          </RadioGroup>
        </FormControl>
        {/* <Duration /> */}
      </Box>
      <StackPagination
        onBack={goBack}
        onNext={handleNextAction}
        nextDisabled={uploading || allFilled || (isOwnBudget && !ownBudget)}
        page={page}
        pageCount={pageCount}
      />
    </>
  );
}
