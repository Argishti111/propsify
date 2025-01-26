import { Grid, Typography } from "@mui/material";
import React, { useCallback, useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { setCardDetailsOpen } from "../../../redux";
import { Info } from "../Info";
import "./Card.css";

const mapDispatchToProps = (dispatch) => {
  return {
    setOpen: (open, selectedCard) =>
      dispatch(setCardDetailsOpen({ open, selectedCard })),
  };
};

export const Card = connect(
  null,
  mapDispatchToProps
)(({ id, xl = 4, percent = "%", data, name, setOpen, maxValue }) => {
  const [height, setHeight] = useState(0);
  const [hiddenHeight, setHiddenHeight] = useState(0);
  const hiddenRef = useRef();
  const [width, setWidth] = useState(0);
  const [card, setCard] = useState(null);
  const [updatedDate, setUpdatedDate] = useState("");
  const [ratio, setRatio] = useState(0);

  const cardRef = useCallback(
    (node, changedRatio = 1) => {
      if (node && changedRatio !== ratio) {
        setRatio(changedRatio);
        setWidth(node.getBoundingClientRect().width);
        setHeight(node.getBoundingClientRect().height / changedRatio);
        setCard(node);
      }
    },
    [height, ratio]
  );

  const mouseEnter = useCallback(
    (e) => {
      if (card) {
        setWidth(card.getBoundingClientRect().width);
        setTimeout(() => {
          setHiddenHeight(
            hiddenRef.current.getBoundingClientRect().height + 16
          );
          setTimeout(() => {
            setHiddenHeight("auto");
          }, 300);
        }, 0);

        e?.stopPropagation();
      }
    },
    [card, hiddenRef]
  );

  const mouseOut = useCallback((e) => {
    setHiddenHeight(hiddenRef.current.getBoundingClientRect().height + 16);
    setTimeout(() => {
      setHiddenHeight(0);
    }, 0);
  }, []);

  useEffect(() => {
    if (data) {
      let dateArray = new Date(data.updatedDate).toDateString().split(" ");
      dateArray.shift();
      setUpdatedDate(dateArray.join(" "));
    }
  }, [data]);

  data = !!data ? data : {};
  let lesser = data.prcChange < 0;

  const handleOpenCardDetails = () => {
    setOpen(true, {
      id: data.id,
      name,
      description: data.description,
      maxValue,
    });
  };

  if (!data.displayValue) {
    return null;
  }
  return (
    <>
      <Grid
        className="card-wrapper"
        style={{ width: "100%", height: height * 1.6, cursor: "pointer" }}
        item
        lg={xl}
        xl={xl}
        md={6}
      >
        <div
          onClick={handleOpenCardDetails}
          onMouseEnter={mouseEnter}
          onMouseLeave={mouseOut}
          ref={(node) => window.innerWidth > 899 && cardRef(node)}
          className="card"
        >
          <Grid className="flex-row-between card-hover">
            <Typography
              className="card-title"
              variant="h6"
              fontSize="1.063rem"
              fontWeight="500"
              color="#192231CC"
            >
              {name}
            </Typography>
            <Info value={data.description} style={{ marginTop: 3 }} />
          </Grid>
          <div className="flex-row card-hover card-value-container ">
            <Typography
              fontFamily="MinervaModern-Regular"
              variant="h4"
              className="card-value"
            >
              {data?.displayValue}
            </Typography>
            <Typography
              variant="p"
              fontSize="0.938rem"
              className={`card-percent ${
                !data.prcChange
                  ? ""
                  : lesser
                  ? "card-percent-minus"
                  : "card-percent-plus"
              }`}
            >
              {lesser || !data.prcChange ? "" : "+"}
              {data.prcChange ? data.prcChange + percent : "-"}
            </Typography>
          </div>
          <div style={{ width }} className="card-hidden-part">
            <div
              style={{ height: hiddenHeight }}
              className="card-description-container"
            >
              <span ref={hiddenRef} className="card-description" variant="p">
                {data.valueDescription}
              </span>
            </div>
            <Typography
              variant="p"
              paragraph={true}
              fontWeight="500"
              fontStyle="italic"
              className="card-date"
            >
              Last updated: {updatedDate}
            </Typography>
          </div>
        </div>
      </Grid>

      <Grid
        className="card-wrapper-phone"
        style={{ width: "100%", cursor: "pointer" }}
        item
        lg={xl}
        xl={xl}
        md={6}
      >
        <div
          ref={(node) => {
            window.innerWidth <= 899 && cardRef(node, 1.7);
          }}
          onClick={handleOpenCardDetails}
          className="card"
        >
          <Grid className="flex-row-between card-hover">
            <Typography className="card-title" variant="h6">
              {name}
            </Typography>
            <Info value={data.description} style={{ marginTop: 3 }} />
          </Grid>
          <div className="flex-row card-hover card-value-container ">
            <Typography
              fontFamily="MinervaModern-Regular"
              variant="h4"
              className="card-value"
            >
              {data?.displayValue}
            </Typography>
            <Typography
              variant="p"
              fontSize="0.938rem"
              className={`card-percent ${
                !data.prcChange
                  ? ""
                  : lesser
                  ? "card-percent-minus"
                  : "card-percent-plus"
              }`}
            >
              {lesser || !data.prcChange ? "" : "+"}
              {data.prcChange ? data.prcChange + percent : "-"}
            </Typography>
          </div>
          <div className="card-hidden-part">
            <div className="card-description-container">
              <span className="card-description" variant="p">
                {data.valueDescription}
              </span>
            </div>
            <Typography
              variant="p"
              paragraph={true}
              fontWeight="500"
              fontStyle="italic"
              className="card-date"
            >
              Last updated: {updatedDate}
            </Typography>
          </div>
        </div>
      </Grid>
    </>
  );
});
