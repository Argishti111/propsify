import { Box, Grid, Typography } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import {
  fetchDigitalCampaignCount,
  setDigitalCampaignFilter,
} from "../../../../redux";
import {
  CustomButton,
  MoreOptions,
  NavItem,
} from "../../../../shared/components";
import { CustomSelect } from "../../../../shared/components/Form";
import {
  checkFiltersInQuery,
  formatGoogleAdCustomerId,
} from "../../../../shared/helpers";
import { useQuery } from "../../../../shared/hooks";

const mapDispatchToProps = (dispatch) => {
  return {
    setFilter: (key, value) => dispatch(setDigitalCampaignFilter(key, value)),
    fetchDigitalCampaignCount: () => dispatch(fetchDigitalCampaignCount()),
  };
};

const mapStateToProps = (state) => {
  return {
    selectedPeriod: state.digitalMarketing.selectedPeriod,
    selectedStatus: state.digitalMarketing.selectedStatus,
    campaignCount: state.digitalMarketing.campaignCount,
    draftCount: state.digitalMarketing.draftCount,
  };
};

export const Navbar = connect(
  mapStateToProps,
  mapDispatchToProps
)(
  ({
    onCreateDigitalCampaign,
    selectedPeriod,
    selectedStatus,
    setFilter,
    campaignCount,
    draftCount,
    adAccount,
    onDisconnect,
    fetchDigitalCampaignCount,
  }) => {
    const query = useQuery();
    const navigate = useNavigate();
    const [statuses] = useState([
      { id: null, name: "All statuses" },
      { id: 2, name: "Enabled" },
      { id: 3, name: "Paused" },
    ]);
    const [periods] = useState([
      { id: null, name: "All dates" },
      { id: "last7Days", name: "Last 7 days" },
      { id: "last30Days", name: "Last 30 days" },
    ]);

    useEffect(() => {
      fetchDigitalCampaignCount();
    }, []);
    useEffect(() => {
      checkFiltersInQuery(query, setFilter);
    }, [query]);
    const location = useLocation();
    const customerId = useMemo(() => {
      return formatGoogleAdCustomerId(adAccount.customerId);
    }, [adAccount]);

    const handleSelectPeriod = useCallback((range) => {
      setFilter("selectedPeriod", range);

      query.set("periodName", range.name);
      query.set("periodId", range.id);
      navigate(`${window.location.pathname}?${query.toString()}`, {
        replace: true,
      });
      fetchDigitalCampaignCount();
    }, []);

    return (
      <Grid className="sub-navbar">
        <Grid
          marginX={{ md: 2, sm: 0, xs: 0 }}
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          flexWrap="wrap"
        >
          <Grid
            item
            width={{ md: "auto", sm: "auto", xs: "calc(100vw - 80px)" }}
            display="flex"
            mb={{ md: 1, sm: 3, xs: 3 }}
          >
            <NavItem
              end
              to="/lead-generation/digital-marketing"
              className="top-nav-item-border-right"
            >
              CAMPAIGNS
            </NavItem>
            <NavItem to="/lead-generation/digital-marketing/draft">
              DRAFTS {draftCount > 0 ? `(${draftCount})` : ""}
            </NavItem>
          </Grid>
          <Grid
            width={{ md: "auto:", sm: "auto", xs: "100%" }}
            gap={0.8}
            item
            display="flex"
            flexWrap="wrap"
          >
            <Box
              display="inline-flex"
              width={{ sm: "auto", xs: "calc(100vw - 80px)" }}
            >
              <CustomSelect
                width={{
                  md: 200,
                  sm:
                    location.pathname === "/lead-generation/digital-marketing"
                      ? "calc(50% - 38px)"
                      : "100%",
                  xs:
                    location.pathname === "/lead-generation/digital-marketing"
                      ? "calc(50% - 38px)"
                      : "100%",
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
              {location.pathname === "/lead-generation/digital-marketing" && (
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
              onClick={onCreateDigitalCampaign}
            >
              CREATE NEW CAMPAIGN
            </CustomButton>
          </Grid>
        </Grid>
        <Typography
          ml={{ md: 2, sm: 0, xs: 0 }}
          pt={3}
          display="inline-flex"
          alignItems="center"
          color="#192231CC"
          variant="p"
          fontSize={15}
        >
          Ad account:&nbsp;
          <Typography
            fontSize={15}
            color="#192231CC"
            sx={{
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            {adAccount.name} ({customerId})
          </Typography>
          <MoreOptions
            className="more-options-bottom"
            iconSX={{
              ml: 1,
              mt: 0.4,
              mr: 1,
              cursor: "pointer",
              "&:hover": {
                color: "#192231",
              },
            }}
          >
            <span onClick={onDisconnect}>Disconnect</span>
          </MoreOptions>
        </Typography>
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
    sm: "calc(100% - 6px)",
    xs: "calc(100% - 6px)",
  },
};
