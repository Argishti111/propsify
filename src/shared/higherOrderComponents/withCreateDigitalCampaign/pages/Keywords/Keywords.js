import { Box, Grid, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import {
  CustomButton,
  StackPagination,
  TinyButton,
} from "../../../../components";
import { Input } from "../../../../components/Form";
import { KeywordManager, SelectedKeywordManager } from "./components";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdKeywords,
  getSmartKeywords,
  getWebsiteKeywords,
  updateAdKeywords,
} from "../../../../../services";
import { changeDigitalCampaignField } from "../../../../../redux";
import DigitalMarketingEventRecorder from "../../../../analytics/google/DigitalMarketingEventRecoder";

export function Keywords({ goNext, goBack, page, pageCount }) {
  const { website, id, selectedKeywords } = useSelector(
    (state) => state.digitalMarketing.campaign
  );
  const dispatch = useDispatch();
  const [productsOrServices, setProductsOrServices] = useState(() =>
    selectedKeywords.length ? selectedKeywords[0].displayName : ""
  );
  const [keywords, setKeywords] = useState([]);
  const [websiteKeywords, setWebsiteKeywords] = useState([]);
  const [updating, setUpdating] = useState(false);
  const [gettingKeywords, setGettingKeywords] = useState(false);
  const [gettingWebsiteKeywords, setGettingWebsiteKeywords] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const setSelectedKeywords = useCallback(
    (callback) => {
      dispatch(
        changeDigitalCampaignField(
          "selectedKeywords",
          callback(selectedKeywords)
        )
      );
    },
    [selectedKeywords]
  );

  useEffect(() => {
    refetchKeywords();
    refetchWebsiteKeywords();
    DigitalMarketingEventRecorder.keywords();
  }, []);

  const handleGetWebsiteKeywords = useCallback(() => {
    setGettingWebsiteKeywords(true);
    getWebsiteKeywords(id)
      .then((data) => {
        setWebsiteKeywords(
          data.filter((k) => {
            k.isWebsiteKeyword = true;
            return !selectedKeywords.some(
              (sk) => sk.resourceName === k.resourceName
            );
          })
        );
      })
      .finally(() => {
        setGettingWebsiteKeywords(false);
      });
  }, [productsOrServices, selectedKeywords]);

  const handleGetSmartKeywords = useCallback(
    (showMore = false) => {
      if (productsOrServices) {
        setGettingKeywords(true);
        setShowMore(false);
        getSmartKeywords(productsOrServices, showMore)
          .then((data) => {
            setKeywords(
              data.filter((k) => {
                return !selectedKeywords.some(
                  (sk) => sk.resourceName === k.resourceName
                );
              })
            );
          })
          .finally(() => {
            setGettingKeywords(false);
          });
      }
    },
    [productsOrServices, selectedKeywords]
  );

  const refetchKeywords = useCallback(() => {
    handleGetSmartKeywords();
    setShowMore(false);
  }, [productsOrServices]);

  const refetchWebsiteKeywords = useCallback(() => {
    handleGetWebsiteKeywords();
  }, [website]);

  const handleUpdateKeywords = useCallback(() => {
    setUpdating(true);
    updateAdKeywords(
      website,
      selectedKeywords.filter((k) => !k.userDefined),
      id,
      selectedKeywords.filter((k) => k.userDefined).map((k) => k.displayName)
    )
      .then(() => goNext())
      .finally(() => setUpdating(false));
  }, [selectedKeywords, website]);

  return (
    <>
      <Box
        display="flex"
        px={{ md: 9, sm: 1, xs: 1 }}
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
          px={{ md: 5, sm: 5, xs: 3 }}
          fontFamily="MinervaModern-Regular"
        >
          ADD KEYWORD THEMES TO MATCH YOUR AD TO SEARCHES
        </Typography>
        <Typography mt={2} textAlign="center" variant="body1">
          Give us a few keyword themes and we'll show your ad for similar
          searches.
        </Typography>
        <Grid container>
          <Grid item lg={8} md={8} sm={12} xs={12}>
            <Typography pt={4} pb={2} display="block" variant="p">
              Keyword themes from your website:
            </Typography>
            <Grid
              alignItems="center"
              display="flex"
              justifyContent="space-between"
              mr={1}
            >
              <Grid xl={9} lg={9} md={9} sm={8} xs={8} item>
                <Input fullWidth value={website} label="Your website" />
              </Grid>
              <Grid
                justifyContent="center"
                display="flex"
                xl={2.5}
                lg={2.5}
                md={2.5}
                sm={4}
                xs={4}
                item
                mt={-1}
              >
                <CustomButton
                  sx={{ height: "3.1rem" }}
                  color="secondary"
                  className="hovered-on-mobile"
                  onClick={refetchWebsiteKeywords}
                >
                  GENERATE
                </CustomButton>
              </Grid>
            </Grid>

            <KeywordManager
              hideTitle
              keywords={websiteKeywords}
              setKeywords={setWebsiteKeywords}
              selectedKeywords={selectedKeywords}
              setSelectedKeywords={setSelectedKeywords}
              gettingKeywords={gettingWebsiteKeywords}
            ></KeywordManager>
            <Typography variant="p" mt={2}>
              Add products or services to generate keyword themes:
            </Typography>
            <Grid
              mt={2}
              alignItems="center"
              justifyContent="space-between"
              mr={1}
              display="flex"
            >
              <Grid xl={9} lg={9} md={9} sm={8} xs={8} item>
                <Input
                  value={productsOrServices}
                  onChange={(e) => setProductsOrServices(e.target.value)}
                  fullWidth
                  label="Add products or services"
                />
              </Grid>
              <Grid
                justifyContent="center"
                display="flex"
                xl={2.5}
                lg={2.5}
                md={2.5}
                sm={4}
                xs={4}
                item
                mt={-1}
              >
                <CustomButton
                  sx={{ height: "3.1rem" }}
                  color="secondary"
                  className="hovered-on-mobile"
                  onClick={refetchKeywords}
                >
                  GENERATE
                </CustomButton>
              </Grid>
            </Grid>
            <KeywordManager
              keywords={showMore ? keywords : keywords.slice(0, 6)}
              setKeywords={setKeywords}
              selectedKeywords={selectedKeywords}
              setSelectedKeywords={setSelectedKeywords}
              gettingKeywords={gettingKeywords}
            >
              {!!keywords.length && keywords.length > 6 && (
                <TinyButton
                  sx={{ width: 100 }}
                  mt={1}
                  onClick={() => {
                    setShowMore((prev) => !prev);
                  }}
                >
                  SHOW {showMore ? "LESS" : "MORE"}
                </TinyButton>
              )}
            </KeywordManager>
          </Grid>
          <Grid
            sx={{ borderLeftWidth: { lg: 1, md: 1, sm: 0, xs: 0 } }}
            className="border-gradient border-left"
            item
            lg={4}
            md={4}
            sm={12}
            xs={12}
          >
            <Box
              className="border-gradient border-top"
              display={{ lg: "none", md: "none", sm: "block", xs: "block" }}
            />
            <Box pt={4} pl={{ lg: 2, md: 2, sm: 0, xs: 0 }}>
              <SelectedKeywordManager
                selectedKeywords={selectedKeywords}
                setSelectedKeywords={setSelectedKeywords}
                setKeywords={setKeywords}
                setWebsiteKeywords={setWebsiteKeywords}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <StackPagination
        onBack={goBack}
        onNext={handleUpdateKeywords}
        page={page}
        nextDisabled={updating || !selectedKeywords.length}
        pageCount={pageCount}
      />
    </>
  );
}
