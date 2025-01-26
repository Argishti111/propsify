import React, { useCallback, useEffect, useState } from "react";
import {
  Modal,
  ModalLoading,
  Success,
  ExitCampaignCreation,
} from "../../components";
import {
  MailCampaignConfig,
  CampaignReview,
  ArtworkUpload,
  CustomerListStack,
} from "./pages";
import { useStackNavigation } from "../../hooks";
import { getPrintProducts } from "../../../services";
import {
  changePrintCampaignField,
  fetchPrintCampaignCount,
  setPrintCampaign,
  setInitial,
  setModalLoading,
  setPrintProductId,
  setRecipientsUploaded,
  setCampaignAddedOrEdited,
} from "../../../redux";
import { connect } from "react-redux";

const mapDispatchToProps = (dispatch) => {
  return {
    setRecipientsUploaded: (value) => dispatch(setRecipientsUploaded(value)),
    setPrintProductId: (id) => dispatch(setPrintProductId(id)),
    setModalLoading: (value) => dispatch(setModalLoading(value)),
    setCampaign: (data) => dispatch(setPrintCampaign(data)),
    setInitial: () => dispatch(setInitial()),
    changeField: (key, value) => dispatch(changePrintCampaignField(key, value)),
    fetchPrintCampaignCount: () => dispatch(fetchPrintCampaignCount()),
    setCampaignAddedOrEdited: () => dispatch(setCampaignAddedOrEdited()),
  };
};
const mapStateToProps = (state) => {
  return {
    modalLoading: state.printMarketing.modalLoading,
    selectedCampaign: state.printMarketing,
  };
};

export const withCreatePrintCampaign = (WrapedComponent) => {
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(
    ({
      setPrintProductId,
      setRecipientsUploaded,
      modalLoading,
      setModalLoading,
      setCampaign,
      selectedCampaign,
      setInitial,
      fetchPrintCampaignCount,
      changeField,
      setCampaignAddedOrEdited,
      ...rest
    }) => {
      const [open, setOpen] = useState(false);
      const [exitOpen, setExitOpen] = useState(false);
      const [printProducts, setPrintProducts] = useState([]);
      const [successOpen, setSuccessOpen] = useState(false);
      const { Component, goToLastPage, clearStack, goBack, page } =
        useStackNavigation([
          CustomerListStack,
          MailCampaignConfig,
          ArtworkUpload,
          CampaignReview,
        ]);

      useEffect(() => {
        if (open) {
          handleGetPrintProducts();
        }
      }, [open]);

      const handleGetPrintProducts = useCallback(() => {
        if (!printProducts.length) {
          getPrintProducts().then((data) => {
            setPrintProducts(data);
            setPrintProductId(data[0].id);
          });
        }
      }, [printProducts]);

      // close all modals
      const handleClose = useCallback(() => {
        setRecipientsUploaded(false);
        setExitOpen(false);
        setOpen(false);
        clearStack();
        setInitial();
        setCampaign({ id: null });
        setSuccessOpen(false);

        fetchPrintCampaignCount();

        handleRefetch();
      }, [selectedCampaign]);

      const handleRefetch = useCallback(() => {
        setCampaignAddedOrEdited();
      }, []);
      // cancel closing
      const handleCancel = useCallback(() => {
        setExitOpen(false);
      }, []);

      // open exit popup
      const handleExitOpen = useCallback(() => {
        if (selectedCampaign.isNew) {
          setExitOpen(true);
          return;
        }
        handleClose();
      }, [selectedCampaign, page]);

      return (
        <>
          <WrapedComponent
            {...rest}
            setRecipientsUploaded={setRecipientsUploaded}
            setSelectedCampaign={setCampaign}
            setPrintModalLoading={setModalLoading}
            goToLastPage={goToLastPage}
            setCreatePrintCampaignOpen={setOpen}
            goBack={goBack}
            modalLoading={modalLoading}
            fetchPrintCampaignCount={fetchPrintCampaignCount}
          />
          <ExitCampaignCreation
            handleCancel={handleCancel}
            handleClose={handleClose}
            open={exitOpen}
          />
          {modalLoading && <ModalLoading />}
          <Modal
            maxWidth="lg"
            titleChildren={<div />}
            open={open}
            onClose={handleExitOpen}
            title="New print campaign"
            fullScreenOnSM
          >
            <Success
              open={successOpen}
              onClose={() => setSuccessOpen(false)}
              message={
                selectedCampaign.isTest
                  ? "Your test print will be sent soon."
                  : "Your campaign has been successfully created."
              }
            />
            <Component
              changeField={changeField}
              printProducts={printProducts}
              setModalLoading={setModalLoading}
              selectedCampaign={selectedCampaign}
              setSelectedCampaign={setCampaign}
              setSuccessOpen={setSuccessOpen}
              onClose={handleClose}
            />
          </Modal>
          {modalLoading && <ModalLoading />}
        </>
      );
    }
  );
};
