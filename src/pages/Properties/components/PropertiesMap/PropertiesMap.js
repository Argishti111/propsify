import React, { useCallback, useEffect, useMemo, useState } from "react";
import GoogleMapReact from "google-map-react";
import "./PropertiesMap.css";
import { FilterButton, Filters, Marker, PropertyDetails } from "./components";
import { SearchInput } from "../SearchInput";
import { Box } from "@mui/material";
import { getPropeties } from "../../../../services";
import {
  CustomButton,
  FindSellersOrBuyersOptions,
  ModalLoading,
} from "../../../../shared/components";
import { connect } from "react-redux";
import { setFindSellersOrBuyers } from "../../../../redux";
import { setLoading } from "../../../../redux/marketInsights/actions/setLoading";

const defaultProps = {
  center: { lat: 37.0902, lng: -95.7129 },
  zoom: 5,
  maxZoom: 22,
};

const REGION_ZOOM = 8;
const mapDispatchToProps = (dispatch) => {
  return {
    setFindSellersOrBuyers: (data) => dispatch(setFindSellersOrBuyers(data)),
  };
};

export const PropertiesMap = connect(
  null,
  mapDispatchToProps
)(({ selectedPlace, onSearch, setFindSellersOrBuyers }) => {
  const [propertyId, setPropertyId] = useState(0);
  const [filterOpen, setFilterOpen] = useState(false);
  const [properties, setProperties] = useState([]);
  const [map, setMap] = useState(null);
  const [maps, setMaps] = useState(null);
  const [showMarkers, setShowMarkers] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleFilterClose = useCallback(() => {
    setFilterOpen(false);
  }, []);
  const [filteredProperties, setFilteredProperties] = useState([]);

  useEffect(() => {
    if (map && maps) handleGetProperties(selectedPlace, map, maps);
  }, [selectedPlace, map, maps]);

  const findBuyers = useCallback(
    (e) => {
      e.preventDefault();
      setFindSellersOrBuyers({
        open: true,
        city: selectedPlace.values,
        zipCode: "",
        sellers: false,
      });
    },
    [selectedPlace]
  );

  const handleGetProperties = useCallback((selectedPlace, map, maps) => {
    selectedPlace.searchText = selectedPlace.values;
    setLoading(true);
    getPropeties(selectedPlace)
      .then((data = []) => {
        // setMarkersOfProperties(data, map, maps);
        setProperties(data);
        if (data?.length) {
          if (data.length === 1) {
            setPropertyId(data[0].entityid);
          }
          zoomToPlace(map, data[0].latitude, data[0].longitude);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const zoomToPlace = useCallback(
    (map, lat, lng, zoom = 18) => {
      map.setZoom(zoom);
      map.setCenter({
        lat,
        lng,
      });
    },
    [map]
  );

  const handleGoogleApiLoad = useCallback((google) => {
    const map = google.map;
    setMap(map);
    setMaps(google.maps);
    const styledMapType = new google.maps.StyledMapType(mapStyles, {
      name: "Styled Map",
    });

    map.mapTypes.set("styled_map", styledMapType);
    map.setMapTypeId("styled_map");

    map.data.setStyle((feature) => {
      const fillColor = feature.getProperty("fillColor");
      const strokeColor = feature.getProperty("strokeColor"); //
      return {
        fillColor: fillColor ? fillColor : "transparent",
        // strokeColor: strokeColor ? strokeColor : "black",
        strokeWeight: 0.5,
      };
    });

    map.data.addListener("mouseover", (event) => {
      if (map.zoom < REGION_ZOOM) {
        event.feature.setProperty("fillColor", "#00ff0044");
      }
    });
    map.data.addListener("mouseout", (event) => {
      event.feature.setProperty("fillColor", "transparent");
    });
    map.data.addListener("click", (event) => {
      if (map.zoom < REGION_ZOOM) {
        event.feature.setProperty("strokeColor", "blue");
        map.setZoom(REGION_ZOOM);
        map.setCenter(event.latLng);
      }
    });
    map.data.loadGeoJson(
      //Replace with url of GeoJSON on your server
      "/data/states.json"
    );
  }, []);

  const filterPropertiesByBounds = useCallback(
    (bounds, zoomLevel) => {
      let result = [];

      if (zoomLevel < 13 && properties.length > 0) {
        const property = properties[0];
        property.clustered = true;
        property.count = properties.length;
        result.push(property);
        return result;
      }

      properties.forEach((property, index) => {
        if (
          bounds.ne.lng >= property.longitude &&
          bounds.sw.lng <= property.longitude &&
          bounds.ne.lat >= property.latitude &&
          bounds.sw.lat <= property.latitude
        ) {
          property.count = 1;
          if (index) {
            if (
              checkIfPropertiesAreClose(
                property,
                properties[index - 1],
                zoomLevel
              )
            ) {
              result.push(property);
            } else {
              result[result.length - 1].clustered = true;
              result[result.length - 1].count++;
            }
          } else {
            result.push(property);
          }
        }
      });
      return result;
    },
    [properties]
  );

  const checkIfPropertiesAreClose = useCallback(
    (property, secondProperty, zoomLevel) => {
      if (zoomLevel > 18) {
        return true;
      }

      if (zoomLevel < 13) {
        return false;
      }
      if (zoomLevel < 16) {
        return (
          Math.abs(secondProperty.latitude - property.latitude) / zoomLevel <
            0.00001 &&
          Math.abs(secondProperty.longitude - property.longitude) / zoomLevel <
            0.00001
        );
      }
      return (
        Math.abs(secondProperty.latitude - property.latitude) / zoomLevel <
          0.00009 &&
        Math.abs(secondProperty.longitude - property.longitude) / zoomLevel <
          0.00009
      );
    },
    []
  );

  const handleSearch = useCallback((value) => {
    setPropertyId(0);
    onSearch(value);
  }, []);

  const handleMapZoom = (e) => {
    if ((map, maps)) {
      setShowMarkers(true);
      let res = filterPropertiesByBounds(e.bounds, e.zoom);
      setFilteredProperties(res);
    }
  };

  return (
    <div className="map-container" style={{ width: "100%" }}>
      <FindSellersOrBuyersOptions />
      {loading && <ModalLoading />}
      <Filters
        onApply={(place) => handleGetProperties(place, map, maps)}
        open={filterOpen}
        selectedPlace={selectedPlace}
        onClose={handleFilterClose}
      />
      <Box
        display="flex"
        sx={{ width: "100%" }}
        justifyContent="space-between"
        flexWrap="wrap"
        flexDirection="row"
        zIndex={4}
        py={1.2}
        gap={1}
        px={{ lg: 3, md: 3, sm: 2, xs: 1.5 }}
      >
        <SearchInput
          containerStyle={searchInputContainerStyle}
          onSearch={handleSearch}
          inputStyle={{ height: 17 }}
          sx={{ maxWidth: { lg: 303, md: 303, sm: "none", xs: "none" } }}
          disabled={!!propertyId}
          defaultValue={selectedPlace.values}
        />
        <Box
          display="flex"
          flexDirection="row"
          gap={{ lg: 4, md: 2, sm: 2, xs: 0.5 }}
          width="100%"
          maxWidth={{ lg: 400, md: 400, sm: "none", xs: "none" }}
          height={40}
          justifyContent={{
            lg: "flex-end",
            md: "flex-end",
            sm: "space-between",
            xs: "space-between",
          }}
          alignSelf="flex-end"
        >
          <CustomButton onClick={findBuyers} sx={findBuyersButtonSX}>
            FIND BUYERS
          </CustomButton>
          <FilterButton onClick={() => setFilterOpen(true)} />
        </Box>
        <PropertyDetails
          propertyId={propertyId}
          setPropertyId={setPropertyId}
        />
      </Box>
      <Box height="100%" borderTop="1px solid #BEB082">
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_KEY }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
          onGoogleApiLoaded={handleGoogleApiLoad}
          onChange={handleMapZoom}
        >
          {showMarkers &&
            filteredProperties.map((property) => {
              return (
                <Marker
                  onGroupClick={(item) =>
                    zoomToPlace(map, item.latitude, item.longitude, 19)
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    setPropertyId(property.entityid);
                  }}
                  key={property.entityid}
                  data={property}
                  lat={property.latitude}
                  lng={property.longitude}
                />
              );
            })}
        </GoogleMapReact>
      </Box>
    </div>
  );
});

const searchInputContainerStyle = {
  justifyContent: "start",
  flexDirection: "row",
  width: "100%",
  maxWidth: { lg: 303, md: 303, sm: "none", xs: "none" },
};

const findBuyersButtonSX = {
  width: "100% !important",
  maxWidth: "200px !important",
  height: "40px !important",
  fontSize: "0.813rem",
  fontWeight: "450",
  letterSpacing: "0.08rem",
  lineHeight: 1,
  fontFamily: "MinervaModern-Regular !important",
};

const mapStyles = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#F5F5F5",
      },
    ],
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#F5F5F5",
      },
    ],
  },
  {
    featureType: "administrative.country",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#D7EFDB",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#BDBDBD",
      },
    ],
  },
  {
    featureType: "administrative.province",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#D7EFDB",
      },
    ],
  },
  {
    featureType: "landscape.man_made",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#F8F7F7",
      },
    ],
  },
  {
    featureType: "landscape.natural",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#CDE9D8",
      },
    ],
  },
  {
    featureType: "landscape.natural.terrain",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#D7EFDB",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        color: "#EEEEEE",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#C9E9D1",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9E9E9E",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#FFFFFF",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#E9E2CD",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#D8CFB4",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#E8E8E8",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9E9E9E",
      },
    ],
  },
  {
    featureType: "transit.line",
    elementType: "geometry",
    stylers: [
      {
        color: "#E5E5E5",
      },
    ],
  },
  {
    featureType: "transit.station",
    elementType: "geometry",
    stylers: [
      {
        color: "#EEEEEE",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#C9C9C9",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#CDDFE9",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9E9E9E",
      },
    ],
  },
];
