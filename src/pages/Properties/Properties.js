import React, { useCallback, useState } from "react";
import { motion } from "framer-motion";
import "./Properties.css";
import { TopNavbar } from "../../layouts/components";
import { Box, Typography } from "@mui/material";
import { PropertiesMap, SearchInput } from "./components";
import { useNavigate } from "react-router";
import { useQuery } from "../../shared/hooks";
import { CustomSelect } from "../../shared/components/Form";

export function Properties() {
  const query = useQuery();
  const [reportingPeriod, setReportingPeriod] = useState({
    id: 1,
    name: "Recently Sold",
  });
  const [selectedPlace, setSelectedPlace] = useState(getSelectedPlace(query));
  const navigate = useNavigate();

  const handleSearch = useCallback((value) => {
    query.set("searchText", value.values);
    query.set("isFullAddress", value.isFullAddress);
    setSelectedPlace(value);
    // setOtherFilters(value);
    navigate("/market-insights/properties?" + query.toString());
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 1 }}
        className="home"
        style={{ margin: 0 }}
      >
        <TopNavbar
          containerStyle={{
            margin: "0 12px",
            gap: 8,
          }}
          navbarStyle={{
            display: "flex",
            flexWrap: "wrap",
            rowGap: 16,
          }}
          title="Property Insights"
          actions={
            !!selectedPlace.values && (
              <CustomSelect
                selectedItem={reportingPeriod.name}
                sx={{ width: 160, height: "2.5rem" }}
              >
                {reportingPeriods.map((period) => (
                  <a
                    key={period.id}
                    className={period.disabled ? "disabled" : ""}
                    onClick={() => setReportingPeriod(period)}
                    href="#"
                  >
                    {period.name}
                  </a>
                ))}
                {/* <a style={{ borderTop: "1px solid #ecd9cc" }} href="#">
            + Add Cities //TODO: Removed for mvp
          </a> */}
              </CustomSelect>
            )
          }
        ></TopNavbar>
        {selectedPlace.values ? (
          <PropertiesMap
            selectedPlace={selectedPlace}
            onSearch={handleSearch}
          />
        ) : (
          <Box className="properties-container">
            <Typography
              fontFamily="MinervaModern-Regular"
              variant="h4"
              color="#ffffff"
              textAlign="center"
              mb={7}
              px={1}
            >
              RESEARCH PROPERTIES
            </Typography>
            <SearchInput
              containerStyle={{ px: 1 }}
              autoFocus
              onSearch={handleSearch}
            />
          </Box>
        )}
      </motion.div>
    </>
  );
}

const reportingPeriods = [
  {
    id: 1,
    name: "Recently Sold",
  },
  {
    id: 2,
    name: "For sale",
    disabled: true,
  },
];

function getSelectedPlace(query) {
  let values = query.get("searchText"),
    isFullAddress = query.get("isFullAddress") == "true",
    startPeriod = query.get("startPeriod") ?? null,
    endPeriod = query.get("endPeriod") ?? null,
    minPrice = query.get("minPrice") ?? null,
    maxPrice = query.get("maxPrice") ?? null,
    minSquareFeet = query.get("minSquareFeet") ?? null,
    maxSquareFeet = query.get("maxSquareFeet") ?? null,
    minLotSize = query.get("minLotSize") ?? null,
    maxLotSize = query.get("maxLotSize") ?? null,
    bedrooms = query.get("bedrooms") ?? null,
    exactMatchBadrooms = query.get("exactMatchBadrooms") == "true",
    bathrooms = query.get("bathrooms") ?? null,
    exactMatchBathrooms = query.get("isFullAddress") == "true";

  return {
    values,
    isFullAddress,
    startPeriod,
    endPeriod,
    minPrice: minPrice ? +minPrice : null,
    maxPrice: maxPrice ? +maxPrice : null,
    minSquareFeet: minSquareFeet ? +minSquareFeet : null,
    maxSquareFeet: maxSquareFeet ? +maxSquareFeet : null,
    minLotSize: minLotSize ? +minLotSize : null,
    maxLotSize: maxLotSize ? +maxLotSize : null,
    bedrooms: bedrooms ? +bedrooms : null,
    exactMatchBadrooms,
    bathrooms: bathrooms ? Number(bathrooms) : null,
    exactMatchBathrooms,
  };
}
