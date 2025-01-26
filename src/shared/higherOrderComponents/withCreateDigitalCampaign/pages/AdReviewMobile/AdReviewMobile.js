import { Phone, Search } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import "./AdReviewMobile.css";
export function AdReviewMobile({
  showAdditionalData = false,
  minimumClicks,
  maximumClicks,
}) {
  const {
    headline1,
    headline2,
    headline3,
    description1,
    description2,
    website,
  } = useSelector((state) => state.digitalMarketing.campaign);
  return (
    <>
      <div className="ad-review-mobile-container">
        <div className="ad-review-mobile">
          <div className="ad-review-mobile-search">
            <Search
              className="ad-review-mobile-search-icon"
              fontSize="small"
              htmlColor="white"
            />
          </div>
          <div
            style={{ paddingBottom: 42 }}
            className="ad-review-mobile-content"
          >
            <Typography
              variant="p"
              fontSize={13}
              display="block"
              mb={1}
              color="#343434"
              sx={{ wordBreak: "break-word" }}
            >
              Ad • {website}
            </Typography>
            <Typography mb={1} display="block" color="#205ED6" variant="p">
              {headline1} {!!headline1 && "|"} {headline2} {!!headline2 && "|"}{" "}
              {headline3}
            </Typography>
            <Typography variant="p" fontSize="0.813rem">
              {description1} {description2}
            </Typography>
          </div>
        </div>
        {showAdditionalData && (
          <Typography
            borderTop="1px solid #e3e3e3"
            borderBottom="1px solid #e3e3e3"
            mx={-1}
            px={3}
            height={32}
            py={0.2}
            mt={-4}
            fontFamily="Roboto"
            fontSize="0.813rem"
            color="#7E7E7E"
            display="flex"
            width="calc(100% + 16px)"
            alignItems="center"
          >
            <Phone sx={{ mr: 1 }} htmlColor="#7E7E7E" fontSize="small" />
            Call business
          </Typography>
        )}
      </div>
      {showAdditionalData && !!maximumClicks && (
        <Box display="flex" justifyContent="center" flexDirection="column">
          <Typography variant="body1" textAlign="center">
            110-177
          </Typography>
          <Typography variant="p" textAlign="center">
            Estimated monthly clicks
          </Typography>
        </Box>
      )}
    </>
  );
}
