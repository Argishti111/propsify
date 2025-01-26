import { Box, Typography } from "@mui/material";
import React, { useMemo } from "react";

export function BuyerInsightsItem({
  data,
  names,
  Chart,
  title,
  groupName,
  subtitle,
  chartDataWrapper = (data) => data,
  chartProps,
  containerStyle,
}) {
  const formatedData = useMemo(() => {
    let result = [];
    for (let name of names) {
      if (data[name]) result.push(data[name]);
    }
    return result;
  }, []);
  if (!formatedData.length) {
    return null;
  }
  return (
    <Box
      py={7}
      style={containerStyle}
      className="border-bottom border-gradient"
    >
      <Typography
        variant="subtitle1"
        fontWeight="500"
        color="#000000"
        fontStyle="italic"
      >
        {groupName ?? formatedData[0].group_name}
      </Typography>
      {formatedData[0].value_description &&
        formatedData[0].value_description.split("\\n ").map((t) => (
          <Typography key={t} variant="p" display="block" color="#00000099">
            • &nbsp;{t}
          </Typography>
        ))}
      <Chart
        data={chartDataWrapper(formatedData.map((item) => item.data))}
        title={title}
        subtitle={subtitle}
        {...chartProps}
      />
    </Box>
  );
}
