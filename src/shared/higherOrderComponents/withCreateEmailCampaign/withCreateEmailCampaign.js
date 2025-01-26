import { Box } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  changeEmailCampaignField,
  fetchEmailCampaignCount,
  setCampaignAddedOrEdited,
  setEmailCampaign,
  setEmailCampaignRecipientsData,
  setInitialEmailCampaign,
} from "../../../redux";
import { getEmailRecipients, getRemainedEmails } from "../../../services";
import {
  ModalLoading,
  SlideModal,
  NavigateBack,
  ExitCampaignCreation,
} from "../../components";
import { useStackNavigation } from "../../hooks";
import {
  Settings,
  Recipients,
  Template,
  Text,
  ReviewAndSchedule,
} from "./pages";

export const EmailCampaignContext = React.createContext();

const mapDispatchToProps = (dispatch) => {
  return {
    setCampaign: (campaign) => dispatch(setEmailCampaign(campaign)),
    setInitial: () => dispatch(setInitialEmailCampaign()),
    fetchEmailCampaignCount: () => dispatch(fetchEmailCampaignCount()),
    changeField: (key, value) => dispatch(changeEmailCampaignField(key, value)),

    setRecipientsData: (data) => dispatch(setEmailCampaignRecipientsData(data)),
    setCampaignAddedOrEdited: () => dispatch(setCampaignAddedOrEdited()),
  };
};

const mapStateToProps = (state) => {
  return {
    id: state.emailMarketing.campaign.id,
    recipients: state.emailMarketing.campaign.recipients,
    isNew: state.emailMarketing.campaign.isNew,
    isDraft: state.emailMarketing.campaign.isDraft,
  };
};

export const withCreateEmailCampaign = (WrapedComponent) =>
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(
    ({
      id,
      recipients,
      setCampaign,
      setInitial,
      fetchEmailCampaignCount,
      setRecipientsData,
      setCampaignAddedOrEdited,
      changeField,
      isNew,
      isDraft,
      ...rest
    }) => {
      const [open, setOpen] = useState(false);
      const [remainedEmails, setRemainedEmails] = useState(0);
      const [loading, setLoading] = useState(false);
      const [exitOpen, setExitOpen] = useState(false);
      const [templateTextOpen, setTemplateTextOpen] = useState(true);
      const [emailSendOpen, setEmailSendOpen] = useState(true);

      const { Component, goToLastPage, clearStack, goBack, page } =
        useStackNavigation([
          Settings,
          Recipients,
          Template,
          Text,
          ReviewAndSchedule,
        ]);

      useEffect(() => {
        if (open) {
          fetchRemainedEmails();
          if (!recipients.length) {
            fetchRecipients();
          }
        }
      }, [open]);

      const fetchRecipients = useCallback(() => {
        if (id) {
          setLoading(true);
          getEmailRecipients(id)
            .then((data) => {
              setRecipientsData(data);
            })
            .finally(() => setLoading(false));
        }
      }, [id]);

      const fetchRemainedEmails = useCallback(() => {
        getRemainedEmails().then((data) => setRemainedEmails(data));
      }, []);

      const handleClose = useCallback(() => {
        setOpen(false);
        clearStack();
        setInitial();
        setLoading(false);
        setExitOpen(false);

        fetchEmailCampaignCount();
        if (id) {
          setCampaignAddedOrEdited();
        }
      }, [id]);

      const handleOpenCreateEmailCampagin = useCallback(
        (isNew = false, isDraft = false) => {
          if (!isNew) {
            goToLastPage();
          }
          changeField("isNew", isNew);
          changeField("isDraft", isDraft);
          setOpen(true);
        },
        []
      );
      const handleExitOpen = useCallback(() => {
        if (!id) {
          return handleClose();
        }
        if (!isDraft && (id || isNew)) {
          setExitOpen(true);
          return;
        }
        handleClose();
      }, [id, isNew, isDraft]);

      // cancel closing
      const handleCancel = useCallback(() => {
        setExitOpen(false);
      }, []);
      return (
        <>
          <WrapedComponent
            openCreateEmailCampaign={handleOpenCreateEmailCampagin}
            setCampaign={setCampaign}
            fetchEmailCampaignCount={fetchEmailCampaignCount}
            {...rest}
          />

          <ExitCampaignCreation
            title="Exit email campaign creation"
            draftsLink="/lead-generation/email-marketing/draft"
            handleCancel={handleCancel}
            handleClose={handleClose}
            open={exitOpen}
          />
          {loading && <ModalLoading />}
          <SlideModal
            open={open}
            containerStyle={{ paddingRight: "1.75rem" }}
            onClose={handleExitOpen}
            titleChildren={<NavigateBack page={page} onBack={() => goBack()} />}
            title="New email campaign"
          >
            <Box height="calc(100vh - 50px)" position="relative">
              <EmailCampaignContext.Provider value={{ remainedEmails }}>
                {open && (
                  <Component
                    onLoading={setLoading}
                    onClose={handleClose}
                    templateTextOpen={templateTextOpen}
                    onTemplateTextClose={() => setTemplateTextOpen(false)}
                    emailSendOpen={emailSendOpen}
                    onEmailSendClose={() => setEmailSendOpen(false)}
                  />
                )}
              </EmailCampaignContext.Provider>
            </Box>
          </SlideModal>
        </>
      );
    }
  );
