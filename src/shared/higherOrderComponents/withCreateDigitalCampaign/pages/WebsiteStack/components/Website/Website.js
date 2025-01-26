import { CheckBoxOutlineBlank } from "@mui/icons-material";
import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import store, { changeDigitalCampaignField } from "../../../../../../../redux";
import { updateDigitalCampaignWebsite } from "../../../../../../../services";
import { StackPagination } from "../../../../../../components";
import { Input } from "../../../../../../components/Form";
import { checkWebsite, websiteIsReachable } from "../../../../../../helpers";
import { validateWebsite } from "../../../../../../validators";
import "./Website.css";
import DigitalMarketingEventRecorder from "../../../../../../analytics/google/DigitalMarketingEventRecoder";

let request = new AbortController();
export function Website({
  setModalLoading,
  goNext,
  goParentBack,
  parentPage,
  parentPageCount,
}) {
  const goBack = goParentBack;
  const { website, saveWebsite } = useSelector(
    (state) => state.digitalMarketing.campaign
  );
  const [websiteReachable, setWebsiteReachable] = useState(false);
  const [checking, setChecking] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (website) {
      // TODO: can be bringed back
      // checkWebsiteReachability(website, request);
    }
  }, [website]);

  const checkWebsiteReachability = useCallback((website, request) => {
    request.abort();
    setChecking(true);
    request = websiteIsReachable(website, (isReachable) => {
      setWebsiteReachable(isReachable);
      setChecking(false);
    });
  }, []);

  const handleChange = useCallback((key) => {
    return (e) => dispatch(changeDigitalCampaignField(key, e.target.value));
  }, []);

  const websiteError = useMemo(() => {
    return checkWebsite(website) ? "" : "The website is not reachable";
  }, [websiteReachable, website]);

  const handleNextAction = useCallback(() => {
    goNext();
    DigitalMarketingEventRecorder.adClickLocation();
    let id = store.getState().digitalMarketing.campaign.id;
    updateDigitalCampaignWebsite(id, website, saveWebsite);
  }, [website, saveWebsite]);

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
          fontFamily="MinervaModern-Regular"
          style={{ marginTop: "calc(100% - 100vh / 1.5)" }}
        >
          TELL US WHERE PEOPLE GO AFTER THEY CLICK YOUR AD
        </Typography>
        <Typography textAlign="center" mt={3} mb={5} variant="body1">
          Consider what you're advertising, and enter the most relevant page of
          your website. This might be your homepage, or a more specific page.
        </Typography>
        <Input
          error={!!website && websiteError}
          value={website}
          onChange={handleChange("website")}
          sx={{ mt: 2 }}
          label="Your website"
        />

        <FormControlLabel
          // disabled={loading}
          checked={saveWebsite}
          onChange={(e) => {
            e.target.value = saveWebsite ? "off" : "on";
            handleChange("saveWebsite")({
              target: { value: !saveWebsite },
            });
          }}
          control={
            <Checkbox
              sx={{ ml: 1 }}
              color="primary"
              icon={<CheckBoxOutlineBlank htmlColor="#BEB082" />}
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
        onBack={goBack}
        onNext={handleNextAction}
        page={parentPage}
        nextDisabled={!!websiteError || checking}
        pageCount={parentPageCount}
      />
    </form>
  );
}
