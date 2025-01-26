import React, { useCallback, useEffect, useState } from "react";
import {
  Modal,
  ModalLoading,
  Success,
  ExitCampaignCreation,
  ErrorMessage,
} from "../../components";
import store, {
  changeDigitalCampaignField,
  setDigitalCampaignModalLoading,
  setInitialDigitalCampaign,
  setDigitalCampaign,
  setCampaignAddedOrEdited,
  fetchDigitalCampaignCount,
} from "../../../redux";
import { connect } from "react-redux";
import {
  AdDetails,
  Budget,
  Business,
  Keywords,
  Places,
  Review,
  WebsiteStack,
} from "./pages";
import { useStackNavigation } from "../../hooks";
import { getBudgetLimits, getUserCompany } from "../../../services";

export const DigitalCampaignContext = React.createContext();

const mapDispatchToProps = (dispatch) => {
  return {
    setModalLoading: (value) => dispatch(setDigitalCampaignModalLoading(value)),
    changeField: (key, value) =>
      dispatch(changeDigitalCampaignField(key, value)),
    setInitial: () => dispatch(setInitialDigitalCampaign()),
    setCampaign: (data) => dispatch(setDigitalCampaign(data)),
    setCampaignAddedOrEdited: () => dispatch(setCampaignAddedOrEdited()),
    fetchDigitalCampaignCount: () => dispatch(fetchDigitalCampaignCount()),
  };
};
const mapStateToProps = (state) => {
  return {
    modalLoading: state.digitalMarketing.modalLoading,
    success: state.digitalMarketing.campaign.success,
    isNew: state.digitalMarketing.campaign.isNew,
    isDraft: state.digitalMarketing.campaign.isDraft,
  };
};

export const withCreateDigitalCampaign = (WrapedComponent) => {
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(
    ({
      setModalLoading,
      setCampaign,
      modalLoading,
      success,
      changeField,
      setInitial,
      isNew,
      isDraft,
      setCampaignAddedOrEdited,
      fetchDigitalCampaignCount,
      ...rest
    }) => {
      const [open, setOpen] = useState(false);
      const [exitOpen, setExitOpen] = useState(false);
      const [error, setError] = useState("");
      const [budgetLimits, setBudgetLimits] = useState({
        minBudget: 1.49,
        maxBudget: 9875.35,
      });

      const { Component, clearStack, goToLastPage } = useStackNavigation([
        Business,
        WebsiteStack,
        AdDetails,
        Keywords,
        Places,
        Budget,
        Review,
      ]);

      useEffect(() => {
        if (success) {
          setTimeout(() => {
            changeField("success", false);
            handleClose();
          }, 2000);
        }
      }, [success]);

      useEffect(() => {
        if (open) initBudgetLimits();
      }, [open]);

      const handleClose = useCallback(() => {
        setOpen(false);
        setExitOpen(false);
        setInitial();
        clearStack();
        setCampaignAddedOrEdited();
        fetchDigitalCampaignCount();
      }, []);

      const initBudgetLimits = useCallback(() => {
        getBudgetLimits().then((data) => {
          setBudgetLimits(data);
        });
      }, []);

      // cancel closing
      const handleCancel = useCallback(() => {
        setExitOpen(false);
      }, []);

      // open exit popup
      const handleExitOpen = useCallback(() => {
        let id = store.getState().digitalMarketing.campaign.id;
        if (!id) {
          return handleClose();
        }
        if (isNew) {
          setExitOpen(true);
          return;
        }
        handleClose();
      }, [isNew]);

      const preFillFields = useCallback((isNew) => {
        getUserCompany().then((data) => {
          if (isNew) {
            changeField("website", data.website);
            changeField("phone", data.phone);
            changeField("businessName", data.name);
          } else {
            const { website, phone, businessName } =
              store.getState().digitalMarketing.campaign;
            if (!website) {
              changeField("website", data.website);
            }
            if (!phone) {
              changeField("phone", data.phone);
            }
            if (!businessName) {
              changeField("businessName", data.name);
            }
          }
        });
      }, []);

      const handleOpenCreateDigitalCampagin = useCallback(
        (isNew = false, isDraft = false) => {
          setOpen(true);
          changeField("isNew", isNew);
          changeField("isDraft", isDraft);
          if (isNew || isDraft) {
            preFillFields(isNew);
          }
        },
        []
      );

      return (
        <>
          <ErrorMessage
            onClose={() => setError("")}
            open={!!error}
            title="FAILED!"
            message={error}
          />
          <ExitCampaignCreation
            title="Exit digital campaign creation"
            draftsLink="/lead-generation/digital-marketing/draft"
            handleCancel={handleCancel}
            handleClose={handleClose}
            open={exitOpen}
          />
          <WrapedComponent
            fetchDigitalCampaignCount={fetchDigitalCampaignCount}
            setModalLoading={setModalLoading}
            goToLastPage={goToLastPage}
            setSelectedCampaign={setCampaign}
            openCreateDigitalCampaign={handleOpenCreateDigitalCampagin}
            {...rest}
          />
          {modalLoading && <ModalLoading />}
          {success && (
            <Success
              open={true}
              title="Success"
              message={`Your campaign has been successfully ${
                isNew || isDraft ? "created" : "edited"
              }.`}
            />
          )}
          <Modal
            maxWidth="lg"
            titleChildren={<div />}
            PaperProps={{ style: { height: "100vh" } }}
            open={open}
            style={{ height: "100vh" }}
            onClose={handleExitOpen}
            title="New digital campaign"
            fullScreenOnSM
          >
            <DigitalCampaignContext.Provider value={{ budgetLimits }}>
              <Component
                open={open}
                setModalLoading={setModalLoading}
                onClose={handleExitOpen}
                onForceClose={handleClose}
                onError={setError}
                onChangeField={changeField}
                isNew={isNew}
              />
            </DigitalCampaignContext.Provider>
          </Modal>
        </>
      );
    }
  );
};
