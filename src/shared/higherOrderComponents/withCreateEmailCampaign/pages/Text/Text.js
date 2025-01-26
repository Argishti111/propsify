import { Box, Grid, Typography } from "@mui/material";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { CustomButton, Info, Success } from "../../../../components";
import { Input } from "../../../../components/Form";
import { EDIT_PAGES } from "./components/Navigation";
import { Navigation } from "./components";
import { PreviewTemplate, TemplateEditor } from "./options";
import { Progress } from "../../components";
import {
  sendTestEmail,
  updateEmailCampaignTemplate,
} from "../../../../../services";
import { connect } from "react-redux";
import store, { changeEmailCampaignField } from "../../../../../redux";
import { placeVariablesToContent } from "../../../../helpers";
import { Cancel } from "@mui/icons-material";
import EmalMarketingEventRecorder from "../../../../analytics/google/EmalMarketingEventRecorder";

const mapStateToProps = (state) => {
  return {
    id: state.emailMarketing.campaign.id,
    selectedRecipient: state.emailMarketing.campaign.selectedRecipient,
    recipients: state.emailMarketing.campaign.recipients,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeField: (key, value) => dispatch(changeEmailCampaignField(key, value)),
  };
};

export const Text = connect(
  mapStateToProps,
  mapDispatchToProps
)(
  ({
    goToPage,
    goNext,
    page,
    id,
    changeField,
    recipients,
    selectedRecipient,
    templateTextOpen,
    onTemplateTextClose,
    emailSendOpen,
    onEmailSendClose,
  }) => {
    const [selectedOption, setSelectedOption] = useState(EDIT_PAGES.EDIT);
    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState("");
    const [nextDisabled, setNextDisabled] = useState(true);

    const editorRef = useRef();

    useEffect(() => {
      EmalMarketingEventRecorder.editTemplate();
      setDefaultRecipient();
    }, []);

    const setDefaultRecipient = useCallback(() => {
      if (!selectedRecipient && recipients.length) {
        changeField("selectedRecipient", recipients[0]);
      }
    }, []);

    const handleSelectOption = useCallback((e) => {
      if (+e.currentTarget.id === EDIT_PAGES.PREVIEW) {
        const content = editorRef.current.getContent();
        changeField("template", content);
      }
      setSelectedOption(+e.currentTarget.id);
    }, []);

    const handleSendTestMessage = useCallback(
      (e) => {
        e.preventDefault();
        const content = editorRef.current
          .getContent()
          .replaceAll("<p>", "<p style='margin:0; font-family: Lora'>");

        const selectedRecipient =
          store.getState().emailMarketing.campaign.selectedRecipient;

        const contentWithData = placeVariablesToContent(
          content,
          selectedRecipient.firstName,
          selectedRecipient.lastName
        );
        const message = {
          htmlBody: contentWithData,
          toAddress: email,
          campaignId: id,
        };
        setEmailSent(true);
        sendTestEmail(message).finally(() => {
          setTimeout(() => {
            setEmailSent(false);
          }, 3000);
        });
      },
      [email, editorRef]
    );

    const handleSubmit = useCallback(() => {
      goNext();
      const content = editorRef.current
        .getContent()
        .replaceAll("<p>", "<p style='margin:0; font-family: Lora'>");
      updateEmailCampaignTemplate(id, content);
      changeField("template", content);
    }, [id, editorRef]);
    return (
      <>
        <Grid
          height="calc(100vh - 100px)"
          sx={{ overflowY: "auto" }}
          container
          pt={6}
          px={{ lg: 12, md: 6, sm: 2, xs: 2 }}
          mb={3}
        >
          <Success
            open={emailSent}
            onClose={() => {
              setEmailSent(false);
            }}
            message={`We’ve sent a test email to ${email}`}
          />
          <Grid pr={{ lg: 4, md: 2, sm: 1, xs: 0 }} item lg={8}>
            <Typography fontFamily="MinervaModern-Regular" variant="h4">
              PERSONALIZE YOUR CAMPAIGN
            </Typography>
            {templateTextOpen && (
              <Box
                display="flex"
                flexDirection="row"
                sx={{ background: "#FEFAF6" }}
                mt={2.5}
                py={1}
                alignItems="center"
                // maxWidth={{ md: 430, sm: "100%", xs: "100%" }}
                pl={1.8}
                pr={1}
              >
                <Typography mr={0.5} variant="body2">
                  Changes made here will only apply to this campaign. Navigate
                  to Templates to create or modify an existing template for
                  future use.
                </Typography>

                <Cancel
                  color="primary"
                  fontSize="small"
                  sx={{ mx: 1, cursor: "pointer" }}
                  onClick={onTemplateTextClose}
                />
              </Box>
            )}
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
              <TemplateEditor
                editorRef={editorRef}
                onLoadContent={() => setNextDisabled(false)}
              />
            </div>
            {selectedOption === EDIT_PAGES.PREVIEW && <PreviewTemplate />}
          </Grid>
          <Grid item lg={4}>
            <Box mt={7}>
              <Typography
                mb={2}
                variant="h6"
                fontStyle="italic"
                fontWeight="400"
              >
                Send a test email
              </Typography>
              <form onSubmit={handleSendTestMessage}>
                {emailSendOpen && (
                  <Box
                    display="flex"
                    flexDirection="row"
                    sx={{ background: "#FEFAF6" }}
                    my={2}
                    py={1}
                    alignItems="center"
                    pl={1.8}
                    pr={1}
                  >
                    <Typography mr={0.5} variant="body2" fontWeight="400">
                      Be sure to send a test email to verify that your email
                      appears exactly as intended across all your devices
                    </Typography>
                    <Cancel
                      color="primary"
                      fontSize="small"
                      sx={{ mx: 1, cursor: "pointer" }}
                      onClick={onEmailSendClose}
                    />
                  </Box>
                )}
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                  fullWidth
                  label="Email Address"
                />
                <CustomButton type="submit" sx={{ mt: 1 }} fullWidth>
                  SEND
                </CustomButton>
              </form>
              <Typography
                mt={2}
                pb={5}
                variant="subtitle2"
                fontWeight="400"
                color="#192231"
              >
                Your test email could land in a spam folder. But don't worry,
                once you send the actual campaign, the emails will successfully
                reach your recipients.
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Progress
          nextDisabled={nextDisabled}
          currentPage={page}
          goToPage={goToPage}
          onNext={handleSubmit}
        />
      </>
    );
  }
);
