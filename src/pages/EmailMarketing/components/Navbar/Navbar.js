import { MailOutline } from "@mui/icons-material";
import { Box, Grid } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useCallback } from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import {
  fetchEmailCampaignCount,
  setEmailAddressManagerOpen,
  setEmailCampaignFilter,
  setTemplateManagerOpen,
} from "../../../../redux";
import { emailSendingIsBlockedCheck, getPeriods } from "../../../../services";
import {
  CustomButton,
  Dropdown,
  DropdownItem,
  NavItem,
} from "../../../../shared/components";
import { CustomSelect } from "../../../../shared/components/Form";
import { checkFiltersInQuery } from "../../../../shared/helpers";
import { useQuery } from "../../../../shared/hooks";
import { ReactComponent as TemplateFile } from "../../../../shared/static/icons/icon-template-light.svg";
import { EmailMarketingContext } from "../../EmailMarketing";
import { AccountPausedMessage } from "./components";

const mapDispatchToProps = (dispatch) => {
  return {
    setFilter: (key, value) => dispatch(setEmailCampaignFilter(key, value)),
    fetchEmailCampaignCount: () => dispatch(fetchEmailCampaignCount()),
    setEmailAddressManagerOpen: (open) =>
      dispatch(setEmailAddressManagerOpen(open)),
    setTemplateManagerOpen: (open) => dispatch(setTemplateManagerOpen(open)),
  };
};

const mapStateToProps = (state) => {
  return {
    selectedPeriod: state.emailMarketing.selectedPeriod,
    selectedStatus: state.emailMarketing.selectedStatus,
    draftCount: state.emailMarketing.draftCount,
  };
};

export const Navbar = connect(
  mapStateToProps,
  mapDispatchToProps
)(
  ({
    onCreateEmailCampaign,
    selectedPeriod,
    selectedStatus,
    setFilter,
    draftCount,
    fetchEmailCampaignCount,
    setEmailAddressManagerOpen,
    setTemplateManagerOpen,
  }) => {
    const query = useQuery();
    const navigate = useNavigate();
    const { paused } = useContext(EmailMarketingContext);

    const [statuses] = useState([
      { id: null, name: "All statuses" },
      { id: 2, name: "Sending" },
      { id: 3, name: "Scheduled" },
      { id: 4, name: "Completed" },
      { id: 5, name: "Canceled" },
      { id: 6, name: "Paused" },
    ]);
    const [periods, setPeriods] = useState([]);

    useEffect(() => {
      getPeriods().then((data) => setPeriods(data));
      fetchEmailCampaignCount();
    }, []);

    useEffect(() => {
      checkFiltersInQuery(query, setFilter);
    }, [query]);
    const location = useLocation();

    const handleSelectPeriod = useCallback((period) => {
      setFilter("selectedPeriod", period);
      query.set("periodName", period.name);
      query.set("periodId", period.id);
      navigate(`${window.location.pathname}?${query.toString()}`, {
        replace: true,
      });
      fetchEmailCampaignCount();
    }, []);

    const handleSelectStatus = useCallback((status) => {
      setFilter("selectedStatus", status);
      query.set("statusName", status.name);
      query.set("statusId", status.id);
      navigate(`${window.location.pathname}?${query.toString()}`, {
        replace: true,
      });
    }, []);

    const openEmailAddressManager = useCallback(() => {
      setEmailAddressManagerOpen(true);
    }, []);

    const openTemplateManager = useCallback(() => {
      setTemplateManagerOpen(true);
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
              to="/lead-generation/email-marketing"
              className="top-nav-item-border-right"
            >
              CAMPAIGNS
            </NavItem>
            <NavItem to="/lead-generation/email-marketing/draft">
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
                    location.pathname === "/lead-generation/email-marketing"
                      ? "calc(50% - 38px)"
                      : "100%",
                  xs:
                    location.pathname === "/lead-generation/email-marketing"
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
              {location.pathname === "/lead-generation/email-marketing" && (
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
                        handleSelectStatus(status);
                      }}
                      href="#"
                    >
                      {status.name}
                    </a>
                  ))}
                </CustomSelect>
              )}
            </Box>
            <Box
              width={{
                md: "auto",
                sm: "calc(100% - 6px)",
                xs: "calc(100% - 6px)",
              }}
              display="flex"
              maxHeight={37}
              flexWrap="nowrap"
            >
              <CustomButton
                sx={createButtonStyle}
                onClick={onCreateEmailCampaign}
              >
                CREATE NEW CAMPAIGN
              </CustomButton>
              <Dropdown buttonSX={dropdownStyle}>
                <DropdownItem
                  onClick={openEmailAddressManager}
                  Icon={MailOutline}
                  iconColor="#192231"
                  text="Email addresses"
                />
                <DropdownItem
                  onClick={openTemplateManager}
                  Icon={TemplateFile}
                  text="Templates"
                />
              </Dropdown>
            </Box>
          </Grid>
        </Grid>
        <AccountPausedMessage paused={paused} />
      </Grid>
    );
  }
);

const dropdownStyle = {
  maxHeight: 32,
  borderBottom: "1px solid #ECD9CC",
  borderLeft: "1px solid #D2BCAC",
  ml: -0.8,
};
const createButtonStyle = {
  height: 32,
  fontSize: 13,
  lineHeight: 1,
  width: {
    md: "auto",
    sm: "calc(100% - 14px)",
    xs: "calc(100% - 14px)",
  },
};
