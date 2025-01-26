import { Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import "./AdReview.css";

export function AdReview() {
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
      <div className="ad-review-container">
        <div className="ad-review">
          <div className="ad-review-content">
            <Typography
              variant="p"
              fontSize="0.875rem"
              display="block"
              mb={1}
              color="#343434"
              sx={{ wordBreak: "break-word" }}
            >
              <b>Ad</b> ∙ {website}
            </Typography>
            <Typography
              mb={1}
              fontSize="1.25rem"
              display="block"
              color="#205ED6"
              variant="p"
            >
              {headline1} {!!headline1 && "|"} {headline2} {!!headline2 && "|"}{" "}
              {headline3}
            </Typography>
            <Typography variant="p" fontSize="0.875rem">
              {description1} {description2}
            </Typography>
          </div>
        </div>
      </div>
      <Typography fontSize="0.75rem" mb={2}>
        This preview shows potential ads assembled using your assets. Not all
        combinations are shown. Assets can be shown in any order, so make sure
        that they make sense individually or in combination, and don't violate
        our policies or local law. Some shortening may also occur in some
        formats. You can make sure certain text appears in your ad.
      </Typography>
    </>
  );
}
