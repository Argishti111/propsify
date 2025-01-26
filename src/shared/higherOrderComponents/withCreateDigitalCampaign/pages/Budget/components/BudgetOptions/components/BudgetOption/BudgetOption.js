import { Check } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React from "react";
import { numberWithCommas } from "../../../../../../../../helpers";
import "./BudgetOption.css";

export function BudgetOption({ index, onClick, selected, data }) {
  return (
    <Box
      mb={1}
      onClick={onClick}
      ml={{ md: 3, sm: 0, xs: 0 }}
      display="flex"
      justifyContent="space-between"
      className={`budget-option ${selected ? "active" : ""}`}
      alignItems={{ md: "center", sm: "start", xs: "start" }}
    >
      <Box>
        {index === 1 && (
          <Typography color="primary" variant="subtitle2" fontStyle="italic">
            Recommended for you
          </Typography>
        )}
        <Box display="flex" alignItems="flex-end">
          <Typography variant="h5" fontStyle="italic">
            ${data.amount}
          </Typography>
          <Typography
            ml={{ md: 4, sm: 1.5, xs: 1.5 }}
            variant="body2"
            fontWeight="400"
          >
            daily average - ${numberWithCommas(Math.round(data.amount * 30.4))}{" "}
            monthly max
          </Typography>
        </Box>
        {!!data.minimumClicks && !!data.maximumClicks && (
          <Typography display="block" mt={1} variant="p" color="#192231CC">
            Get an estimated {data.minimumClicks}-{data.maximumClicks} ad clicks
            each month
          </Typography>
        )}
      </Box>
      <Check className="check" color="primary" />
    </Box>
  );
}
