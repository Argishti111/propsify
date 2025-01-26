import { Box, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { getCitiesMarketInsights } from "../../../../services";
import { CityCard } from "./components";

export function MarketInsights() {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = useCallback(() => {
    getCitiesMarketInsights().then((data) => {
      setCities(data);
    });
  }, []);
  return (
    <>
      <Typography marginLeft={1} fontWeight="400" variant="h5">
        Market Insights
      </Typography>
      <Box
        marginTop={4}
        height="60%"
        mr={{ md: 1, sm: 0, xs: 0 }}
        display="flex"
        flexWrap="wrap"
        gap={{ md: 0, sm: 2, xs: 2 }}
      >
        {cities.map((city) => (
          <CityCard key={city.cityName} data={city} />
        ))}
      </Box>
    </>
  );
}
