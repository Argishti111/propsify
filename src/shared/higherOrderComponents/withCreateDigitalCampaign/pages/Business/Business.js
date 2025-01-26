import { CheckBoxOutlineBlank } from "@mui/icons-material";
import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import store, { changeDigitalCampaignField } from "../../../../../redux";
import {
  createGoogleCampaign,
  updateAdKeywords,
  updateDigitalCampaignBussiness,
} from "../../../../../services";
import { CustomButton, StackPagination } from "../../../../components";
import { Input } from "../../../../components/Form";
import "./Business.css";
import DigitalMarketingEventRecorder from "../../../../analytics/google/DigitalMarketingEventRecoder";

export function Business({
  goNext,
  page,
  pageCount,
  setModalLoading,
  onChangeField,
  isNew,
  onError,
}) {
  const { businessName, saveBusinessName, selectedKeywords, website } =
    useSelector((state) => state.digitalMarketing.campaign);
  const dispatch = useDispatch();
  const [updating, setUpdating] = useState(false);
  const id = useSelector((state) => state.digitalMarketing.campaign.id);
  const handleChange = useCallback((key) => {
    return (e) => {
      dispatch(changeDigitalCampaignField(key, e.target.value));
    };
  }, []);

  const createCampaign = useCallback(() => {
    setModalLoading(true);
    if (isNew) {
      return createGoogleCampaign(true)
        .then((res) => {
          if (res.success) {
            DigitalMarketingEventRecorder.giveBusinessName();
            onChangeField("id", res.data.id);
            return res.data.id;
          }
          onError(res.errorMessage);
        })
        .catch(() => {
          onError("Failed to create campaign");
        })
        .finally(() => {
          setModalLoading(false);
          setTimeout(() => onError(""), 3000);
        });
    }
  }, [isNew]);

  const handleUpdateKeywords = useCallback(
    (id) => {
      updateAdKeywords(
        website,
        selectedKeywords.filter((k) => !k.userDefined),
        id,
        selectedKeywords.filter((k) => k.userDefined).map((k) => k.displayName)
      );
    },
    [selectedKeywords, website]
  );

  const handleNextAction = useCallback(
    async (e) => {
      e.preventDefault();
      let id = store.getState().digitalMarketing.campaign.id;
      let newId = null;
      setUpdating(true);
      if (!id) {
        newId = await createCampaign();
      }
      if (!newId && id) {
        return goNext();
      }

      handleUpdateBusiness(newId, businessName, saveBusinessName);
    },
    [businessName, saveBusinessName]
  );

  const handleUpdateBusiness = useCallback((id, name, save) => {
    updateDigitalCampaignBussiness(id, name, save)
      .then(() => {
        goNext();
        handleUpdateKeywords(id);
      })
      .finally(() => setUpdating(false));
  }, []);

  const disabled = !!id;
  return (
    <form className="modal-form">
      <Box
        display="flex"
        px={{ md: 11, sm: 1, xs: 1 }}
        flexDirection="column"
        justifyContent="center"
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
          textAlign="center"
          variant="h4"
          px={{ md: 0, sm: 14, xs: 8 }}
          fontFamily="MinervaModern-Regular"
          style={{ marginTop: "calc(100% - 100vh / 1.4)" }}
        >
          GIVE US YOUR BUSINESS NAME
        </Typography>
        <Typography
          textAlign="center"
          mt={3}
          mb={5}
          px={{ md: 0, sm: 10, xs: 4 }}
          variant="body1"
        >
          This helps us show your ad when people search for your name
        </Typography>
        <Input
          value={businessName}
          disabled={disabled}
          onChange={handleChange("businessName")}
          sx={{ mt: 2 }}
          label="Your business name"
        />

        <FormControlLabel
          checked={saveBusinessName}
          disabled={disabled}
          onChange={(e) => {
            e.target.value = saveBusinessName ? "off" : "on";
            handleChange("saveBusinessName")({
              target: { value: !saveBusinessName },
            });
          }}
          // disabled={loading}
          control={
            <Checkbox
              sx={{ ml: 1 }}
              disabled
              color="primary"
              icon={
                <CheckBoxOutlineBlank
                  htmlColor={disabled ? "#AFAFAF" : "#BEB082"}
                />
              }
            />
          }
          label={
            <Typography variant="p">
              Save to my account for future use
            </Typography>
          }
        />
      </Box>
      <StackPagination
        onNext={handleNextAction}
        page={page}
        nextDisabled={updating || !businessName}
        pageCount={pageCount}
      />
    </form>
  );
}
