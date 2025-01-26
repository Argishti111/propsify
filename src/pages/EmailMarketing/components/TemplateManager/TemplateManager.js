import React, { useCallback, useEffect } from "react";
import { connect } from "react-redux";
import {
  changeEmailCampaignField,
  setTemplateManagerOpen,
} from "../../../../redux";
import { NavigateBack, SlideModal } from "../../../../shared/components";
import { useStackNavigation } from "../../../../shared/hooks";
import { EditTemplate, TemplateList } from "./options";
import EmalMarketingEventRecorder from "../../../../shared/analytics/google/EmalMarketingEventRecorder";

const mapStateToProps = (state) => {
  return {
    open: state.emailMarketing.templateManagerOpen,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setOpen: (open) => dispatch(setTemplateManagerOpen(open)),
    changeField: (key, value) => dispatch(changeEmailCampaignField(key, value)),
  };
};

export const TemplateManager = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ open, setOpen, changeField }) => {
  const { Component, clearStack, page, goBack } = useStackNavigation([
    TemplateList,
    EditTemplate,
  ]);

  useEffect(() => {
    EmalMarketingEventRecorder.templateSettings();
    return handleClose;
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    clearStack();
    changeField("selectedTemplate", null);
    changeField("template", { content: "" });
    changeField("recipients", []);
  }, []);

  return (
    <SlideModal
      title="Template settings"
      titleChildren={<NavigateBack page={page} onBack={() => goBack()} />}
      open={open}
      onClose={handleClose}
    >
      <Component onClose={handleClose} />
    </SlideModal>
  );
});
