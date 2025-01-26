import { Box, Grid } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Loading } from "..";
import { useCallTimeout } from "../../hooks";

const mapStateToProps = (state, ownProps) => {
  const { campaignType = "printMarketing" } = ownProps;
  return {
    selectedPeriod: state[campaignType].selectedPeriod,
    selectedStatus: state[campaignType].selectedStatus,
    campaignAddedOrEdited: state.user.campaignAddedOrEdited,
  };
};

export const SortingContext = React.createContext();
export const CampaignList = connect(mapStateToProps)(
  ({
    getData,
    loading,
    children,
    selectedPeriod,
    selectedStatus,
    type,
    campaignAddedOrEdited,
    sx,
    onSort,
    page,
  }) => {
    const [orderColumn, setOrderColumn] = useState("createdDate");
    const [orderType, setOrderType] = useState("desc");
    const call = useCallTimeout();

    useEffect(() => {
      call(() =>
        getData(
          type,
          selectedPeriod.id,
          selectedStatus.id,
          orderColumn,
          orderType,
          page
        )
      );
    }, [type, selectedPeriod, selectedStatus, campaignAddedOrEdited]);

    const handleSort = useCallback(
      (newOrderColumn) => {
        let newOrderType =
          newOrderColumn === orderColumn
            ? orderType === "asc"
              ? "desc"
              : "asc"
            : "asc";
        setOrderType(newOrderType);
        setOrderColumn(newOrderColumn);
        onSort
          ? onSort(newOrderColumn, newOrderType)
          : getData(
              type,
              selectedPeriod.id,
              selectedStatus.id,
              newOrderColumn,
              newOrderType,
              page
            );
      },
      [orderColumn, orderType, selectedStatus, selectedPeriod, page]
    );

    if (loading) {
      return (
        <Box
          position="relative"
          height="70%"
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Loading style={{ top: 0, bottom: 0 }} />
        </Box>
      );
    }
    return (
      <Grid
        sx={{
          height: "80%",
          width: {
            lg: "auto",
            md: "calc(100vw - 104px)",
            sm: "calc(100vw - 104px)",
            xs: "calc(100vw - 90px)",
          },
          overflowX: "auto",
          ...sx,
        }}
        className="campaign-list"
        marginX={{ md: 2, sm: 0, xs: 0 }}
        marginTop={{ md: 4, sm: 2, xs: 2 }}
      >
        <SortingContext.Provider
          value={{
            handleSort,
            orderColumn,
            orderType,
          }}
        >
          {children}
        </SortingContext.Provider>
      </Grid>
    );
  }
);
