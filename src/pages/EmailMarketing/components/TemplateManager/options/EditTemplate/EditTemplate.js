import { Box, Grid, Typography } from "@mui/material";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { connect } from "react-redux";
import store, { changeEmailCampaignField } from "../../../../../../redux";
import { createTemplate, updateTemplate } from "../../../../../../services";
import { CustomButton, Success } from "../../../../../../shared/components";
import { Input } from "../../../../../../shared/components/Form";
import {
  EDIT_PAGES,
  Navigation,
} from "../../../../../../shared/higherOrderComponents/withCreateEmailCampaign/pages/Text/components/Navigation";
import {
  PreviewTemplate,
  TemplateEditor,
} from "../../../../../../shared/higherOrderComponents/withCreateEmailCampaign/pages/Text/options";
import EmalMarketingEventRecorder from "../../../../../../shared/analytics/google/EmalMarketingEventRecorder";

const mapStateToProps = (state) => {
  return {
    selectedTemplate: state.emailMarketing.campaign.selectedTemplate,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    changeField: (key, value) => dispatch(changeEmailCampaignField(key, value)),
  };
};

export const EditTemplate = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ changeField, selectedTemplate, onClose }) => {
  const [selectedOption, setSelectedOption] = useState(EDIT_PAGES.EDIT);
  const [templateName, setTemplateName] = useState(() => selectedTemplate.name);
  const [saved, setSaved] = useState(false);

  const editorRef = useRef();

  useEffect(() => {
    setRecipients();
    EmalMarketingEventRecorder.editTemplate();
  }, []);

  const setRecipients = useCallback(() => {
    changeField("recipients", recipients);
  }, []);

  const handleSelectOption = useCallback((e) => {
    if (+e.currentTarget.id === EDIT_PAGES.PREVIEW) {
      const content = editorRef.current
        .getContent()
        .replaceAll("<p>", "<p style='margin:0; font-family: Lora'>");
      changeField("template", content);
    }
    setSelectedOption(+e.currentTarget.id);
  }, []);

  const handleSave = useCallback(() => {
    setSaved(true);
    if (selectedTemplate.id && !selectedTemplate.notMine) {
      handleUpdateTemplate();
      setTimeout(() => {
        setSaved(false);
        onClose();
      }, 3000);
      return;
    }
    createTemplate({
      content: editorRef.current
        .getContent()
        .replaceAll("<p>", "<p style='margin:0; font-family: Lora'>"),
      name: templateName,
    }).then((res) => {
      selectedTemplate.id = res.data.id;
    });
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 3000);
  }, [selectedTemplate, templateName]);

  const handleUpdateTemplate = useCallback(() => {
    updateTemplate({
      id: selectedTemplate.id,
      content: editorRef.current
        .getContent()
        .replaceAll("<p>", "<p style='margin:0; font-family: Lora'>"),
      name: templateName,
    });
  }, [selectedTemplate, templateName]);

  const nextDisabled = useMemo(() => !templateName, [templateName]);
  return (
    <>
      <Success
        message="The template has been successfuly saved"
        open={saved}
        onClose={onClose}
      />
      <Grid
        height="calc(100vh - 100px)"
        sx={{ overflowY: "auto" }}
        container
        pt={6}
        px={{ lg: 12, md: 6, sm: 2, xs: 2 }}
        mb={3}
      >
        <Grid item mb={6} lg={12} md={12} sm={12} xs={12} display="block">
          <Typography fontFamily="MinervaModern-Regular" variant="h4">
            EDIT THE TEMPLATE
          </Typography>
          <Box mt={2.5} py={1}>
            <Input
              label="Template name"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              required
              mr={0.5}
              sx={{ width: "100%", maxWidth: 400 }}
            />
          </Box>
          <Box maxWidth={620}>
            <Navigation
              selected={selectedOption}
              onSelect={handleSelectOption}
            />

            <div
              style={{
                width: "100%",
                display: selectedOption === EDIT_PAGES.EDIT ? "block" : "none",
              }}
            >
              <TemplateEditor editorRef={editorRef} />
            </div>
            {selectedOption === EDIT_PAGES.PREVIEW && (
              <PreviewTemplate recipients={recipients} />
            )}
          </Box>
        </Grid>
      </Grid>

      <Box
        position="absolute"
        bottom={16}
        display="flex"
        borderTop="2px solid #D8CFB4"
        width="100%"
        zIndex={1}
        justifyContent="end"
        sx={{ background: "white" }}
      >
        <CustomButton
          type="submit"
          disabled={nextDisabled}
          onClick={handleSave}
          sx={{
            fontSize: 20,
            alignSelf: "flex-end",
            letterSpacing: 2,
          }}
        >
          DONE
        </CustomButton>
      </Box>
    </>
  );
});

const recipients = [
  { firstName: "John", lastName: "Smith", email: "johnsmith@g.com" },
  { firstName: "Jane", lastName: "Green", email: "green@g.com" },
  { firstName: "Samantha", lastName: "Johns", email: "johns@g.com" },
];
