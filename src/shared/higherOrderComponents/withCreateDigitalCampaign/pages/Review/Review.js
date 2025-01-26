import { Box, Grid, Typography } from "@mui/material";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeDigitalCampaignField } from "../../../../../redux";
import {
  editDigitalCampaign,
  submitDigitalCampaign,
} from "../../../../../services";
import {
  StackPagination,
  TitleWithEdit,
  TitleWithSubtitle,
} from "../../../../components";
import { Input } from "../../../../components/Form";
import { AdReviewMobile, AdReview } from "..";
import { ReviewNavigation } from "../AdDetails/components";
import { numberWithCommas } from "../../../../helpers";
import DigitalMarketingEventRecorder from "../../../../analytics/google/DigitalMarketingEventRecoder";

export function Review({ pageCount, page, goBack, onForceClose }) {
  const [mobileReview, setMobileReview] = useState(true);
  const dispatch = useDispatch();
  const {
    id,
    name,
    isNew,
    isDraft,
    businessName,
    website,
    headline1,
    headline2,
    headline3,
    description1,
    description2,
    phone,
    selectedKeywords,
    selectedPlaces,
    ownBudget,
    isOwnBudget,
    selectedBudget,
  } = useSelector((state) => state.digitalMarketing.campaign);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const ref = useRef();

  useEffect(() => {
    checkFields();
    DigitalMarketingEventRecorder.reviewCampaign();
  }, []);

  const checkFields = useCallback(() => {
    let backCount = 0;
    switch (true) {
      case !businessName:
        backCount = 6;
        break;
      case !website:
        backCount = 5;
        break;

      case !headline1 ||
        !headline2 ||
        !headline3 ||
        !description1 ||
        !description2:
        backCount = 4;
        break;

      case !selectedKeywords.length:
        backCount = 3;
        break;

      case !selectedPlaces.length:
        backCount = 2;
        break;

      case !(isOwnBudget ? !!ownBudget : !!selectedBudget.amount):
        backCount = 1;
        break;
    }
    if (backCount) {
      goBack(backCount);
    }
  }, []);

  const handleSubmit = useCallback(() => {
    setLoading(true);
    setError("");
    let action = isNew || isDraft ? submitDigitalCampaign : editDigitalCampaign;
    action(id, name)
      .then((data) => {
        if (data.success) {
          dispatch(changeDigitalCampaignField("success", true));
          setTimeout(() => {
            onForceClose();
            dispatch(changeDigitalCampaignField("success", false));
          }, 3000);
          return;
        }
        ref.current.scroll(0, 0);
        setError(data.errorMessage);
      })
      .catch(() => {
        ref.current.scroll(0, 0);
        setError(
          `Failed to ${isNew || isDraft ? "submit" : "edit"} the campaign`
        );
      })
      .finally(() => {
        setLoading(false);
        setTimeout(() => {
          setError("");
        }, 3000);
      });
  }, [id, isDraft, isNew, name]);

  const handleChange = useCallback(
    (key) => (e) => {
      if (isDraft || isNew)
        dispatch(changeDigitalCampaignField(key, e.target.value));
    },
    [isDraft]
  );
  const readOnlyName = useMemo(() => !(isNew || isDraft), [isNew, isDraft]);
  return (
    <>
      <Box
        ref={ref}
        display="flex"
        px={{ md: 4, sm: 1, xs: 1 }}
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
          REVIEW YOUR CAMPAIGN TO BE <br /> SURE IT'S RIGHT
        </Typography>
        <Grid mt={5} display="flex" flexWrap={"wrap-reverse"}>
          <Grid
            mt={1}
            xl={mobileReview ? 7 : 12}
            lg={mobileReview ? 7 : 12}
            md={mobileReview ? 7 : 12}
            sm={12}
            xs={12}
          >
            <Input
              value={name}
              onChange={handleChange("name")}
              autoFocus
              fullWidth
              error={error}
              label="Campaign Name"
              required
              inputProps={{ readOnly: readOnlyName }}
            />
            <Box className="data-container">
              <Typography
                color="#192231CC"
                fontStyle="italic"
                variant="subtitle2"
              >
                Campaign type
              </Typography>
              <Typography variant="body2" fontWeight="400">
                Smart
              </Typography>
            </Box>
            <Box className="data-container">
              <TitleWithEdit
                title="Your website"
                type="button"
                onIconClick={() => goBack(5)}
              />
              <Typography variant="body2" fontWeight="400">
                {website}
              </Typography>
            </Box>
            <Box className="data-container">
              <TitleWithSubtitle
                title="Business Name"
                subtitle={businessName}
              />
            </Box>
            <Box className="data-container">
              <TitleWithEdit
                title="Ad text"
                type="button"
                onIconClick={() => goBack(4)}
              />
              <Typography maxWidth={306} variant="body2" fontWeight="400">
                {headline1} {!!headline1 && "|"} {headline2}{" "}
                {!!headline2 && "|"} {headline3}
              </Typography>
              <Typography maxWidth={306} variant="body2" fontWeight="400">
                {description1} {description2}
              </Typography>
              {!!phone && (
                <TitleWithSubtitle
                  title=" Phone Number"
                  subtitle={phone}
                  mt={3}
                />
              )}
            </Box>
            <Box className="data-container">
              <TitleWithEdit
                title="Locations"
                type="button"
                onIconClick={() => goBack(2)}
              />
              {selectedPlaces.map((p) => (
                <Typography
                  key={p.resourceName}
                  variant="body2"
                  fontWeight="400"
                >
                  {p.displayName}
                </Typography>
              ))}
            </Box>
            <Box className="data-container">
              <TitleWithEdit
                title="Keywords"
                onIconClick={() => goBack(3)}
                type="button"
              />
              <Typography maxWidth={306} variant="body2" fontWeight="400">
                {selectedKeywords.map((k, index) => {
                  if (selectedKeywords.length - 1 === index) {
                    return k.displayName;
                  }
                  return k.displayName + ", ";
                })}
              </Typography>
            </Box>
            <Box mb={2} className="data-container">
              <TitleWithEdit
                title="Budget"
                type="button"
                onIconClick={() => goBack()}
              />
              <Typography variant="body2" fontWeight="400">
                {!isOwnBudget
                  ? `$${selectedBudget?.amount}`
                  : `$${numberWithCommas(ownBudget)}`}
              </Typography>
              {/* <TitleWithSubtitle
                mt={3}
                title="Start date"
                subtitle={startDate?.toLocaleString()}
              />
              {!runContinously && (
                <TitleWithSubtitle // TODO: Remove?
                  mt={3}
                  title="End date"
                  subtitle={endDate?.toLocaleString()}
                />
              )} */}
            </Box>
          </Grid>
          <Grid
            xl={5}
            lg={5}
            md={5}
            sm={12}
            xs={12}
            display={mobileReview ? "flex" : "none"}
            flexDirection="column"
            alignItems="center"
            item
          >
            <ReviewNavigation
              setMobileReview={setMobileReview}
              mobileReview={mobileReview}
            />
            <AdReviewMobile
              showAdditionalData
              minimumClicks={selectedBudget?.minimumClicks}
              maximumClicks={isOwnBudget ? 0 : selectedBudget?.maximumClicks}
            />
          </Grid>
          <Grid
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            display={mobileReview ? "none" : "flex"}
            flexDirection="column"
            alignItems="center"
            item
          >
            <ReviewNavigation
              setMobileReview={setMobileReview}
              mobileReview={mobileReview}
            />
            <AdReview />
          </Grid>
        </Grid>
      </Box>
      <StackPagination
        onBack={goBack}
        nextDisabled={!name || loading}
        onNext={handleSubmit}
        page={page}
        nextText={isNew || isDraft ? "SUBMIT" : "EDIT"}
        pageCount={pageCount}
      />
    </>
  );
}
