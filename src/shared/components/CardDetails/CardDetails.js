import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { CitiesAndZipCodes, Info, Chart } from "..";
import { setCardDetailsOpen } from "../../../redux";
import { DialogCloseIcon } from "../../static/icons";
import { Box, Slide, Dialog, Typography, Grid } from "@mui/material";
import { useFetch } from "../../hooks";
import { getMetricData } from "../../../services";
import { Loading } from "../Loading";
import { ChangePercent } from "./components";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const mapStateToProps = (state) => {
  return {
    selectedCard: state.marketInsights.selectedCard,
    city: state.marketInsights.city,
    zipCode: state.marketInsights.zipCode,
    open: state.marketInsights.cardDetailsOpen,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setOpen: (open) => dispatch(setCardDetailsOpen({ open })),
  };
};
export const CardDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ open, setOpen, selectedCard, city, zipCode }) => {
  // fetching data
  const { data, fetchData, loading } = useFetch(getMetricData, {
    metricDatas: [],
  });
  // setting the zipCode or city
  const [selectedPlace, setSelectedPlace] = useState(
    zipCode.id ? zipCode : city
  );
  const [displayDate, setDisplayDate] = useState("");

  useEffect(() => {
    if (data.metricDatas.length > 0) {
      // setting the last date
      let last = data.metricDatas[data.metricDatas.length - 1];
      let lastDate = last.date;
      let [month, year] = lastDate.split(" ");
      setDisplayDate(`${month} 20${year}`);
    }
  }, [data]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelect = ({ selectedCity, selectedZipCode }) => {
    let entityId;
    // set entity id of zipCode or city
    if (selectedZipCode.id) {
      entityId = selectedZipCode.id;
      selectedZipCode.cityName = selectedCity.name;
      setSelectedPlace(selectedZipCode);
    } else {
      entityId = selectedCity.id;
      setSelectedPlace(selectedCity);
    }

    fetchData({
      datapointId: selectedCard.id,
      entityId,
    });
  };

  return (
    <Dialog
      PaperProps={{ style: { overflowX: "hidden" } }}
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      {loading && <Loading />}
      <Box style={loading ? { display: "none" } : { padding: 32 }}>
        <Grid display="flex" flexWrap="wrap">
          <Grid item lg={5}>
            <Typography fontStyle="italic" fontWeight="500" variant="p">
              {selectedPlace.cityName
                ? `${selectedPlace.cityName}/${selectedPlace.code}`
                : selectedPlace.name}
            </Typography>
            <Box display="flex" mr={3}>
              <Typography fontStyle="italic" mr={2} variant="h5">
                {selectedCard.name}
              </Typography>
              <Info style={{ marginTop: 6 }} value={selectedCard.description} />
            </Box>

            <Typography color="#192231CC" fontSize={15} variant="p">
              Last updated: {displayDate}
            </Typography>
            <Box
              my={2}
              className="w-100"
              alignItems="center"
              flexWrap={{ xs: "wrap", sm: "nowrap" }}
              display="flex"
            >
              <ChangePercent
                percent={data.changeLastYear}
                measure={data.measure}
                title="change since last year"
                style={{ marginRight: 10 }}
              />
              <div
                style={{
                  // height: 20,
                  width: 120,
                }}
              />
              <ChangePercent
                measure={data.measure}
                percent={data.changeLastMonth}
                title="change since last month"
              />
            </Box>
          </Grid>
          <Grid
            item
            lg={7}
            display="flex"
            justifyContent="flex-end"
            flexWrap="wrap"
            alignItems="baseline"
          >
            <Box display="flex" alignItems="center" mr={3}>
              <CitiesAndZipCodes
                initialCity={city}
                initialZipCode={zipCode}
                loading={loading}
                onSelect={handleSelect}
                dontTakeFromQuery
                hidePeriod
              />
            </Box>
          </Grid>
        </Grid>
        {!!data.metricDatas.length && !loading && (
          <Chart
            title={selectedCard.name}
            y={selectedCard.maxValue ? { max: selectedCard.maxValue } : {}}
            data={data.metricDatas}
          />
        )}
      </Box>
      <DialogCloseIcon
        className="card-details-close-icon"
        style={styles.closeIcon}
        onClick={handleClose}
      />
    </Dialog>
  );
});

const styles = {
  closeIcon: {
    position: "absolute",
    top: "2.4rem",
    right: "1.5rem",
  },
};
