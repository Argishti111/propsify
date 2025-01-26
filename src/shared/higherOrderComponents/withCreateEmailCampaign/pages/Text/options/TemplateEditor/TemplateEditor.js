import React from "react";
import { connect } from "react-redux";
import { CustomEditor } from "../../../../../../components";

const mapStateToProps = (state) => {
  return {
    template: state.emailMarketing.campaign.template,
  };
};

export const TemplateEditor = connect(mapStateToProps)(
  ({ template, editorRef, maxWidth, onLoadContent }) => {
    return (
      <CustomEditor
        editorRef={editorRef}
        maxWidth={maxWidth}
        onLoadContent={onLoadContent}
        initialValue={template}
      />
    );
  }
);
