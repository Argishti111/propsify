import {
  Box,
  FormControlLabel,
  Radio,
  Slider,
  Typography,
} from "@mui/material";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { BudgetOption } from "./components";
import { useSelector, useDispatch } from "react-redux";
import { changeDigitalCampaignField } from "../../../../../../../redux";
import { Input } from "../../../../../../components/Form";
import { getBudgetSuggestion } from "../../../../../../../services";
import { ErrorBox, Loading } from "../../../../../../components";
import "./BudgetOptions.css";
import { validateBudget } from "../../../../../../validators";
import { numberWithCommas } from "../../../../../../helpers";
import { DigitalCampaignContext } from "../../../../withCreateDigitalCampaign";

export function BudgetOptions({ error, onChange }) {
  const { id, selectedBudget, ownBudget, isOwnBudget } = useSelector(
    (state) => state.digitalMarketing.campaign
  );
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { budgetLimits } = useContext(DigitalCampaignContext);

  useEffect(() => {
    fetchBudgetSuggestion();
  }, []);

  const fetchBudgetSuggestion = useCallback(() => {
    setLoading(true);
    getBudgetSuggestion(id)
      .then((data) => {
        setItems(data);
        if (!isOwnBudget) {
          let b = data.find((budget) => budget.amount === ownBudget);
          // if there is an option with own budget then set the option
          if (b) {
            dispatch(changeDigitalCampaignField("selectedBudget", b));
            return;
          }
          if (ownBudget) {
            dispatch(changeDigitalCampaignField("isOwnBudget", true));
            dispatch(changeDigitalCampaignField("selectedBudget", ownBudget));
            return;
          }
          if (data.length > 1) {
            dispatch(changeDigitalCampaignField("selectedBudget", data[1]));
            dispatch(changeDigitalCampaignField("ownBudget", data[1].amount));
            return;
          }
          if (data.length > 0) {
            dispatch(changeDigitalCampaignField("selectedBudget", data[0]));
            dispatch(changeDigitalCampaignField("ownBudget", data[0].amount));
          }
        }
      })
      .finally(() => setLoading(false));
  }, [id, isOwnBudget, ownBudget]);

  const dispatch = useDispatch();

  const handleChange = useCallback(
    (key) => (e) => {
      dispatch(changeDigitalCampaignField(key, e.target.value));
    },
    []
  );

  const dailyAverage = useMemo(() => {
    return numberWithCommas(Math.round(ownBudget * 30.4 * 100) / 100);
  }, [ownBudget, budgetLimits]);

  const budgetError = useMemo(
    () =>
      validateBudget(ownBudget, budgetLimits.minBudget, budgetLimits.maxBudget),
    [ownBudget, budgetLimits]
  );
  return (
    <>
      <Box>
        <FormControlLabel
          value="1"
          // disabled={loading}
          control={<Radio sx={{ color: "#BEB082" }} defaultChecked />}
          label={
            <Typography variant="body2">Select a budget option</Typography>
          }
        />
        {!isOwnBudget && (
          <>
            {items.map((item, index) => (
              <BudgetOption
                index={index}
                onClick={() => {
                  dispatch(changeDigitalCampaignField("selectedBudget", item));
                  dispatch(
                    changeDigitalCampaignField("ownBudget", item.amount)
                  );
                  onChange(item);
                }}
                key={item.amount}
                data={item}
                selected={selectedBudget.amount === item.amount}
              />
            ))}
            {loading && !items.length && (
              <Box height={160}>
                <Loading />
              </Box>
            )}
          </>
        )}
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        sx={{ mr: { md: 0, sm: 1, xs: 1 } }}
      >
        <FormControlLabel
          value="2"
          // disabled={loading}
          sx={{ mb: 2 }}
          control={<Radio sx={{ color: "#BEB082" }} />}
          label={<Typography variant="body2">Enter your own budget</Typography>}
        />
        {isOwnBudget && (
          <>
            <Box display="flex" alignItems="center" sx={{ width: "100%" }}>
              <Box sx={{ width: "100%" }}>
                <Input
                  className="budget-input"
                  label="Own budget"
                  required
                  type="number"
                  sx={{ maxWidth: 450, width: "100%" }}
                  value={ownBudget}
                  error={budgetError}
                  onChange={handleChange("ownBudget")}
                />
              </Box>
              {!!ownBudget && (
                <Typography
                  px={1}
                  variant="p"
                  display="inline"
                  fontSize="0.8rem"
                  mb={1}
                >
                  daily average - ${dailyAverage} monthly max
                </Typography>
              )}
            </Box>
            <Slider
              min={budgetLimits.minBudget}
              max={budgetLimits.maxBudget}
              sx={{ ml: 0.8 }}
              value={ownBudget}
              onChange={handleChange("ownBudget")}
              size="small"
            />
          </>
        )}
        <ErrorBox title="FAILED TO SET BUDGET" message={error} />
      </Box>
    </>
  );
}
