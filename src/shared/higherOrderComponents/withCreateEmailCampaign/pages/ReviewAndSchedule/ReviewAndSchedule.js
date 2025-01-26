import { Grid, Box, Typography } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { fetchEmailCampaignCount } from "../../../../../redux";
import { updateEmailCampaignSchedule } from "../../../../../services";
import {
  ErrorBox,
  Success,
  TitleWithEdit,
  TitleWithSubtitleAndEdit,
} from "../../../../components";
import { toUtcString } from "../../../../helpers";
import { RemainingEmails, Progress } from "../../components";
import { Navigation } from "./components";
import { SENDING_PAGES } from "./components/Navigation";
import { SendNow, ScheduleForLater } from "./options";
import EmalMarketingEventRecorder from "../../../../analytics/google/EmalMarketingEventRecorder";

const mapStateToProps = (state) => {
  return {
    id: state.emailMarketing.campaign.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchEmailCampaignCount: () => dispatch(fetchEmailCampaignCount()),
  };
};

export const ReviewAndSchedule = connect(
  mapStateToProps,
  mapDispatchToProps
)(
  ({
    goToPage,
    goNext,
    page,
    goBack,
    onClose,
    id,
    onLoading,
    fetchEmailCampaignCount,
  }) => {
    const [selectedOption, setSelectedOption] = useState(
      SENDING_PAGES.SEND_NOW
    );
    const [successOpen, setSuccessOpen] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const {
      name,
      fromEmail,
      fromEmailId,
      senderDisplayName,
      subject,
      recipients,
      template,
      fileName,
      uniqueRecipientsCount,
    } = useSelector((state) => state.emailMarketing.campaign);

    useEffect(() => {
      checkFields();
      EmalMarketingEventRecorder.reviewAndConfirm();
    }, []);

    const checkFields = useCallback(() => {
      let backCount = 0;
      switch (true) {
        case !name || !fromEmailId || !senderDisplayName:
          backCount = 4;
          break;
        case !uniqueRecipientsCount:
          backCount = 3;
          break;
        case !template:
          backCount = 2;
          break;
      }
      if (backCount) {
        goBack(backCount);
      }
    }, []);

    const handleSelectOption = useCallback((e) => {
      setSelectedOption(+e.currentTarget.id);
    }, []);

    const handleSend = useCallback(
      (datetime = "") => {
        onLoading(true);
        setError("");
        updateEmailCampaignSchedule(
          id,
          !datetime ? "" : toUtcString(datetime).toISOString()
        )
          .then((data) => {
            if (data.success) {
              setSuccessOpen(true);
              navigate("/lead-generation/email-marketing");
              fetchEmailCampaignCount();
              setTimeout(() => handleSuccessClose(), 3000);
            } else {
              setError(data.errorMessage);
            }
          })
          .catch(() =>
            setError("Please check your internet connection or try later")
          )
          .finally(() => {
            onLoading(false);
          });
      },
      [id]
    );

    const handleSuccessClose = useCallback(() => {
      onClose();
      setSuccessOpen(false);
    }, []);
    return (
      <>
        <Success
          open={successOpen}
          onClose={handleSuccessClose}
          message="Your campaign has been successfully created."
        />
        <Grid
          sx={{ overflowY: "auto" }}
          container
          pt={6}
          px={{ lg: 12, md: 6, sm: 2, xs: 2 }}
          mb={3}
          // flexDirection="row"
          // justifyContent="start"
        >
          <Grid item mb={2} lg={12} md={12} sm={12} xs={12} display="block">
            <Typography fontFamily="MinervaModern-Regular" variant="h4">
              REVIEW AND CONFIRM
            </Typography>
            <RemainingEmails style={{ maxWidth: 400 }} />
          </Grid>
          <Grid
            height="calc(100vh - 260px)"
            pb={12}
            sx={{ overflowY: "auto" }}
            item
            container
            lg={12}
            md={12}
            sm={12}
            xs={12}
          >
            <Grid pr={2} item lg={6} md={6} sm={12} xs={12}>
              <Box maxWidth={400}>
                <Typography
                  fontWeight="400"
                  fontFamily="MinervaModern-Bold"
                  variant="p"
                  borderBottom="1px solid #ECD9CC"
                  py={1}
                  display="block"
                >
                  CAMPAIGN DETAILS
                </Typography>
                <Box py={3} display="flex" flexDirection="column" gap={3}>
                  <TitleWithSubtitleAndEdit
                    title="Campaign name"
                    subtitle={name}
                    onIconClick={() => {
                      goBack(4);
                    }}
                    preventDefault
                  />
                  <TitleWithSubtitleAndEdit
                    title="Display name | Sender email address"
                    subtitle={`${senderDisplayName}\u00a0 | \u00a0${fromEmail}`}
                    onIconClick={() => {
                      goBack(4);
                    }}
                    preventDefault
                  />
                  <TitleWithSubtitleAndEdit
                    title="Subject line"
                    subtitle={subject}
                    onIconClick={() => {
                      goBack(4);
                    }}
                    preventDefault
                  />
                  <TitleWithSubtitleAndEdit
                    onIconClick={() => {
                      goBack(3);
                    }}
                    preventDefault
                    title="Recipients"
                    subtitle={fileName}
                  />
                  <Typography color="#AFAFAF" variant="p" fontWeight="500">
                    Email will be sent to {uniqueRecipientsCount} recipient(s)
                  </Typography>
                  <Box
                    position="relative"
                    minHeight={577}
                    mt={4}
                    height="100%"
                    width="100%"
                    border="1px solid #BEB082"
                    p={2}
                  >
                    <Typography
                      px={2}
                      py={3}
                      sx={templateContainerStyle}
                      variant="p"
                    >
                      <p dangerouslySetInnerHTML={{ __html: template }}></p>
                    </Typography>
                    <TitleWithEdit
                      preventDefault
                      onIconClick={() => {
                        goBack(1);
                      }}
                      sx={{ position: "absolute", right: 4, top: 4 }}
                    />
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12} mb={1}>
              <Box maxWidth={400}>
                <Navigation
                  selected={selectedOption}
                  onSelect={handleSelectOption}
                />
                {selectedOption === SENDING_PAGES.SEND_NOW ? (
                  <SendNow onSend={handleSend} />
                ) : selectedOption === SENDING_PAGES.SCHEDULE_LATER ? (
                  <ScheduleForLater onSend={handleSend} />
                ) : null}
                <ErrorBox mt={1} title="Failed" message={error} />
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Progress
          hideNext
          currentPage={page}
          goToPage={goToPage}
          onNext={goNext}
        />
      </>
    );
  }
);

const templateContainerStyle = {
  display: "block",
  background: "#F9F4F0",
  minHeight: 500,
  fontSize: "0.938rem",
  wordBreak: "break-all",
};
