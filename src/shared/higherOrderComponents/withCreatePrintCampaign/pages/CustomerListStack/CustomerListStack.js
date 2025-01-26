import React from "react";
import { CustomerList, CustomerListUpload } from "..";
import { setRecipientsUploaded } from "../../../../../redux";
import { connect } from "react-redux";
import PrintMarketingEventRecorder from "../../../../analytics/google/PrintMarketingEventRecorder";
import { useEffect } from "react";

const mapStateToProps = (state) => {
  return {
    uploaded: state.printMarketing.recipientsUploaded,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUploaded: (value) => dispatch(setRecipientsUploaded(value)),
  };
};

export const CustomerListStack = connect(
  mapStateToProps,
  mapDispatchToProps
)(
  ({
    pageCount,
    page,
    goNext,
    selectedCampaign,
    uploaded,
    setUploaded,
    setSelectedCampaign,
  }) => {
    useEffect(PrintMarketingEventRecorder.uploadCustomerList, []);
    return uploaded ? (
      <CustomerList
        pageCount={pageCount}
        page={page}
        goBack={() => setUploaded(false)}
        goNext={goNext}
        selectedCampaign={selectedCampaign}
        setSelectedCampaign={setSelectedCampaign}
      />
    ) : (
      <CustomerListUpload
        selectedCampaign={selectedCampaign}
        pageCount={pageCount}
        page={page}
        setSelectedCampaign={setSelectedCampaign}
        goNext={() => {
          setUploaded(true);
        }}
      />
    );
  }
);
