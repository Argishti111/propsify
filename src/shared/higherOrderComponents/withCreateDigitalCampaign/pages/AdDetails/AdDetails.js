import { Box, Grid, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import store from "../../../../../redux";
import { StackPagination } from "../../../../components";
import { Descriptions, Headlines, Phone, ReviewNavigation } from "./components";
import {
  getHeadlineSuggestion,
  updateGoogleAdContent,
} from "../../../../../services";
import { AdReviewMobile, AdReview } from "..";
import DigitalMarketingEventRecorder from "../../../../analytics/google/DigitalMarketingEventRecoder";

export function AdDetails({ goNext, goBack, page, pageCount }) {
  const notCompleted = useSelector(checkFields);
  const [updating, setUpdating] = useState();
  const [ideas, setIdeas] = useState({ headlines: [], descriptions: [] });
  const [mobileReview, setMobileReview] = useState(true);
  useEffect(() => {
    fetchIdeas();
    DigitalMarketingEventRecorder.writeAd();
  }, []);

  const handleNextAction = useCallback(
    (e) => {
      e.preventDefault();
      let {
        id,
        headline1,
        headline2,
        headline3,
        description1,
        description2,
        country,
        phone,
        savePhone,
      } = store.getState().digitalMarketing.campaign;
      setUpdating(true);
      updateGoogleAdContent(
        id,
        headline1,
        headline2,
        headline3,
        description1,
        description2,
        country,
        phone,
        savePhone
      )
        .then(() => {
          goNext();
        })
        .finally(() => setUpdating(false));
    },
    [store]
  );

  const fetchIdeas = useCallback(() => {
    getHeadlineSuggestion(store.getState().digitalMarketing.campaign.id).then(
      (data) => {
        setIdeas(data);
      }
    );
  }, []);

  return (
    <form className="modal-form">
      <Box
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
          NOW IT'S TIME TO WRITE YOUR AD
        </Typography>
        <Grid mt={4} display="flex" flexWrap="wrap-reverse">
          <Grid
            xl={mobileReview ? 7 : 12}
            lg={mobileReview ? 7 : 12}
            md={mobileReview ? 7 : 12}
            sm={12}
            xs={12}
            item
          >
            <Headlines headlines={ideas.headlines} />
            <Descriptions descriptions={ideas.descriptions} />
            <Phone />
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
            <AdReviewMobile />
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
        onNext={handleNextAction}
        page={page}
        nextDisabled={notCompleted || updating}
        pageCount={pageCount}
      />
    </form>
  );
}

const checkFields = (state) => {
  const { headline1, headline2, headline3, description1, description2 } =
    state.digitalMarketing.campaign;
  return !(headline1 && headline2 && headline3 && description1 && description2);
};
