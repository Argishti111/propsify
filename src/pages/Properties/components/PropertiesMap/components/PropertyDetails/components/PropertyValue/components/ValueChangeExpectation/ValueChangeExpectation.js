import { Moving } from "@mui/icons-material";
import { ReactComponent as ArrowNeutral } from "../../../../../../../../../../shared/static/icons/icon-arrow-value-neutral.svg";
import { Box, Typography } from "@mui/material";
import React from "react";
import { useMemo } from "react";

const UP = 1;
const DOWN = 2;
const NEUTRAL = 3;

const cases = {
  [UP]: " increase ",
  [DOWN]: " decrease ",
  [NEUTRAL]: " be neutral ",
};

export function ValueChangeExpectation({ predicted_direction }) {
  const expectation = useMemo(() => {
    if (predicted_direction === "up") {
      return UP;
    }
    if (predicted_direction === "down") {
      return DOWN;
    }
    return NEUTRAL;
  }, [predicted_direction]);
  return (
    <Box py={2.5} display="flex" alignItems="center">
      {expectation === NEUTRAL ? (
        <ArrowNeutral />
      ) : expectation === UP ? (
        <Moving htmlColor="#2AA45F" />
      ) : (
        <Moving
          sx={{
            transform: "rotateX(180deg)",
          }}
          htmlColor="#E55656"
        />
      )}
      <Typography
        pl={0.5}
        fontSize="0.813rem"
        color="#192231"
        variant="p"
        fontFamily="MinervaModern-Regular"
      >
        This property is expected to
        {cases[expectation]}
        in the next six months
      </Typography>
    </Box>
  );
}
