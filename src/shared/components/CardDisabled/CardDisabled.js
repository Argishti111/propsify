import { InfoOutlined } from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useCallback } from "react";
import { CustomButton } from "../CustomButton";
import "./CardDisabled.css";

export function CardDisabled({ xl, name, data }) {
  const [ratio, setRatio] = useState(0);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [card, setCard] = useState(null);

  const cardRef = useCallback(
    (node, changedRatio = 1) => {
      if (node && changedRatio !== ratio) {
        setRatio(changedRatio);
        setWidth(node.getBoundingClientRect().width);
        setHeight(node.getBoundingClientRect().height / changedRatio);
        setCard(node);
      }
    },
    [height, ratio]
  );

  return (
    <>
      <Grid
        className="card-wrapper"
        style={{
          width: "100%",
          height: height * 1.6,
          cursor: "pointer",
          pointerEvents: "none !important",
        }}
        item
        lg={xl}
        xl={xl}
        md={6}
      >
        <div
          ref={(node) => window.innerWidth > 899 && cardRef(node)}
          className="card-disabled relative"
          style={{ pointerEvents: "none" }}
        >
          <Grid className="flex-row-between card-hover">
            <Typography
              className="card-title"
              variant="h6"
              fontSize="1.063rem"
              fontWeight="500"
            >
              {name}
            </Typography>
            <InfoOutlined
              fontSize="small"
              htmlColor="#AFAFAF"
              style={{ marginTop: 6 }}
            />
          </Grid>
          <div className="flex-row card-hover card-value-container ">
            <Typography
              fontFamily="MinervaModern-Regular"
              variant="h4"
              className="card-value"
            >
              {data?.displayValue ?? 32}
            </Typography>
            <CustomButton
              sx={downloadButtonSx}
              style={{
                borderRadius: 2,
              }}
              disabled
              variant="outlined"
            >
              DOWNLOAD
            </CustomButton>
          </div>
          <Typography
            position="absolute"
            fontStyle="italic"
            variant="p"
            fontSize="0.875rem"
            right={16}
            mt={1}
          >
            In development...
          </Typography>
        </div>
      </Grid>

      <Grid
        className="card-wrapper-phone"
        style={{ width: "100%", cursor: "pointer" }}
        item
        lg={xl}
        xl={xl}
        md={6}
      >
        <div
          style={{ pointerEvents: "none" }}
          ref={(node) => {
            window.innerWidth <= 899 && cardRef(node, 1.7);
          }}
          className="card card-disabled"
        >
          <Grid className="flex-row-between card-hover">
            <Typography className="card-title" variant="h6">
              {name}
            </Typography>
            <InfoOutlined
              fontSize="small"
              htmlColor="#AFAFAF"
              style={{ marginTop: 6 }}
            />
          </Grid>
          <div className="flex-row relative card-hover card-value-container ">
            <Typography
              fontFamily="MinervaModern-Regular"
              variant="h3"
              className="card-value"
            >
              {data?.displayValue ?? 32}
            </Typography>
            <CustomButton
              sx={downloadButtonSx}
              style={{
                borderRadius: 2,
              }}
              disabled
              variant="outlined"
            >
              DOWNLOAD
            </CustomButton>
            <Typography
              position="absolute"
              right={8}
              fontStyle="italic"
              variant="p"
              fontSize="0.875rem"
            >
              In development...
            </Typography>
          </div>
        </div>
      </Grid>
    </>
  );
}

const downloadButtonSx = {
  background: "transparent !important",
  fontWeight: "450",
  letterSpacing: "0.08rem",
  fontFamily: "MinervaModern-Regular !important",
  fontSize: "0.813rem !important",
  padding: "1.5px !important",
};
