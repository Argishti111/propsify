import { Box } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import {
  CustomButton,
  Modal,
  TinyButton,
} from "../../../../../../shared/components";
import { useQuery } from "../../../../../../shared/hooks";
import {
  Filter,
  MinMaxDateFilter,
  MinMaxFilter,
  OptionFilter,
} from "./components";

const DEFAULT_FILTERS = {
  minLotSize: 0,
  maxLotSize: 0,
  maxPrice: 0,
  minPrice: 0,
  minSquareFeet: 0,
  maxSquareFeet: 0,
  startPeriod: null,
  endPeriod: null,
  exactMatchBedrooms: false,
  exactMatchBathrooms: false,
  bedrooms: null,
  bathrooms: null,
};

export function Filters({ open, onClose, onApply, selectedPlace }) {
  const query = useQuery();
  const navigate = useNavigate();
  const [minLotSize, setMinLotSize] = useState(
    +(query.get("minLotSize") ?? DEFAULT_FILTERS.minLotSize)
  );
  const [maxLotSize, setMaxLotSize] = useState(
    +(query.get("maxLotSize") ?? DEFAULT_FILTERS.maxLotSize)
  );
  const [minPrice, setMinPrice] = useState(
    +(query.get("minLotSize") ?? DEFAULT_FILTERS.minLotSize)
  );
  const [maxPrice, setMaxPrice] = useState(
    +(query.get("maxPrice") ?? DEFAULT_FILTERS.maxPrice)
  );
  const [minSquareFeet, setMinSquareFeetSize] = useState(
    +(query.get("minSquareFeet") ?? DEFAULT_FILTERS.minSquareFeet)
  );
  const [maxSquareFeet, setMaxSquareFeetSize] = useState(
    +(query.get("maxSquareFeet") ?? DEFAULT_FILTERS.maxSquareFeet)
  );
  const [startPeriod, setStartDate] = useState(
    query.get("startPeriod") ?? DEFAULT_FILTERS.startPeriod
  );
  const [endPeriod, setEndDate] = useState(
    query.get("endPeriod") ?? DEFAULT_FILTERS.endPeriod
  );
  const [exactMatchBedrooms, setUseExactBedroomCount] = useState(
    query.get("exactMatchBedrooms") == "true"
      ? true
      : DEFAULT_FILTERS.exactMatchBedrooms
  );
  const [exactMatchBathrooms, setUseExactBathroomCount] = useState(
    query.get("exactMatchBathrooms") == "true"
      ? true
      : DEFAULT_FILTERS.exactMatchBathrooms
  );
  const [bedrooms, setBedroomCount] = useState(
    query.get("bedrooms") ?? DEFAULT_FILTERS.bedrooms
  );
  const [bathrooms, setBathroomCount] = useState(
    query.get("bathrooms") ?? DEFAULT_FILTERS.bathrooms
  );

  const handleClear = useCallback(() => {
    onClose();
    setDefaultFilters();
  }, []);

  const handleApply = () => {
    // query.set("minLotSize", minLotSize ? minLotSize : "");
    // query.set("maxLotSize", maxLotSize ? maxLotSize : "");
    // query.set("maxPrice", maxPrice ? maxPrice : "");
    // query.set("minPrice", minPrice ? minPrice : "");
    // query.set("minSquareFeet", minSquareFeet ? minSquareFeet : "");
    // query.set("maxSquareFeet", maxSquareFeet ? maxSquareFeet : "");
    // query.set("startPeriod", startPeriod ?? "");
    // query.set("endPeriod", endPeriod ?? "");
    // query.set("exactMatchBedrooms", exactMatchBedrooms ?? "");
    // query.set("exactMatchBathrooms", exactMatchBathrooms ?? "");
    // query.set("bedrooms", bedrooms ? bedrooms : "");
    // query.set("bathrooms", bathrooms ? bathrooms : "");
    // navigate("/market-insights/properties?" + query.toString());

    selectedPlace.minLotSize = minLotSize === 0 ? null : minLotSize;
    selectedPlace.maxLotSize = maxLotSize === 0 ? null : maxLotSize;
    selectedPlace.maxPrice = maxPrice === 0 ? null : maxPrice;
    selectedPlace.minPrice = minPrice === 0 ? null : minPrice;
    selectedPlace.minSquareFeet = minSquareFeet === 0 ? null : minSquareFeet;
    selectedPlace.maxSquareFeet = maxSquareFeet === 0 ? null : maxSquareFeet;
    selectedPlace.startPeriod = startPeriod;
    selectedPlace.endPeriod = endPeriod;
    selectedPlace.exactMatchBedrooms = exactMatchBedrooms;
    selectedPlace.exactMatchBathrooms = exactMatchBathrooms;
    selectedPlace.bedrooms = bedrooms === 0 ? null : bedrooms;
    selectedPlace.bathrooms = bathrooms === 0 ? null : bathrooms;
    onClose();
    onApply(selectedPlace);
  };

  const setDefaultFilters = useCallback(() => {
    setMinLotSize(DEFAULT_FILTERS.minLotSize);
    setMaxLotSize(DEFAULT_FILTERS.maxLotSize);
    setMinPrice(DEFAULT_FILTERS.minLotSize);
    setMaxPrice(DEFAULT_FILTERS.maxPrice);
    setMinSquareFeetSize(DEFAULT_FILTERS.minSquareFeet);
    setMaxSquareFeetSize(DEFAULT_FILTERS.maxSquareFeet);
    setStartDate(DEFAULT_FILTERS.startPeriod);
    setEndDate(DEFAULT_FILTERS.endPeriod);
    setUseExactBedroomCount(DEFAULT_FILTERS.exactMatchBedrooms);
    setUseExactBathroomCount(DEFAULT_FILTERS.exactMatchBathrooms);
    setBedroomCount(DEFAULT_FILTERS.bedrooms);
    setBathroomCount(DEFAULT_FILTERS.bathrooms);
  }, []);

  return (
    <Modal
      onClose={onClose}
      PaperProps={{ sx: { maxWidth: 800 } }}
      maxWidth="lg"
      fullScreenOnSM
      titleChildren={<div />}
      title="Filters"
      open={open}
    >
      <Box
        display="inline-flex"
        px={{ md: 13, sm: 2, xs: 1 }}
        pt={4}
        pb={7}
        flexDirection="column"
        overflow="auto"
        style={containerStyle}
      >
        <MinMaxDateFilter
          startPeriod={startPeriod}
          endPeriod={endPeriod}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          title="Period"
        />
        <MinMaxFilter
          minValue={minPrice}
          maxValue={maxPrice}
          onMinChange={setMinPrice}
          onMaxChange={setMaxPrice}
          minItems={minPrices}
          maxItems={maxPrices}
          title="Price"
        />
        <MinMaxFilter
          minValue={minSquareFeet}
          maxValue={maxSquareFeet}
          onMinChange={setMinSquareFeetSize}
          onMaxChange={setMaxSquareFeetSize}
          minItems={minSquareFeets}
          maxItems={maxSquareFeets}
          title="Square feet"
        />
        <MinMaxFilter
          minValue={minLotSize}
          maxValue={maxLotSize}
          onMinChange={setMinLotSize}
          onMaxChange={setMaxLotSize}
          minItems={minLotSizes}
          maxItems={maxLotSizes}
          title="Lot size"
        />
        <OptionFilter
          useExact={exactMatchBedrooms}
          onExactChange={() => setUseExactBedroomCount((prev) => !prev)}
          selected={bedrooms}
          onSelect={setBedroomCount}
          title="Bedrooms"
        />
        <OptionFilter
          useExact={exactMatchBathrooms}
          onExactChange={() => setUseExactBathroomCount((prev) => !prev)}
          selected={bathrooms}
          onSelect={setBathroomCount}
          title="Bathrooms"
        />
        {/* <Filter py={4} borderBottom="1px solid #D8CFB4" title="Home type" /> */}
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        style={{ borderTop: "1px solid #e0d9c3" }}
      >
        <TinyButton sx={{ ml: 1 }} onClick={handleClear} color="secondary">
          CLEAR ALL
        </TinyButton>
        <CustomButton onClick={handleApply} sx={applyButtonStyle}>
          APPLY
        </CustomButton>
      </Box>
    </Modal>
  );
}

const applyButtonStyle = {
  height: "3.5rem",
  fontSize: "1.25rem",
  alignSelf: "flex-end",
  letterSpacing: "0.16rem",
  paddingLeft: "calc(16px + 0.16rem)",
  fontWeight: "450",
};

const containerStyle = {
  overflowX: "hidden",
  minWidth: 300,
  maxWidth: 800,
  width: "100%",
  height: "100%",
  marginBottom: 6,
};

const minPrices = [
  { id: 0, name: "No Min" },
  { id: 100000, name: "$100,000" },
  { id: 200000, name: "$200,000" },
  { id: 300000, name: "$300,000" },
  { id: 400000, name: "$400,000" },
  { id: 500000, name: "$500,000" },
  { id: 600000, name: "$600,000" },
  { id: 700000, name: "$700,000" },
  { id: 800000, name: "$800,000" },
  { id: 900000, name: "$900,000" },
  { id: 1000000, name: "$1,000,000" },
  { id: 1250000, name: "$1,250,000" },
  { id: 1500000, name: "$1,500,000" },
  { id: 1750000, name: "$1,750,000" },
  { id: 2000000, name: "$2,000,000" },
  { id: 2250000, name: "$2,250,000" },
  { id: 2500000, name: "$2,500,000" },
  { id: 2750000, name: "$2,750,000" },
  { id: 3000000, name: "$3,000,000" },
  { id: 4000000, name: "$4,000,000" },
  { id: 5000000, name: "$5,000,000" },
  { id: 6000000, name: "$6,000,000" },
  { id: 7000000, name: "$7,000,000" },
  { id: 8000000, name: "$8,000,000" },
  { id: 9000000, name: "$9,000,000" },
  { id: 10000000, name: "$10,000,000" },
];

const maxPrices = [
  { id: 100000, name: "$100,000" },
  { id: 200000, name: "$200,000" },
  { id: 300000, name: "$300,000" },
  { id: 400000, name: "$400,000" },
  { id: 500000, name: "$500,000" },
  { id: 600000, name: "$600,000" },
  { id: 700000, name: "$700,000" },
  { id: 800000, name: "$800,000" },
  { id: 900000, name: "$900,000" },
  { id: 1000000, name: "$1,000,000" },
  { id: 1250000, name: "$1,250,000" },
  { id: 1500000, name: "$1,500,000" },
  { id: 1750000, name: "$1,750,000" },
  { id: 2000000, name: "$2,000,000" },
  { id: 2250000, name: "$2,250,000" },
  { id: 2500000, name: "$2,500,000" },
  { id: 2750000, name: "$2,750,000" },
  { id: 3000000, name: "$3,000,000" },
  { id: 4000000, name: "$4,000,000" },
  { id: 5000000, name: "$5,000,000" },
  { id: 6000000, name: "$6,000,000" },
  { id: 7000000, name: "$7,000,000" },
  { id: 8000000, name: "$8,000,000" },
  { id: 9000000, name: "$9,000,000" },
  { id: 10000000, name: "$10,000,000" },
  { id: 0, name: "No Max" },
];

const minSquareFeets = [
  { id: 0, name: "No Min" },
  { id: 500, name: "500" },
  { id: 750, name: "750" },
  { id: 1000, name: "1,000" },
  { id: 1250, name: "1,250" },
  { id: 1500, name: "1,500" },
  { id: 1750, name: "1,750" },
  { id: 2000, name: "2,000" },
  { id: 2250, name: "2,250" },
  { id: 2500, name: "2,500" },
  { id: 2750, name: "2,750" },
  { id: 3000, name: "3,000" },
  { id: 3500, name: "3,500" },
  { id: 4000, name: "4,000" },
  { id: 5000, name: "5,000" },
  { id: 7500, name: "7,500" },
];

const maxSquareFeets = [
  { id: 500, name: "500" },
  { id: 750, name: "750" },
  { id: 1000, name: "1,000" },
  { id: 1250, name: "1,250" },
  { id: 1500, name: "1,500" },
  { id: 1750, name: "1,750" },
  { id: 2000, name: "2,000" },
  { id: 2250, name: "2,250" },
  { id: 2500, name: "2,500" },
  { id: 2750, name: "2,750" },
  { id: 3000, name: "3,000" },
  { id: 3500, name: "3,500" },
  { id: 4000, name: "4,000" },
  { id: 5000, name: "5,000" },
  { id: 7500, name: "7,500" },
  { id: 0, name: "No Max" },
];

const minLotSizes = [
  { id: 0, name: "No Min" },
  { id: 1000, name: "1,000 sqft" },
  { id: 2000, name: "2,000 sqft" },
  { id: 3000, name: "3,000 sqft" },
  { id: 4000, name: "4,000 sqft" },
  { id: 5000, name: "5,000 sqft" },
  { id: 7500, name: "7,500 sqft" },
  { id: 10890, name: "1/4 acre/10,890 sqft" },
  { id: 21780, name: "1/2 acre" },
  { id: 43560, name: "1 acre" },
  { id: 87120, name: "2 acres" },
  { id: 217800, name: "5 acres" },
  { id: 435600, name: "10 acres" },
  { id: 871200, name: "20 acres" },
  { id: 2178000, name: "50 acres" },
  { id: 4356000, name: "100 acres" },
];

const maxLotSizes = [
  { id: 1000, name: "1,000 sqft" },
  { id: 2000, name: "2,000 sqft" },
  { id: 3000, name: "3,000 sqft" },
  { id: 4000, name: "4,000 sqft" },
  { id: 5000, name: "5,000 sqft" },
  { id: 7500, name: "7,500 sqft" },
  { id: 10890, name: "1/4 acre/10,890 sqft" },
  { id: 21780, name: "1/2 acre" },
  { id: 43560, name: "1 acre" },
  { id: 87120, name: "2 acres" },
  { id: 217800, name: "5 acres" },
  { id: 435600, name: "10 acres" },
  { id: 871200, name: "20 acres" },
  { id: 2178000, name: "50 acres" },
  { id: 4356000, name: "100 acres" },
  { id: 0, name: "No Max" },
];
