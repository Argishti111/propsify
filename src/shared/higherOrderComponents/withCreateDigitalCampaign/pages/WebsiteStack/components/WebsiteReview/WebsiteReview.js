import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { screenshotWebsite } from "../../../../../../../services";
import { StackPagination } from "../../../../../../components";
import "./WebsiteReview.css";
import DigitalMarketingEventRecorder from "../../../../../../analytics/google/DigitalMarketingEventRecoder";

export function WebsiteReview({
  goParentNext,
  goBack,
  parentPage,
  parentPageCount,
  setModalLoading,
}) {
  const goNext = goParentNext;
  const [website, setWebsite] = useState("");
  const [websiteMobile, setWebsiteMobile] = useState("");
  const [showMobile, setShowMobile] = useState(true);
  const [error, setError] = useState("");

  const websiteSrc = useSelector(
    (state) => state.digitalMarketing.campaign.website
  );
  useEffect(() => {
    getWebsiteScreens(websiteSrc);
    DigitalMarketingEventRecorder.websiteReview();
  }, []);

  const getWebsiteScreens = useCallback((website) => {
    setModalLoading(true);
    setError("");
    screenshotWebsite(website)
      .then((urls) => {
        setWebsiteMobile(urls[2]);
        setWebsite(urls[1]);
      })
      .catch(() => {
        setModalLoading(false);
        setError("Failed to load the image");
      })
      .finally(() => {
        setTimeout(() => {
          setError("");
        }, 3000);
      });
  }, []);

  const handleImageLoaded = useCallback(
    (e) => {
      if (e.type === "load") {
        setError("");
        if (website && websiteMobile) {
          setModalLoading(false);
        }
      }
    },
    [website, websiteMobile]
  );

  const handleImageLoadFailure = useCallback(
    (e) => {
      if (website && websiteMobile) {
        e.currentTarget.onerror = null;
        setModalLoading(false);

        handleImageLoaded(e);
        setError("Failed to load the image");
      }
    },
    [website, websiteMobile]
  );

  return (
    <>
      <Box
        display="flex"
        px={{ md: 11, sm: 10, xs: 5 }}
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
          PEOPLE COME HERE AFTER THEY <br /> CLICK YOUR AD
        </Typography>
        <Box display="flex" justifyContent="center" mt={3}>
          <Typography
            onClick={() => {
              setShowMobile(true);
            }}
            className={`top-nav-item ${
              showMobile ? "active" : ""
            } top-nav-item-border-right`}
            variant="p"
            fontFamily="MinervaModern-Bold"
          >
            MOBILE
          </Typography>
          <Typography
            onClick={() => {
              setShowMobile(false);
            }}
            className={`top-nav-item ${showMobile ? "" : "active"} `}
            variant="p"
            fontFamily="MinervaModern-Bold"
          >
            DESKTOP
          </Typography>
        </Box>
        <Box borderRadius={40} mt={5} position="relative" alignSelf="center">
          {showMobile ? (
            <>
              <img
                title="mobile preview"
                alt=""
                className="iframe-mobile"
                height={880}
                width={460}
                onError={handleImageLoadFailure}
                onLoad={handleImageLoaded}
                src={websiteMobile}
              />
              <div className="mobile-frame">
                <Typography
                  mt={1}
                  variant="subtitle2"
                  color="#E55656"
                  textAlign="center"
                >
                  {error}
                </Typography>
              </div>
              <img style={{ height: 0, width: 0 }} alt="" src={website} />
            </>
          ) : (
            <>
              <Typography
                mt={2}
                variant="subtitle2"
                color="#E55656"
                textAlign="center"
              >
                {error}
              </Typography>
              <img
                title="desktop preview"
                alt=""
                className="iframe-desktop"
                height={720}
                width={1360}
                onError={handleImageLoadFailure}
                onLoad={handleImageLoaded}
                src={website}
              />
            </>
          )}
        </Box>
      </Box>
      <StackPagination
        onBack={goBack}
        onNext={goNext}
        page={parentPage}
        pageCount={parentPageCount}
      />
    </>
  );
}
