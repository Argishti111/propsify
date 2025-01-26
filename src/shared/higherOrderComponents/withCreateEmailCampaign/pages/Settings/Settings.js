import { Box, Grid, Typography } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { changeEmailCampaignField } from "../../../../../redux";
import {
  addEmailCampaign,
  updateEmailCampaignSettings,
} from "../../../../../services";
import { Input } from "../../../../components/Form";
import { Progress, RemainingEmails } from "../../components";
import { ChooseEmail, InboxPreview } from "./components";
import EmalMarketingEventRecorder from "../../../../analytics/google/EmalMarketingEventRecorder";

const mapStateToProps = (state) => {
  return {
    id: state.emailMarketing.campaign.id,
    name: state.emailMarketing.campaign.name,
    fromEmailId: state.emailMarketing.campaign.fromEmailId,
    senderDisplayName: state.emailMarketing.campaign.senderDisplayName,
    subject: state.emailMarketing.campaign.subject,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeField: (key, value) => dispatch(changeEmailCampaignField(key, value)),
  };
};

export const Settings = connect(
  mapStateToProps,
  mapDispatchToProps
)(
  ({
    goToPage,
    goNext,
    page,
    onClose,
    changeField,
    id,
    name,
    senderDisplayName,
    fromEmailId,
    subject,
  }) => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      if (!id) {
        initializeFields();
      }
      EmalMarketingEventRecorder.setupCampaign();
    }, []);

    const initializeFields = useCallback(() => {
      const name = sessionStorage.getItem("name");
      setName({ target: { value: name === "null" ? "" : name } });

      const senderDisplayName = sessionStorage.getItem("senderDisplayName");
      setSenderDisplayName({
        target: {
          value: senderDisplayName === "null" ? "" : senderDisplayName,
        },
      });

      const subject = sessionStorage.getItem("subject");
      setSubject({
        target: { value: subject === "null" ? "" : subject },
      });
    }, []);
    const setSelectedEmail = useCallback((value, name) => {
      changeField("fromEmailId", value);
      changeField("fromEmail", name);
    }, []);

    const setName = useCallback((e) => {
      sessionStorage.setItem("name", e.target.value);
      changeField("name", e.target.value);
    }, []);

    const setSenderDisplayName = useCallback((e) => {
      sessionStorage.setItem("senderDisplayName", e.target.value);
      changeField("senderDisplayName", e.target.value);
    }, []);

    const setSubject = useCallback((e) => {
      sessionStorage.setItem("subject", e.target.value);
      changeField("subject", e.target.value);
    }, []);

    const setId = useCallback((value) => changeField("id", value), []);

    const allFieldsFilled = useMemo(
      () => name && fromEmailId && senderDisplayName && subject,
      [name, fromEmailId, senderDisplayName, subject]
    );

    const handleUpdateSettings = useCallback(
      (id) => {
        updateEmailCampaignSettings({
          id,
          fromEmailId,
          senderDisplayName,
          name,
          subject,
        });
      },
      [id, fromEmailId, senderDisplayName, name, subject]
    );

    const handleSubmit = useCallback(() => {
      if (!id) {
        setLoading(true);
        addEmailCampaign()
          .then((res) => {
            handleUpdateSettings(res.data.id);
            setId(res.data.id);
            goNext();
            clearFields();
          })
          .finally(() => setLoading(false));
      } else {
        handleUpdateSettings(id);
        goNext();
      }
    }, [id, fromEmailId, senderDisplayName, name, subject]);

    return (
      <>
        <Grid
          height="calc(100vh - 100px)"
          sx={{ overflowY: "auto" }}
          container
          py={6}
          px={{ lg: 12, md: 6, sm: 2, xs: 2 }}
          mb={3}
          alignItems={alignItems}
        >
          <Grid pr={2} item lg={6} md={6} sm={6} xs={12}>
            <Typography fontFamily="MinervaModern-Regular" variant="h4">
              SET UP YOUR CAMPAIGN
            </Typography>
            <RemainingEmails />
            <Box display="flex" flexDirection="column" mt={5} gap={1}>
              <Input
                value={name}
                onChange={setName}
                style={inputStyle}
                label="Campaign name"
                required
              />
              <Input
                value={senderDisplayName}
                onChange={setSenderDisplayName}
                style={inputStyle}
                label="Sender display name"
                required
              />
              <ChooseEmail
                selectedEmail={fromEmailId}
                onSelect={setSelectedEmail}
                onCloseAll={onClose}
              />
              <Input
                value={subject}
                onChange={setSubject}
                style={inputStyle}
                label="Subject line"
                required
              />
            </Box>
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <InboxPreview
              senderDisplayName={senderDisplayName}
              subject={subject}
              legend="Inbox Preview"
            />
          </Grid>
        </Grid>
        <Progress
          nextDisabled={!allFieldsFilled || loading}
          currentPage={page}
          goToPage={goToPage}
          onNext={handleSubmit}
        />
      </>
    );
  }
);

const inputStyle = { maxWidth: 400, width: "100%" };
const alignItems = {
  lg: "unset",
  md: "center",
  sm: "center",
  xs: "center",
};

const clearFields = () => {
  sessionStorage.removeItem("name");
  sessionStorage.removeItem("subject");
  sessionStorage.removeItem("senderDisplayName");
};
