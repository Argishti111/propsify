import { Grid, Typography } from "@mui/material";
import React, { useCallback, useState, useEffect } from "react";
import { AddNewSenderEmailAddress, SendersEmailAddresses } from "./components";
import { connect } from "react-redux";
import {
  DeleteEmailModal,
  VerifyEmailMessage,
} from "../../../shared/higherOrderComponents/withCreateEmailCampaign/components";
import { ModalLoading, SlideModal } from "../../../shared/components";
import { setEmailAddressManagerOpen } from "../../../redux";
import {
  deleteSendersEmail,
  getAllSendersEmails,
  sendVerificationRequest,
} from "../../../services";
import EmalMarketingEventRecorder from "../../../shared/analytics/google/EmalMarketingEventRecorder";

const mapStateToProps = (state) => {
  return {
    open: state.emailMarketing.emailAddressManagerOpen,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setOpen: (open) => dispatch(setEmailAddressManagerOpen(open)),
  };
};

export const EmailAddressManager = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ open, setOpen, onCloseAll }) => {
  const [email, setEmail] = useState("");
  const [emailId, setEmailId] = useState(0);
  const [emails, setEmails] = useState([]);
  const [deleteEmailOpen, setDeleteEmailOpen] = useState(false);
  const [canDeleteEmail, setCanDeleteEmail] = useState(true);
  const [verifyEmailMessageOpen, setVerifyEmailMessageOpen] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    if (open) {
      fetchSendersEmailAddresses();
      EmalMarketingEventRecorder.sendersEmailAddress();
    }
    return () => {
      if (open) close();
    };
  }, [open]);

  const fetchSendersEmailAddresses = useCallback(() => {
    getAllSendersEmails().then((data) => {
      setEmails(data);
    });
  }, []);

  const closeVerifyEmailMessage = useCallback(
    () => setVerifyEmailMessageOpen(false),
    []
  );

  const openVerifyEmailMessage = useCallback(
    () => setVerifyEmailMessageOpen(true),
    []
  );

  const completeAddingEmail = useCallback(() => {
    closeVerifyEmailMessage();
    fetchSendersEmailAddresses();
  }, []);

  const prepareDeleteEmail = useCallback((sendersEmail) => {
    setCanDeleteEmail(!sendersEmail.verified);
    setEmail(sendersEmail.emailAddress);
    setEmailId(sendersEmail.id);
    setDeleteEmailOpen(true);
  }, []);

  const closeDeleteModal = useCallback(() => {
    setDeleteEmailOpen(false);
  }, []);

  const handleDelete = useCallback(() => {
    closeDeleteModal();
    setEmails((prev) => prev.filter((e) => e.id !== emailId));
    deleteSendersEmail(emailId);
  }, [email, emailId]);

  const addNewEmail = useCallback((email) => {
    setEmail(email);
    setLoading(true);
    setError("");
    sendVerificationRequest(email)
      .then((res) => {
        if (res.success) {
          openVerifyEmailMessage();
        } else {
          setError(res.errorMessage);
        }
      })
      .catch(() => setError("Failed to send verification message"))
      .finally(() => {
        setTimeout(() => {
          setError("");
        }, 3000);
        setLoading(false);
      });
  }, []);

  return (
    <SlideModal
      open={open}
      onClose={close}
      titleChildren={<div />}
      style={{ zIndex: 1301 }}
      title="Sender’s email addresses"
    >
      {loading && <ModalLoading />}
      <VerifyEmailMessage
        open={verifyEmailMessageOpen}
        onClose={completeAddingEmail}
        onContinue={completeAddingEmail}
        email={email}
      />
      <DeleteEmailModal
        canDelete={canDeleteEmail}
        open={deleteEmailOpen}
        onClose={closeDeleteModal}
        email={email}
        onDelete={handleDelete}
        onNavigateToDashBoard={onCloseAll}
      />
      <Grid
        height="calc(100vh - 46px)"
        sx={{ overflowY: "auto" }}
        container
        py={6}
        px={{ lg: 12, md: 6, sm: 2, xs: 2 }}
        alignContent="flex-start"
        display="flex"
      >
        <Grid item mb={6} lg={12} md={12} sm={12} xs={12} display="block">
          <Typography fontFamily="MinervaModern-Regular" variant="h4">
            Sender’s email addresses
          </Typography>
        </Grid>
        <Grid pr={{ md: 3, xs: 0 }} item lg={6} md={6} sm={12} xs={12}>
          <SendersEmailAddresses
            emails={emails}
            onSendEmail={(sender) => {
              addNewEmail(sender.emailAddress);
            }}
            onDelete={prepareDeleteEmail}
          />
        </Grid>
        <Grid pl={{ md: 3, xs: 0 }} item lg={6} md={6} sm={12} xs={12}>
          <AddNewSenderEmailAddress
            error={error}
            onNewEmailAdded={addNewEmail}
          />
        </Grid>
      </Grid>
    </SlideModal>
  );
});
