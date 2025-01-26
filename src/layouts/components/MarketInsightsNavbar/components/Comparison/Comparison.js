import { Box } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import {
  CustomButton,
  Modal,
  ModalLoading,
} from "../../../../../shared/components";
import { CustomSelect } from "../../../../../shared/components/Form";
import { connect } from "react-redux";
import {
  setComparisonOpen,
  setFindSellersOrBuyers,
} from "../../../../../redux";
import {
  ComparisonHeader,
  ComparisonEmptySpace,
  ComparisonSection,
  ComparisonDivider,
} from "./components";
import "./Comparison.css";
import { useFetch } from "../../../../../shared/hooks";
import { getMarketComparison } from "../../../../../services";
import {
  periods,
  OVERVIEW,
  LISTING_TRENDS,
  LOCAL_DNA,
  MARKET_ACTIVITY,
  SALES_TRENDS,
} from "./data";
import { convertMarketInsights } from "../../../../../shared/helpers";
const mapStateToProps = (state) => {
  return {
    open: state.marketInsights.comparisonOpen,
    selectedPlaces: state.marketInsights.selectedPlaces,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setComparisonOpen: (payload) => dispatch(setComparisonOpen(payload)),
    setFindSellersOrBuyers: (data) => dispatch(setFindSellersOrBuyers(data)),
  };
};

const defaultPeriod = { id: "1mo", name: "Last month" };

export const Comparison = connect(
  mapStateToProps,
  mapDispatchToProps
)(
  ({
    open,
    setComparisonOpen,
    setCompareOpen,
    selectedPlaces,
    setFindSellersOrBuyers,
  }) => {
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [period, setPeriod] = useState(defaultPeriod);

    const { data, loading, fetchData } = useFetch(getMarketComparison, []);
    const [convertedData, setConvertedData] = useState({});

    const closeModal = useCallback(() => {
      setComparisonOpen({ open: false });
    }, []);

    useEffect(() => {
      if (open) {
        fetchData({
          period: period.id,
          zipCodeIds: selectedPlaces.zipCodes.map((zip) => zip.id),
          cityIds: selectedPlaces.cities.map((city) => city.id),
        });
      } else {
        setPeriod(defaultPeriod);
      }
    }, [open, period]);

    useEffect(() => {
      if (data.length) {
        setConvertedData({
          OVERVIEW: convertMarketInsights(OVERVIEW, data),
          LISTING_TRENDS: convertMarketInsights(LISTING_TRENDS, data),
          SALES_TRENDS: convertMarketInsights(SALES_TRENDS, data),
          LOCAL_DNA: convertMarketInsights(LOCAL_DNA, data),
          MARKET_ACTIVITY: convertMarketInsights(MARKET_ACTIVITY, data),
        });
      }
    }, [data]);

    if (!open) {
      return null;
    }

    if (loading || !data.length) {
      return <ModalLoading />;
    }

    const getCityAndZipCode = () => {
      // find city
      let city = selectedPlaces.cities.find(
        (c) =>
          c.id === +selectedPlace ||
          c.zipCodes.includes((z) => z.id === +selectedPlace)
      )?.name;

      // find zipCode
      let zipCode = selectedPlaces.zipCodes.find(
        (z) => z.id === +selectedPlace
      );
      if (!city) {
        city = zipCode.city.name;
      }

      zipCode = zipCode?.code;
      return [city, zipCode];
    };

    const findBuyers = () => {
      const [city, zipCode] = getCityAndZipCode();
      setComparisonOpen(false);
      setFindSellersOrBuyers({
        open: true,
        city,
        zipCode,
        sellers: false,
      });
    };

    const findSellers = () => {
      const [city, zipCode] = getCityAndZipCode();
      setComparisonOpen(false);
      setFindSellersOrBuyers({
        open: true,
        city,
        zipCode,
        sellers: true,
      });
    };

    return (
      <Modal
        open={open}
        onClose={closeModal}
        maxWidth="lg"
        fullScreenOnSM
        titleProps={{ sx: { display: { md: "table", xs: "none" } } }}
        PaperProps={{
          style: {
            // height: "100vh",
            overflowY: "hidden",
          },
          sx: {
            maxHeight: "calc(100vh - 8px)",
          },
        }}
        title="Comparison"
        titleChildren={
          <CustomSelect selectedItem={period.name}>
            {periods.map((p) => (
              <a key={p.id} onClick={() => setPeriod(p)} href="#">
                {p.name}
              </a>
            ))}
          </CustomSelect>
        }
      >
        <Box
          sx={{
            height: "100%",
            overflowX: "auto",
            overflowY: "hidden",
          }}
        >
          <table
            cellSpacing="0"
            cellPadding="0"
            className="comparison"
            style={{
              marginLeft: 30,
              marginRight: 6,
              maxWidth: 800,
              minWidth: 800,
              marginBottom: -7,
            }}
          >
            <ComparisonHeader
              onViewDetails={closeModal}
              cities={selectedPlaces.cities}
              zipCodes={selectedPlaces.zipCodes}
              setPlace={setSelectedPlace}
            />
            <tbody
              style={{
                overflowY: "scroll",
                paddingRight: 6,
              }}
            >
              <ComparisonSection
                items={convertedData.OVERVIEW}
                data={data}
                title="Overview"
              />
              <ComparisonDivider data={data} />
              <ComparisonSection
                items={convertedData.LISTING_TRENDS}
                data={data}
                title="Listing trends"
              />
              <ComparisonDivider data={data} />
              <ComparisonSection
                items={convertedData.SALES_TRENDS}
                data={data}
                title="Sales trends"
              />
              <ComparisonDivider data={data} />
              <ComparisonSection
                items={convertedData.LOCAL_DNA}
                data={data}
                title="Local DNA"
              />
              <ComparisonDivider data={data} />
              <ComparisonSection
                items={convertedData.MARKET_ACTIVITY}
                data={data}
                title="Market activity"
              />
              <ComparisonEmptySpace items={data} />
            </tbody>
          </table>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          // pb={1}
          sx={{ background: "white" }}
          style={{ borderTop: "1px solid #dfd8c1" }}
        >
          <CustomButton
            onClick={() => {
              setCompareOpen(true);
              closeModal();
            }}
            style={{ paddingLeft: 30, paddingRight: 30 }}
            color="secondary"
          >
            Edit
          </CustomButton>
          <fieldset
            disabled={!selectedPlace}
            style={{ border: "none", width: "60%" }}
          >
            <Box display="flex" height="100%">
              <CustomButton
                onClick={findBuyers}
                sx={buttonStyle}
                style={{ marginRight: 8 }}
              >
                FIND BUYERS
              </CustomButton>
              <CustomButton onClick={findSellers} sx={buttonStyle}>
                FIND SELLERS
              </CustomButton>
            </Box>
          </fieldset>
        </Box>
      </Modal>
    );
  }
);

const buttonStyle = {
  fontSize: { sm: 20, xs: 12 },
  width: "50%",
  height: "100%",
  letterSpacing: 2,
  whiteSpace: "nowrap",
};
