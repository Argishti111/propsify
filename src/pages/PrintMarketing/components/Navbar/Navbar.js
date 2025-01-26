import { Box, Grid } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { fetchPrintCampaignCount, setFilter } from "../../../../redux";
import { getPeriods, getPrintCampaignStatuses } from "../../../../services";
import { CustomButton, NavItem } from "../../../../shared/components";
import { CustomSelect } from "../../../../shared/components/Form";
import { checkFiltersInQuery } from "../../../../shared/helpers";
import { useQuery } from "../../../../shared/hooks";

const mapDispatchToProps = (dispatch) => {
  return {
    setFilter: (key, value) => dispatch(setFilter(key, value)),
    fetchPrintCampaignCount: () => dispatch(fetchPrintCampaignCount()),
  };
};

const mapStateToProps = (state) => {
  return {
    selectedPeriod: state.printMarketing.selectedPeriod,
    selectedStatus: state.printMarketing.selectedStatus,
    campaignCount: state.printMarketing.campaignCount,
    draftCount: state.printMarketing.draftCount,
    testCount: state.printMarketing.testCount,
  };
};

export const Navbar = connect(
  mapStateToProps,
  mapDispatchToProps
)(
  ({
    handleCreatePrintCampaign,
    selectedPeriod,
    selectedStatus,
    setFilter,
    campaignCount,
    draftCount,
    testCount,
    fetchPrintCampaignCount,
  }) => {
    const [statuses, setStatuses] = useState([
      { id: null, name: "All statuses" },
    ]);
    const [periods, setPeriods] = useState([]);
    const navigate = useNavigate();
    const query = useQuery();

    useEffect(() => {
      getPrintCampaignStatuses().then((data) => {
        setStatuses((prev) => prev.concat(data));
      });
      fetchPrintCampaignCount();
      getPeriods().then((data) => setPeriods(data));
      checkFiltersInQuery(query, setFilter);
    }, []);

    const location = useLocation();
    const handleSelectPeriod = useCallback((range) => {
      setFilter("selectedPeriod", range);
      query.set("periodName", range.name);
      query.set("periodId", range.id);
      navigate(`${window.location.pathname}?${query.toString()}`, {
        replace: true,
      });
      fetchPrintCampaignCount();
    }, []);
    return (
      <Grid
        marginX={{ md: 2, sm: 0, xs: 0 }}
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        flexWrap="wrap"
      >
        <Grid
          width={{ md: "auto", sm: "auto", xs: "calc(100vw - 80px)" }}
          overflow="auto"
          item
          display="flex"
          mb={{ md: 1, sm: 3, xs: 3 }}
        >
          <NavItem end to="/lead-generation/print-marketing">
            CAMPAIGNS
          </NavItem>
          <NavItem
            to="/lead-generation/print-marketing/test"
            className="top-nav-item-border-right top-nav-item-border-left"
          >
            TESTS {testCount > 0 ? `(${testCount})` : ""}
          </NavItem>
          <NavItem to="/lead-generation/print-marketing/draft">
            DRAFTS {draftCount > 0 ? `(${draftCount})` : ""}
          </NavItem>
        </Grid>
        <Grid item gap={0.8} display="flex" flexWrap="wrap">
          <Box
            display="inline-flex"
            width={{ sm: "auto", xs: "calc(100vw - 80px)" }}
          >
            <CustomSelect
              width={{
                md: 200,
                sm:
                  location.pathname === "/lead-generation/print-marketing"
                    ? "calc(50% - 38px)"
                    : "calc(100% - 40px)",
                xs:
                  location.pathname === "/lead-generation/print-marketing"
                    ? "calc(50% - 38px)"
                    : "calc(100% - 40px)",
              }}
              selectedItem={selectedPeriod.name}
            >
              {periods.map((period) => (
                <a
                  key={period.id}
                  onClick={(e) => {
                    e.preventDefault();
                    handleSelectPeriod(period);
                  }}
                  href="#"
                >
                  {period.name}
                </a>
              ))}
            </CustomSelect>
            {location.pathname === "/lead-generation/print-marketing" && (
              <CustomSelect
                width={{
                  md: 200,
                  sm: "calc(50% - 37px)",
                  xs: "calc(50% - 37px)",
                }}
                selectedItem={selectedStatus.name}
              >
                {statuses.map((status) => (
                  <a
                    key={status.id}
                    onClick={(e) => {
                      e.preventDefault();
                      setFilter("selectedStatus", status);
                      query.set("statusName", status.name);
                      query.set("statusId", status.id);
                      navigate(
                        `${window.location.pathname}?${query.toString()}`,
                        {
                          replace: true,
                        }
                      );
                    }}
                    href="#"
                  >
                    {status.name}
                  </a>
                ))}
              </CustomSelect>
            )}
          </Box>
          <CustomButton
            sx={createCampaignButtonStyle}
            onClick={handleCreatePrintCampaign}
          >
            CREATE NEW CAMPAIGN
          </CustomButton>
        </Grid>
      </Grid>
    );
  }
);

const createCampaignButtonStyle = {
  height: 32,
  fontSize: 13,
  lineHeight: 1,
  width: {
    md: "auto",
    sm: "calc(100% - 14px)",
    xs: "calc(100% - 14px)",
  },
};
