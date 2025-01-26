import { Typography } from "@mui/material";
import React, { useCallback } from "react";
import { useNavigate } from "react-router";
import {
  CardContainer,
  CustomButton,
  Info,
} from "../../../../../../shared/components";
import "./CityCard.css";

export function CityCard({ data }) {
  const navigate = useNavigate();
  const handleViewMore = useCallback(() => {
    navigate(`/market-insights/cities-zip-codes?entityId=${data.entityId}`);
  }, []);
  return (
    <CardContainer
      marginBottom={3}
      mr={{ md: 3, sm: 0, xs: 0 }}
      className="city-card "
      width={240}
    >
      <Typography
        marginTop={1}
        textAlign="center"
        variant="h6"
        fontStyle="italic"
      >
        {data.cityName}
      </Typography>
      <div className="city-card-grade flex-column-center">
        <span className="summary-market-value">
          <span>{data.marketGrade}</span>
        </span>
        <Typography
          position="absolute"
          variant="subtitle2"
          color="#939393"
          lineHeight="1.16rem"
          textAlign="center"
          className="under-development"
          top={2}
          mt={2}
          maxWidth={156}
          fontStyle="italic !important"
        >
          The Market grade is in development...
        </Typography>
        <div
          style={{ marginTop: 56, position: "relative" }}
          className="summary-market-title"
        >
          <Typography className="italic" fontWeight="500" variant="p">
            Market grade
          </Typography>
          <Info
            defaultPosition="bottom"
            iconColor="#cdcdcd"
            style={{
              margin: "0 10px",
            }}
            // value={data.marketGradeDescription} //TODO: get this back
          />
        </div>
      </div>

      <span className="likelihood-percent summary-closed-item flex-column-center">
        {data.likelihoodOfSale}%
      </span>
      <div className="likelihood-label summary-closed-item">
        <Typography
          fontStyle="italic"
          fontWeight="500"
          fontSize={17}
          color="#192231cc"
          variant="p"
          style={{ marginRight: "10px" }}
        >
          Likelihood of sale{" "}
        </Typography>
        <Info
          defaultPosition="bottom"
          value={data.likelihoodOfSaleDescription}
        />
      </div>
      <div className="city-card-hidden">
        <Typography
          variant="p"
          marginTop={3}
          paragraph={true}
          fontSize={12}
          fontWeight="500"
          fontStyle="italic"
          textAlign="center"
        >
          Last updated: {data.likelihoodOfSaleLastUpdated}
        </Typography>
        <CustomButton onClick={handleViewMore} fullWidth sx={{ marginTop: 1 }}>
          VIEW MORE
        </CustomButton>
      </div>
    </CardContainer>
  );
}
