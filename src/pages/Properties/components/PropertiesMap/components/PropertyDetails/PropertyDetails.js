import { ArrowBack, Close } from "@mui/icons-material";
import { Box } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { useNavigate } from "react-router";
import { setFindSellersOrBuyers } from "../../../../../../redux";
import { getPropertyDetails } from "../../../../../../services";
import {
  CustomButton,
  FindSellersOrBuyersOptions,
  ModalLoading,
  Navbar,
} from "../../../../../../shared/components";
import { useNavbarEvents } from "../../../../../../shared/hooks";
import {
  HOAInformation,
  LocationInformation,
  OwnershipInformation,
  PropertyCharacteristics,
  PropertyOverview,
  PropertyValue,
  TAMHistory,
} from "./components";
import "./PropertyDetails.css";

const sections = [
  { id: "overview", name: "PROPERTY OVERVIEW" },
  { id: "value", name: "PROPERTY VALUE" },
  { id: "ownership", name: "OWNERSHIP INFORMATION" },
  { id: "characteristics", name: "PROPERTY CHARACTERISTICS" },
  { id: "location", name: "LAND/LOCATION INFORMATION" },
  { id: "tam", name: "TRANSACTION AND MORTGAGE HISTORY" },
];

const mapDispatchToProps = (dispatch) => {
  return {
    setFindSellersOrBuyers: (data) => dispatch(setFindSellersOrBuyers(data)),
  };
};
export const PropertyDetails = connect(
  null,
  mapDispatchToProps
)(({ propertyId, setFindSellersOrBuyers, setPropertyId }) => {
  const [data, setData] = useState({ property_history: [] });
  const [loading, setLoading] = useState(false);
  const containerRef = useRef();
  const navbarRef = useRef();
  const navigate = useNavigate();

  const { currentSection, setCurrentSection, handleScroll } =
    useNavbarEvents("overview");

  useEffect(() => {
    if (propertyId) {
      containerRef.current.scroll(0, 0);
      navbarRef.current.scroll(0, 0);
      fetchData(propertyId);
      setCurrentSection("overview");
    }
  }, [propertyId]);

  const fetchData = useCallback((id) => {
    setLoading(true);
    getPropertyDetails(id)
      .then((data) => {
        setData(data);
      })
      .catch(() => {
        setPropertyId(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleClose = useCallback(() => {
    setPropertyId(0);
    setLoading(false);
  }, []);

  const findSellers = useCallback(() => {
    setFindSellersOrBuyers({
      open: true,
      city: data.value_text,
      zipCode: "",
      sellers: false,
    });
  }, [data]);

  const handleAnalizeBuyers = useCallback(() => {
    handleClose();
    navigate(`/market-insights/buyers-insights?entityId=${data.zip_entityid}`);
  }, [data]);

  return ReactDOM.createPortal(
    <>
      {loading && <ModalLoading centerOfContent />}
      {!!propertyId && (
        <Box
          position="fixed"
          top={0}
          zIndex={4}
          left={{ lg: "20%", md: 0 }}
          height="100vh"
          width="100vw"
        ></Box>
      )}
      <Box
        width={{
          md: "90%",
          sm: "100%",
          xs: "100%",
        }}
        className={`property-details ${
          (!propertyId && !loading) || loading ? "" : "property-details-open"
        }`}
      >
        <Box
          ref={navbarRef}
          display="flex"
          height={56}
          px={{ md: 3, sm: 1, xs: 1 }}
          sx={{
            borderBottom: "1px solid #D8CFB4",
          }}
          alignItems="center"
          justifyContent="space-between"
        >
          <Close htmlColor="#BEB082" sx={closeStyle} onClick={handleClose} />
          <Box display="flex" gap={2}>
            <CustomButton
              onClick={handleAnalizeBuyers}
              variant="outlined"
              sx={buttonSx}
            >
              ANALYZE BUYERS
            </CustomButton>
            <CustomButton onClick={findSellers} sx={buttonSx}>
              FIND BUYERS
            </CustomButton>
          </Box>
        </Box>
        <Navbar items={sections} currentSection={currentSection} />
        <Box
          ref={containerRef}
          onScroll={handleScroll}
          sx={{ overflowY: "scroll" }}
          pb={8}
          height="85vh"
          pt={2}
          px={{ md: 3, sm: 1, xs: 1 }}
        >
          <PropertyOverview propertyId={propertyId} data={data} />
          <PropertyValue data={data} />
          <OwnershipInformation data={data} />
          <PropertyCharacteristics data={data} />
          <LocationInformation data={data} />
          {/* <HOAInformation data={data} /> */}
          <TAMHistory data={data} />
        </Box>
      </Box>
    </>,
    document.getElementById("modal-portal")
  );
});
const closeStyle = {
  cursor: "pointer",
  "&:hover": {
    color: "#192231",
  },
};

const buttonSx = {
  borderRadius: "2px !important",
  letterSpacing: "0.08em",
};
